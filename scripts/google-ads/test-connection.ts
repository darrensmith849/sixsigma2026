/**
 * Smoke test: confirms the credentials work by fetching the account name
 * and a list of accessible customers (resource names).
 *
 *   npx tsx scripts/google-ads/test-connection.ts
 */
import { client, customer, customerId } from './client.js';

const refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN!;

async function main() {
  console.log(`\n  Testing Google Ads connection for customer ${customerId}...\n`);

  const accessible = await client.listAccessibleCustomers(refreshToken);
  console.log('  Accessible customer resources:');
  for (const r of accessible.resource_names) console.log(`    - ${r}`);

  const rows = await customer.query(`
    SELECT customer.id, customer.descriptive_name, customer.currency_code, customer.time_zone
    FROM customer
    LIMIT 1
  `);

  const c = rows[0]?.customer;
  if (!c) {
    console.error('\n  Connected but customer query returned no rows. Check GOOGLE_ADS_CUSTOMER_ID.\n');
    process.exit(1);
  }

  console.log('\n  Account details:');
  console.log(`    ID:       ${c.id}`);
  console.log(`    Name:     ${c.descriptive_name}`);
  console.log(`    Currency: ${c.currency_code}`);
  console.log(`    Timezone: ${c.time_zone}`);
  console.log('\n  ✓ Connection works.\n');
}

main().catch((err) => {
  console.error('\n  ✗ Connection failed:', err?.errors ?? err);
  process.exit(1);
});
