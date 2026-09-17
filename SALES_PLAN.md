# Sales Dashboard — Remaining Work

> **Context:** This is a handoff plan from a prior Claude session. PR 1 is already shipped on branch `claude/sales-dashboard-setup-8JzV6` (commit `38bfcc3`). This document describes the remaining three PRs.

## Status

**PR 1 shipped** on branch `claude/sales-dashboard-setup-8JzV6` (commit `38bfcc3`):
- `sales` role added to User model + role union
- `app/routers/sales.py` with `require_sales` / `require_sales_or_admin` helpers + `/api/sales/health`
- Registered in `app/main.py`
- Frontend: `useIsSales` / `useHasSalesAccess` hooks, `SalesRoute` guard, `/sales` route, `SalesDashboardPage`, sidebar `sales-root` nav, admin UsersPage role filter/label

**Confirmed design decisions:**
- Sales team = Vemia's internal reps (platform-scoped, not per-account)
- Agent default = draft + human approval
- Email provider = **Brevo**
- Lead storage = native tables in Vemia

**Schema convention found in the codebase:** the project does **not** use Alembic. It uses `ensure_XXX_schema()` functions called from `app/main.py` startup, with per-dialect DDL (MySQL / Postgres / SQLite). See `app/services/partner.py` `ensure_partner_schema()` for the cleanest template and `app/services/user_auth.py` `ensure_users_schema()` for the larger pattern.

---

## PR 2 — CRM Core

### Backend

**New `app/services/sales.py`** — follow the shape of `app/services/partner.py`:

