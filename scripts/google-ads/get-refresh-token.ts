/**
 * One-shot OAuth helper. Run once after creating an OAuth Client ID
 * (Desktop app type) in Google Cloud Console. Prints a refresh token
 * to paste into .env.local as GOOGLE_ADS_REFRESH_TOKEN.
 *
 *   npx tsx scripts/google-ads/get-refresh-token.ts
 */
import { config } from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import http from 'node:http';
import { URL } from 'node:url';
import { exec } from 'node:child_process';
import { resolve } from 'node:path';

config({ path: resolve(process.cwd(), '.env.local') });

const CLIENT_ID = process.env.GOOGLE_ADS_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_ADS_CLIENT_SECRET;
const PORT = 3001;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/oauth2callback`;
const SCOPE = 'https://www.googleapis.com/auth/adwords';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('\n  Missing GOOGLE_ADS_CLIENT_ID or GOOGLE_ADS_CLIENT_SECRET in .env.local');
  console.error('  Set them first (see scripts/google-ads/README.md), then re-run.\n');
  process.exit(1);
}

const oauth = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authUrl = oauth.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  scope: [SCOPE],
});

const server = http.createServer(async (req, res) => {
  if (!req.url?.startsWith('/oauth2callback')) {
    res.writeHead(404).end();
    return;
  }
  const url = new URL(req.url, REDIRECT_URI);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    res.writeHead(400, { 'Content-Type': 'text/plain' }).end(`OAuth error: ${error}`);
    console.error(`\n  OAuth error: ${error}\n`);
    server.close();
    process.exit(1);
  }
  if (!code) {
    res.writeHead(400, { 'Content-Type': 'text/plain' }).end('Missing code');
    return;
  }

  try {
    const { tokens } = await oauth.getToken(code);
    res.writeHead(200, { 'Content-Type': 'text/html' }).end(
      '<html><body style="font-family:system-ui;padding:2rem"><h2>Done.</h2><p>Refresh token printed in your terminal. You can close this tab.</p></body></html>'
    );

    if (!tokens.refresh_token) {
      console.error('\n  No refresh_token returned. Likely cause: this Google account previously authorised this Client ID.');
      console.error('  Fix: revoke at https://myaccount.google.com/permissions and re-run.\n');
      server.close();
      process.exit(1);
    }

    console.log('\n  ✓ Refresh token received. Paste this into .env.local:\n');
    console.log(`  GOOGLE_ADS_REFRESH_TOKEN=${tokens.refresh_token}\n`);
    server.close();
    process.exit(0);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' }).end('Token exchange failed');
    console.error('\n  Token exchange failed:', err);
    server.close();
    process.exit(1);
  }
});

server.listen(PORT, () => {
  console.log(`\n  Listening on ${REDIRECT_URI}`);
  console.log('  Opening browser for Google sign-in...\n');
  const opener = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start ""' : 'xdg-open';
  exec(`${opener} "${authUrl}"`, (err) => {
    if (err) {
      console.log('  Could not open browser automatically. Open this URL manually:\n');
      console.log(`  ${authUrl}\n`);
    }
  });
});
