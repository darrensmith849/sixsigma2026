/**
 * Last-30-day performance per campaign: impressions, clicks, cost, conversions.
 *
 *   npx tsx scripts/google-ads/campaign-performance.ts
 */
import { customer, customerId } from './client.js';

async function main() {
  console.log(`\n  Last 30 days — performance for customer ${customerId}\n`);

  const rows = await customer.query(`
    SELECT
      campaign.id,
      campaign.name,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions,
      metrics.conversions_value,
      metrics.ctr,
      metrics.average_cpc
    FROM campaign
    WHERE segments.date DURING LAST_30_DAYS
    ORDER BY metrics.cost_micros DESC
  `);

  if (rows.length === 0) {
    console.log('  No performance data in the last 30 days.\n');
    return;
  }

  const table = rows.map((r: any) => {
    const cost = Number(r.metrics.cost_micros ?? 0) / 1_000_000;
    const cpc = Number(r.metrics.average_cpc ?? 0) / 1_000_000;
    const conv = Number(r.metrics.conversions ?? 0);
    return {
      name: String(r.campaign.name).slice(0, 40),
      impr: Number(r.metrics.impressions ?? 0).toLocaleString(),
      clicks: Number(r.metrics.clicks ?? 0).toLocaleString(),
      ctr: `${(Number(r.metrics.ctr ?? 0) * 100).toFixed(2)}%`,
      avg_cpc: cpc.toFixed(2),
      cost: cost.toFixed(2),
      conv: conv.toFixed(1),
      cost_per_conv: conv > 0 ? (cost / conv).toFixed(2) : '—',
    };
  });

  console.table(table);

  const totals = rows.reduce(
    (acc: any, r: any) => {
      acc.impressions += Number(r.metrics.impressions ?? 0);
      acc.clicks += Number(r.metrics.clicks ?? 0);
      acc.cost += Number(r.metrics.cost_micros ?? 0) / 1_000_000;
      acc.conversions += Number(r.metrics.conversions ?? 0);
      return acc;
    },
    { impressions: 0, clicks: 0, cost: 0, conversions: 0 }
  );

  console.log('\n  Totals:');
  console.log(`    Impressions: ${totals.impressions.toLocaleString()}`);
  console.log(`    Clicks:      ${totals.clicks.toLocaleString()}`);
  console.log(`    Cost:        ${totals.cost.toFixed(2)}`);
  console.log(`    Conversions: ${totals.conversions.toFixed(1)}`);
  console.log(
    `    Cost / conv: ${totals.conversions > 0 ? (totals.cost / totals.conversions).toFixed(2) : '—'}\n`
  );
}

main().catch((err) => {
  console.error('\n  ✗ Query failed:', err?.errors ?? err);
  process.exit(1);
});
