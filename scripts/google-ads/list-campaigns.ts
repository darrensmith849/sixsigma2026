/**
 * Lists all campaigns in the configured account.
 *
 *   npx tsx scripts/google-ads/list-campaigns.ts
 */
import { customer, customerId } from './client.js';

async function main() {
  console.log(`\n  Campaigns for customer ${customerId}\n`);

  const rows = await customer.query(`
    SELECT
      campaign.id,
      campaign.name,
      campaign.status,
      campaign.advertising_channel_type,
      campaign_budget.amount_micros
    FROM campaign
    ORDER BY campaign.name
  `);

  if (rows.length === 0) {
    console.log('  No campaigns found.\n');
    return;
  }

  const table = rows.map((r: any) => ({
    id: String(r.campaign.id),
    name: String(r.campaign.name).slice(0, 50),
    status: String(r.campaign.status),
    channel: String(r.campaign.advertising_channel_type),
    daily_budget: r.campaign_budget?.amount_micros
      ? (Number(r.campaign_budget.amount_micros) / 1_000_000).toFixed(2)
      : '—',
  }));

  console.table(table);
  console.log(`\n  ${rows.length} campaign(s) total.\n`);
}

main().catch((err) => {
  console.error('\n  ✗ Query failed:', err?.errors ?? err);
  process.exit(1);
});