- `ensure_sales_schema()` creating four tables (skip `sales_email_drafts` — that's PR 3):
  - `sales_leads` — `id, name, type (agency|school|other), website, country, city, industry, source, owner_id (FK users), stage, expected_value, currency, notes, next_action_at, created_at, updated_at`
  - `sales_contacts` — `id, lead_id, first_name, last_name, email, phone, title, is_primary, do_not_contact, created_at`
  - `sales_activities` — `id, lead_id, contact_id (nullable), user_id (nullable — null = agent), agent_tool (nullable varchar), type (email|call|meeting|note|agent_outreach), direction (inbound|outbound), subject, body, outcome, occurred_at`
  - `sales_tasks` — `id, lead_id, assignee_id, title, due_at, status (open|done), created_by_user_id (nullable), created_by_agent (nullable varchar), created_at, completed_at`
  - Indexes: `owner_id`, `stage`, `lead_id`, `assignee_id`, `due_at`
  - All FKs cascade on lead delete
  - Stages enum (hardcoded v1): `new, contacted, qualified, demo, proposal, won, lost`

- CRUD functions (all return dicts, all use `sqlalchemy.text()` like the rest of the codebase):
  - Leads: `create_lead`, `list_leads(filters)`, `get_lead(id)`, `get_lead_detail(id)` (joins contacts+activities+tasks), `update_lead`, `soft_delete_lead`
  - Contacts: `add_contact`, `update_contact`, `remove_contact`
  - Activities: `log_activity`, `list_activities(lead_id)`
  - Tasks: `create_task`, `list_tasks(user_id|null, status)`, `complete_task`, `update_task`
  - Pipeline: `get_pipeline()` → `{stage: [lead_summary, ...]}`
  - Report: `get_summary(range)` → `{pipeline_value, by_stage, by_rep, conversion_rate}`

- Use `get_state_engine()` (users/partners live there; note `get_main_engine()` points at the same DB currently).

**Extend `app/routers/sales.py`** (keep existing helpers):

- Pydantic request/response models inline in the router file (consistent with `accounts.py` / `billing.py`).
- Endpoints (all gated by `require_sales_or_admin`, owner mutations by `require_sales`):
  ```
  GET    /api/sales/leads                    list + filters (stage, owner, q)
  POST   /api/sales/leads
  GET    /api/sales/leads/{id}               detail
  PATCH  /api/sales/leads/{id}
  DELETE /api/sales/leads/{id}               soft-delete

  POST   /api/sales/leads/{id}/contacts
  PATCH  /api/sales/contacts/{id}
  DELETE /api/sales/contacts/{id}

  POST   /api/sales/leads/{id}/activities
  GET    /api/sales/leads/{id}/activities

  GET    /api/sales/tasks?mine=true
  POST   /api/sales/tasks
  PATCH  /api/sales/tasks/{id}/complete
  PATCH  /api/sales/tasks/{id}

  GET    /api/sales/pipeline                 kanban payload
  GET    /api/sales/reports/summary
  ```

**Wire into startup** — `app/main.py` around line 2106 (after partner schema):
```python
try:
    from app.services.sales import ensure_sales_schema
    ensure_sales_schema()
except Exception as e:
    logger.error("Sales schema init failed: %s", e)
```

### Frontend

**New file `vemia-frontend/src/services/sales.ts`** — API client wrapping `api`:
- Types: `Lead`, `Contact`, `Activity`, `Task`, `LeadStage`, `LeadType`, `PipelineSnapshot`, `SummaryReport`
- Functions mirroring the endpoints above

**New pages under `vemia-frontend/src/pages/sales/`:**
- `LeadsListPage.tsx` — filterable table (stage dropdown, owner dropdown, search), columns: name, type, stage, owner, value, next action, updated
- `LeadDetailPage.tsx` — left column: lead metadata + stage dropdown; right column: tabbed Contacts / Activity timeline / Tasks
- `PipelineBoardPage.tsx` — Kanban: one column per stage, cards show name + value + owner initial; drag-to-update uses `@dnd-kit/core` (already in deps — check `package.json`; fall back to click-to-move dropdown if not)

**Update `SalesDashboardPage.tsx`** — replace placeholders with real KPI cards pulling from `/api/sales/reports/summary`, + "My open tasks" list + "Recent activity" feed.

**Wire routes in `App.tsx`** — add lazy imports + routes inside the `<SalesRoute>` block:
```
/sales                  → SalesDashboardPage (existing, upgraded)
/sales/leads            → LeadsListPage
/sales/leads/:id        → LeadDetailPage
/sales/pipeline         → PipelineBoardPage
```

**Extend `AppLayout.tsx`** — in the `sales-root` nav branch, add entries:
```
{ to: "/sales",          label: "Dashboard" }
{ to: "/sales/leads",    label: "Leads" }
{ to: "/sales/pipeline", label: "Pipeline" }
```

### Verification

- `pytest tests/ -v` (add `tests/test_sales_service.py` covering CRUD + stage transitions)
- Log in as a user whose role is `sales` (set via `UPDATE users SET role='sales' WHERE id=X`), confirm `/sales/*` loads and `/admin/*` redirects
- Log in as `member`, confirm `/sales/*` redirects to `/home`
- Create lead → add contact → log activity → move stage → verify pipeline reflects the change

---

## PR 3 — Email + Approvals

**Config (`app/config.py` + `.env.example`):**
- `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `BREVO_SENDER_NAME`, `BREVO_REPLY_TO_DEFAULT`

**New `app/services/email.py`:**
- `send_transactional_email(to, subject, html, reply_to=None, sender=None) -> BrevoSendResult`
- Uses `sib-api-v3-sdk` (add to `requirements.txt`) or direct HTTP to `https://api.brevo.com/v3/smtp/email`
- Honors `settings.DRY_RUN`: log payload + return fake message id (matches publish convention)
- On success, auto-insert a `sales_activities` row (`type=email, direction=outbound`)

**Extend `app/services/sales.py`:**
- Add `sales_email_drafts` table in `ensure_sales_schema()`: `id, lead_id, contact_id, draft_subject, draft_body_html, generated_by_tool, status (pending|approved|sent|discarded), approved_by, created_at, sent_at, brevo_message_id`
- Functions: `create_draft`, `list_pending_drafts(user_id)`, `update_draft(id, subject, body)`, `approve_and_send(id, user_id)`, `discard_draft`

**Extend `app/routers/sales.py`:**
```
GET    /api/sales/email-drafts
POST   /api/sales/email-drafts                     (manual draft creation)
PATCH  /api/sales/email-drafts/{id}
POST   /api/sales/email-drafts/{id}/approve        → calls email.send_transactional_email
POST   /api/sales/email-drafts/{id}/discard
```

**Frontend:**
- `vemia-frontend/src/pages/sales/EmailApprovalsPage.tsx` — list of pending drafts, preview + edit + approve/discard buttons
- Add route `/sales/approvals` and nav entry
- On Lead Detail page, show pending drafts inline and a "Compose" button (opens a modal that creates a draft)

---

## PR 4 — Agents + Scheduler + Reports

**Reuse `app/services/agent/` scaffolding — don't fork it.** Read `tool_registry.py`, `chat.py`, `audit.py`, `safety.py` first to confirm the current `AgentTool` signature.

**New `app/services/agent/tools_sales.py`** — register tools via the existing `AgentTool` dataclass:

| Tool | Risk tier | Behavior |
|---|---|---|
| `sales_list_leads` | auto | filterable leads list |
| `sales_lead_detail` | auto | lead + contacts + activities |
| `sales_draft_outreach_email` | **confirm** | creates pending `sales_email_drafts` row — never sends |
| `sales_log_activity` | auto | writes activity row |
| `sales_schedule_followup` | auto | writes `sales_tasks` row |
| `sales_weekly_report` | auto | aggregates + returns structured summary |

- Gate inside each handler: `if ctx.user.role not in ("sales", "super_admin"): return AgentResult(error=...)`
- Register in `tool_registry.py`

**New endpoint** `POST /api/sales/agent/chat` in `app/routers/sales.py`:
- Calls existing `chat.build_context()` / `_resolve_intent()` with a tool allowlist restricted to `sales_*`
- Gated by `require_sales`

**Scheduled jobs — extend `app/services/scheduler.py`** following the `run_rotation_post` / `run_auto_generate` pattern:
- `run_sales_weekly_report()` — Mondays 09:00; per-rep summary → `notifications.py` + optional Brevo email
- `run_sales_stale_lead_check()` — daily 08:00; flag leads with no activity in 14 days, create a task
- `run_sales_followup_reminders()` — every 15 min; surface due `sales_tasks` as in-app notifications
- Register in APScheduler setup (wherever `run_rotation_post` is registered)
- Gated by existing `ENABLE_SCHEDULER` flag

**Frontend:**
- `SalesReportsPage.tsx` at `/sales/reports` — pulls `/api/sales/reports/summary` + `/api/sales/reports/activity`; charts: pipeline by stage, rep leaderboard, activity volume over time (use `recharts` if already in deps, otherwise plain tables)
- Agent chat drawer on Lead Detail page — calls `/api/sales/agent/chat`

---

## Files by PR

### PR 2
**New:** `app/services/sales.py`, `vemia-frontend/src/services/sales.ts`, three new pages under `vemia-frontend/src/pages/sales/`
**Modify:** `app/routers/sales.py`, `app/main.py`, `vemia-frontend/src/pages/sales/SalesDashboardPage.tsx`, `vemia-frontend/src/App.tsx`, `vemia-frontend/src/components/AppLayout.tsx`

### PR 3
**New:** `app/services/email.py`, `vemia-frontend/src/pages/sales/EmailApprovalsPage.tsx`
**Modify:** `app/config.py`, `.env.example`, `requirements.txt`, `app/services/sales.py` (+ drafts table/CRUD), `app/routers/sales.py` (+ draft endpoints), `vemia-frontend/src/services/sales.ts`, `vemia-frontend/src/App.tsx`, `vemia-frontend/src/components/AppLayout.tsx`, `vemia-frontend/src/pages/sales/LeadDetailPage.tsx`

### PR 4
**New:** `app/services/agent/tools_sales.py`, `vemia-frontend/src/pages/sales/SalesReportsPage.tsx`, agent chat drawer component
**Modify:** `app/services/agent/tool_registry.py`, `app/services/scheduler.py` (+ 3 jobs + registration), `app/routers/sales.py` (+ agent chat endpoint), `vemia-frontend/src/App.tsx`, `vemia-frontend/src/components/AppLayout.tsx`, `vemia-frontend/src/pages/sales/LeadDetailPage.tsx`

---

## Suggested local prompt to resume

> "Continue the sales dashboard work on branch `claude/sales-dashboard-setup-8JzV6`. PR 1 is committed as `38bfcc3`. Start PR 2: create `app/services/sales.py` with `ensure_sales_schema()` for the four CRM tables (leads, contacts, activities, tasks) following the `app/services/partner.py` pattern, add CRUD functions, extend `app/routers/sales.py` with the endpoints listed in SALES_PLAN.md, wire schema init into `app/main.py` startup, then build the frontend pages. Commit each PR separately."
