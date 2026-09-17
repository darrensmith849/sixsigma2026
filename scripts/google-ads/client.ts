/**
 * Shared Google Ads client setup. Loads .env.local and constructs a
 * customer instance using the credentials gathered per the README.
 */
import { config } from 'dotenv';
import { GoogleAdsApi } from 'google-ads-api';
import { resolve } from 'node:path';

config({ path: resolve(process.cwd(), '.env.local') });

function need(name: string): string {
  const v = process.env[name];
  if (!v) {
    console.error(`\n  Missing ${name} in .env.local. See scripts/google-ads/README.md.\n`);
    process.exit(1);
  }
  return v;
}

export const customerId = need('GOOGLE_ADS_CUSTOMER_ID');
export const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID || undefined;

const client = new GoogleAdsApi({
  client_id: need('GOOGLE_ADS_CLIENT_ID'),
  client_secret: need('GOOGLE_ADS_CLIENT_SECRET'),
  developer_token: need('GOOGLE_ADS_DEVELOPER_TOKEN'),
});

export const customer = client.Customer({
  customer_id: customerId,
  refresh_token: need('GOOGLE_ADS_REFRESH_TOKEN'),
  login_customer_id: loginCustomerId,
});

export { client };
