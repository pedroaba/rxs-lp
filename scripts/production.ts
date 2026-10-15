import 'dotenv/config';
import { spawnSync } from 'node:child_process';

if (!process.env.SITE_URL?.trim()) {
  console.error(
    'Set SITE_URL in .env or the environment before generating public metadata. See .env.example.',
  );
  process.exit(1);
}
const result = spawnSync('pnpm', ['run', 'build'], {
  stdio: 'inherit',
  env: { ...process.env, REQUIRE_SITE_URL: '1' },
});
process.exit(result.status ?? 1);
