'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const WORK = fs.mkdtempSync(path.join(os.tmpdir(), 'fluid-mermaid-'));
const SITE = path.join(WORK, 'site');
const THEME = path.join(SITE, 'themes', 'fluid');

const SKIP = new Set(['.git', '.github', 'test', 'node_modules']);

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(from, to);
    } else {
      fs.copyFileSync(from, to);
    }
  }
}

function fail(message) {
  console.error(`\n[test] FAIL: ${message}`);
  console.error(`[test] generated site kept at ${SITE}`);
  process.exit(1);
}

function load(page) {
  const file = path.join(SITE, 'public', page, 'index.html');
  if (!fs.existsSync(file)) {
    fail(`missing generated page ${page}/index.html`);
  }
  return fs.readFileSync(file, 'utf8');
}

async function main() {
  console.log(`[test] work dir: ${WORK}`);

  copyDir(path.join(__dirname, 'fixture'), SITE);
  copyDir(ROOT, THEME);

  const prebuiltModules = process.env.FLUID_TEST_MODULES;
  if (prebuiltModules) {
    console.log(`[test] reusing node_modules from ${prebuiltModules}`);
    fs.symlinkSync(prebuiltModules, path.join(SITE, 'node_modules'), 'dir');
  } else {
    console.log('[test] installing dependencies...');
    const installed = spawnSync('npm', [
      'install', '--no-save', '--no-audit', '--no-fund', '--loglevel=error',
      'hexo@8', 'hexo-renderer-ejs', 'hexo-renderer-marked', 'hexo-renderer-stylus',
      'hexo-pagination', 'nunjucks', '@adobe/css-tools',
    ], { cwd: SITE, stdio: 'inherit' });
    if (installed.status !== 0) {
      fail('npm install failed');
    }
  }

  const Hexo = require(path.join(SITE, 'node_modules', 'hexo'));
  const hexo = new Hexo(SITE, { silent: true });
  const warnings = [];
  await hexo.init();
  hexo.log.warn = (...args) => warnings.push(args.join(' '));
  hexo.log.info = () => {};
  hexo.log.debug = () => {};
  await hexo.call('generate');
  await hexo.exit();

  const cases = [
    { page: 'with-flag', loads: true, why: 'Front-matter mermaid: true' },
    { page: 'block-only', loads: true, why: 'mermaid block detected in content' },
    { page: 'tag-only', loads: true, why: '{% mermaid %} tag detected in content' },
    { page: 'plain', loads: false, why: 'no mermaid block' },
    { page: 'opt-out', loads: false, why: 'mermaid: false in Front-matter' },
  ];

  for (const item of cases) {
    const html = load(item.page);
    const loads = html.includes('mermaid.min.js');
    if (loads !== item.loads) {
      fail(`${item.page}: expected mermaid.min.js ${item.loads ? 'present' : 'absent'} (${item.why})`);
    }
  }

  const withFlag = load('with-flag');
  if (!/startOnLoad:\s*false/.test(withFlag)) {
    fail('with-flag: startOnLoad is not forced to false');
  }
  if (/mermaid\.init\s*\(/.test(withFlag)) {
    fail('with-flag: legacy mermaid.init() call is still present');
  }
  if (!/suppressErrors:\s*true/.test(withFlag)) {
    fail('with-flag: mermaid.run() is not called with suppressErrors');
  }
  if (!/querySelector:\s*['"]\.mermaid['"]/.test(withFlag)) {
    fail('with-flag: mermaid.run() does not set querySelector explicitly');
  }
  if (!/class="[^"]*\bmermaid\b[^"]*"/.test(withFlag)) {
    fail('with-flag: mermaid code block was not preserved');
  }

  if (!warnings.some((line) => /opt-out/.test(line) && /mermaid: false/.test(line))) {
    fail(`expected a build warning for opt-out, got:\n${warnings.join('\n')}`);
  }
  if (warnings.some((line) => /plain/.test(line))) {
    fail(`unexpected warning for plain page:\n${warnings.join('\n')}`);
  }

  console.log('[test] all mermaid assertions passed');
  fs.rmSync(WORK, { recursive: true, force: true });
}

main().catch((err) => {
  fail(err && err.stack ? err.stack : String(err));
});
