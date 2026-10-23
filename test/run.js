'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const WORK = fs.mkdtempSync(path.join(os.tmpdir(), 'fluid-mermaid-'));
const SKIP = new Set(['.git', '.github', 'test', 'node_modules']);

const { hasMermaidElement, hasMermaidCode, toMermaidClass } = require(path.join(ROOT, 'scripts/utils/mermaid'));

const ENABLED_CONFIG = [
  'post:',
  '  mermaid:',
  '    enable: true',
  '    specific: true',
  '    options: { theme: \'forest\', startOnLoad: true }',
  ''
].join('\n');

const DISABLED_CONFIG = ENABLED_CONFIG.replace('enable: true', 'enable: false');

// highlight.js + 行号：mermaid 块要解包 figure 并去掉行号，其他语言保持原样
// highlight.js with line numbers: unwrap mermaid figures, keep other languages intact
const HLJS_LINENO_CONFIG = [
  'code:',
  '  highlight:',
  '    enable: true',
  '    lib: highlightjs',
  '    line_number: true',
  'post:',
  '  mermaid:',
  '    enable: true',
  '    specific: true',
  '    options: { theme: \'default\' }',
  ''
].join('\n');

// prismjs 分支：language-mermaid 由主题适配器改写，未转换的同类语言名不能被误伤
// prismjs path: the theme rewrites language-mermaid and must not touch similar names
const PRISM_CONFIG = [
  'code:',
  '  highlight:',
  '    enable: true',
  '    lib: prismjs',
  '    line_number: true',
  '    prismjs:',
  '      preprocess: true',
  'post:',
  '  mermaid:',
  '    enable: true',
  '    specific: true',
  '    options: { theme: \'default\' }',
  ''
].join('\n');

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
  console.error(`[test] generated site kept at ${WORK}`);
  process.exit(1);
}

function expectEqual(label, actual, expected) {
  if (actual !== expected) {
    fail(`${label}: expected ${expected}, got ${actual}`);
  }
}

function expectMatch(label, html, regex) {
  if (!regex.test(html)) {
    fail(`${label}: expected to match ${regex}`);
  }
}

function expectNoMatch(label, html, regex) {
  if (regex.test(html)) {
    fail(`${label}: expected NOT to match ${regex}`);
  }
}

// 检测器必须是元素级匹配：整段 HTML 里的注释、脚本、属性值和 data-* 都不能算数
// The detector must be element-level, so comments, scripts, attribute values and
// data-* attributes inside the content must not count
function testDetector() {
  const elementCases = [
    ['<code class=" mermaid">graph TD</code>', true, 'code fence output'],
    ['<code class="hljs mermaid">graph TD</code>', true, 'highlight.js output'],
    ['<pre><code class="mermaid">graph TD</code></pre>', true, 'prism output after adaption'],
    ['<div class="mermaid">graph TD</div>', true, 'explicit div'],
    ['<div class=\'mermaid\'>graph TD</div>', true, 'single-quoted class'],
    ['<div class=mermaid>graph TD</div>', true, 'unquoted class'],
    ['<div id="x" class="foo mermaid bar">graph TD</div>', true, 'compound class'],
    ['<div\n  class="foo\n  mermaid">graph TD</div>', true, 'multi-line attributes'],
    ['<div class="mermaid" data-label="a>b">x</div>', true, '">" inside an attribute value'],
    ['<div class="foo mermaid someone\'s">x</div>', true, 'apostrophe inside a double-quoted class'],
    ['<div title=\'class="mermaid"\'>x</div>', false, 'class text inside another attribute'],
    ['<div data-class="mermaid">x</div>', false, 'data-class attribute'],
    ['<!-- <div class="mermaid">x</div> -->', false, 'html comment'],
    ['<template><div class="mermaid">x</div></template>', false, 'inert template content'],
    ['<script>var t = \'<div class="mermaid">\';</script>', false, 'script body'],
    ['<style>.mermaid { color: red; }</style>', false, 'style body'],
    ['&lt;div class="mermaid"&gt;', false, 'escaped html'],
    ['<code class="language-mermaid">x</code>', false, 'raw language- class is not rendered'],
    ['<div class="not-mermaid">x</div>', false, 'not-mermaid class'],
    ['<div class="mermaid-wrapper">x</div>', false, 'prefixed class'],
    ['just text', false, 'plain text']
  ];

  for (const [html, expected, why] of elementCases) {
    expectEqual(`hasMermaidElement(${why})`, hasMermaidElement(html), expected);
  }

  // 代码块适配器需要识别 prism 转换前的 language-mermaid
  // Adapters run before the class is rewritten, so accept language-mermaid there
  expectEqual('hasMermaidCode(language-mermaid)', hasMermaidCode('<code class="language-mermaid">x</code>'), true);
  expectEqual('hasMermaidCode(hljs mermaid)', hasMermaidCode('<code class="hljs mermaid">x</code>'), true);
  expectEqual('hasMermaidCode(not-mermaid)', hasMermaidCode('<code class="hljs not-mermaid">x</code>'), false);

  const rewriteCases = [
    ['<pre class="language-mermaid"><code class="language-mermaid">x</code></pre>',
      '<pre class="mermaid"><code class="mermaid">x</code></pre>', 'both wrapper and code'],
    ['<code class="language-mermaid line-numbers">x</code>',
      '<code class="mermaid line-numbers">x</code>', 'other tokens preserved'],
    ['<code class="language-mermaid-wrapper">x</code>',
      '<code class="language-mermaid-wrapper">x</code>', 'prefixed language untouched'],
    ['<code class=\'language-mermaid\'>x</code>',
      '<code class=\'mermaid\'>x</code>', 'single quotes preserved']
  ];

  for (const [html, expected, why] of rewriteCases) {
    expectEqual(`toMermaidClass(${why})`, toMermaidClass(html), expected);
  }
}

function resolveModules() {
  if (process.env.FLUID_TEST_MODULES) {
    console.log(`[test] reusing node_modules from ${process.env.FLUID_TEST_MODULES}`);
    return process.env.FLUID_TEST_MODULES;
  }
  const deps = path.join(WORK, 'deps');
  fs.mkdirSync(deps, { recursive: true });
  console.log('[test] installing dependencies...');
  // 固定版本：测试应该验证当前这套已知可用的组合，而不是随时漂移的 latest
  // Pinned versions keep the test on the combination that was verified
  const installed = spawnSync('npm', [
    'install', '--no-save', '--no-audit', '--no-fund', '--loglevel=error',
    'hexo@8.1.2', 'hexo-renderer-ejs@2.0.0', 'hexo-renderer-marked@7.0.1',
    'hexo-renderer-stylus@3.0.1', 'hexo-pagination@3.0.0', 'nunjucks@3.2.4',
    '@adobe/css-tools@4.3.3', 'hexo-prism-plugin@2.3.0'
  ], { cwd: deps, stdio: 'inherit' });
  if (installed.status !== 0) {
    fail('npm install failed');
  }
  return path.join(deps, 'node_modules');
}

async function buildSite(name, fluidConfig, modules) {
  const site = path.join(WORK, name);
  copyDir(path.join(__dirname, 'fixture'), site);
  copyDir(ROOT, path.join(site, 'themes', 'fluid'));
  fs.writeFileSync(path.join(site, '_config.fluid.yml'), fluidConfig);
  fs.symlinkSync(modules, path.join(site, 'node_modules'), 'dir');

  const Hexo = require(path.join(site, 'node_modules', 'hexo'));
  const hexo = new Hexo(site, { silent: true });
  const warnings = [];
  await hexo.init();
  hexo.log.warn = (...args) => warnings.push(args.join(' '));
  hexo.log.info = () => {};
  hexo.log.debug = () => {};
  await hexo.call('generate');
  await hexo.exit();

  return {
    warnings,
    html(page) {
      const file = path.join(site, 'public', page, 'index.html');
      if (!fs.existsSync(file)) {
        fail(`missing generated page ${page}/index.html in ${name}`);
      }
      return fs.readFileSync(file, 'utf8');
    }
  };
}

function mermaidWarnings(warnings) {
  return warnings.filter((line) => line.includes('[Fluid] Mermaid block found'));
}

async function testEnabledBuild(modules) {
  const site = await buildSite('enabled', ENABLED_CONFIG, modules);

  const cases = [
    { page: 'with-flag', loads: true, why: 'Front-matter mermaid: true' },
    { page: 'block-only', loads: true, why: '```mermaid fence' },
    { page: 'tag-only', loads: true, why: '{% mermaid %} tag' },
    { page: 'div-mermaid', loads: true, why: '<div class="mermaid"> in content' },
    { page: 'plain', loads: false, why: 'no mermaid block' },
    { page: 'not-mermaid', loads: false, why: '```not-mermaid fence is not a diagram' },
    { page: 'escaped-sample', loads: false, why: 'mermaid example escaped inside an html fence' },
    { page: 'raw-language', loads: false, why: 'raw language-mermaid class is not rendered by run()' },
    { page: 'opt-out', loads: false, why: 'mermaid: false in Front-matter' }
  ];

  for (const item of cases) {
    const html = site.html(item.page);
    expectEqual(`${item.page}: mermaid.min.js`, html.includes('mermaid.min.js'), item.loads);
  }

  const withFlag = site.html('with-flag');
  expectMatch('with-flag: startOnLoad forced off', withFlag, /Object\.assign\(\{\}, \{[^}]*\}, \{ startOnLoad: false \}\)/);
  expectMatch('with-flag: theme options passed through', withFlag, /"theme":"forest"/);
  expectNoMatch('with-flag: no legacy init()', withFlag, /mermaid\.init\s*\(/);
  expectMatch('with-flag: querySelector explicit', withFlag, /querySelector:\s*['"]\.mermaid['"]/);
  // suppressErrors 会吞掉 run() 的 reject，让失败无法观测
  // suppressErrors swallows run()'s rejection, hiding failures
  expectMatch('with-flag: run() only passes querySelector', withFlag, /mermaid\.run\(\{\s*querySelector:\s*['"]\.mermaid['"]\s*\}\)/);
  expectMatch('with-flag: load failures are reported', withFlag, /Failed to load mermaid/);

  // 代码块类名与高亮不能被误伤
  // Code blocks must keep their classes and highlighting
  expectMatch('with-flag: mermaid code block preserved', withFlag, /class="[^"]*\bmermaid\b[^"]*"/);
  const notMermaid = site.html('not-mermaid');
  expectMatch('not-mermaid: language class preserved', notMermaid, /class="[^"]*not-mermaid[^"]*"/);
  expectMatch('not-mermaid: hljs class preserved', notMermaid, /class="hljs not-mermaid"/);
  expectNoMatch('not-mermaid: no mermaid class rewrite', notMermaid, /class="mermaid"/);

  // 正文里的 div.mermaid 不能被代码块适配器包成 code-wrapper
  // A raw div.mermaid must not be wrapped like a code block
  const divMermaid = site.html('div-mermaid');
  expectMatch('div-mermaid: block preserved', divMermaid, /<div class="mermaid">/);
  expectNoMatch('div-mermaid: not wrapped as code', divMermaid, /<div class="code-wrapper"><div class="mermaid">/);

  // 代码围栏里的示例必须保持为高亮文本，不能变成真实图表节点
  // An escaped example must stay highlighted text, not become a diagram node
  const escaped = site.html('escaped-sample');
  expectNoMatch('escaped-sample: no real mermaid element', escaped, /<div class="mermaid">/);
  expectMatch('escaped-sample: kept as highlighted html', escaped, /class="hljs-tag"/);

  const found = mermaidWarnings(site.warnings);
  expectEqual(
    'enabled: warnings only for the opted-out page',
    found.map((line) => (line.includes('opt-out') ? 'opt-out' : line)).join(','),
    'opt-out'
  );
}

async function testDisabledBuild(modules) {
  const site = await buildSite('disabled', DISABLED_CONFIG, modules);

  for (const page of ['with-flag', 'block-only', 'tag-only', 'div-mermaid', 'opt-out', 'plain']) {
    expectEqual(`disabled/${page}: mermaid.min.js`, site.html(page).includes('mermaid.min.js'), false);
  }

  const found = mermaidWarnings(site.warnings);
  const pagesWithWarning = found.map((line) => {
    const match = line.match(/"([^"]+)"/);
    return match ? match[1].split('/')[0] : line;
  }).sort();
  expectEqual(
    'disabled: warns exactly for pages with renderable diagrams',
    pagesWithWarning.join(','),
    ['block-only', 'div-mermaid', 'opt-out', 'tag-only', 'with-flag'].join(',')
  );
}

async function testHighlightLineNumberBuild(modules) {
  const site = await buildSite('hljs-lineno', HLJS_LINENO_CONFIG, modules);

  const blockOnly = site.html('block-only');
  expectEqual('hljs+line_number/block-only: mermaid.min.js', blockOnly.includes('mermaid.min.js'), true);
  expectMatch('hljs+line_number/block-only: figure unwrapped', blockOnly, /<code class="\s*mermaid">graph TD\n {2}A --&gt; B\n<\/code>/);
  expectNoMatch('hljs+line_number/block-only: figure removed', blockOnly, /<figure class="highlight mermaid"/);

  const notMermaid = site.html('not-mermaid');
  expectEqual('hljs+line_number/not-mermaid: mermaid.min.js', notMermaid.includes('mermaid.min.js'), false);
  expectMatch('hljs+line_number/not-mermaid: figure kept', notMermaid, /<figure class="highlight plaintext">/);
  expectMatch('hljs+line_number/not-mermaid: hljs class kept', notMermaid, /class="hljs not-mermaid"/);
  expectMatch('hljs+line_number/not-mermaid: line numbers kept', notMermaid, /class="gutter"/);
}

async function testPrismBuild(modules) {
  const site = await buildSite('prism', PRISM_CONFIG, modules);

  const blockOnly = site.html('block-only');
  expectEqual('prism/block-only: mermaid.min.js', blockOnly.includes('mermaid.min.js'), true);
  expectMatch('prism/block-only: language-mermaid rewritten', blockOnly, /<code class="mermaid">/);
  expectNoMatch('prism/block-only: no leftover language class', blockOnly, /class="[^"]*language-mermaid[^"]*"/);
  expectNoMatch('prism/block-only: line numbers removed', blockOnly, /line-numbers-rows/);
  expectNoMatch('prism/block-only: pre attributes removed', blockOnly, /<pre class=/);

  const notMermaid = site.html('not-mermaid');
  expectEqual('prism/not-mermaid: mermaid.min.js', notMermaid.includes('mermaid.min.js'), false);
  expectMatch('prism/not-mermaid: language preserved', notMermaid, /class="[^"]*language-not-mermaid[^"]*"/);
  expectMatch('prism/not-mermaid: line numbers kept', notMermaid, /line-numbers-rows/);

  const escaped = site.html('escaped-sample');
  expectEqual('prism/escaped-sample: mermaid.min.js', escaped.includes('mermaid.min.js'), false);
  expectMatch('prism/escaped-sample: kept as highlighted html', escaped, /class="token tag"/);
  expectNoMatch('prism/escaped-sample: no real mermaid element', escaped, /<div class="mermaid">/);

  const divMermaid = site.html('div-mermaid');
  expectEqual('prism/div-mermaid: mermaid.min.js', divMermaid.includes('mermaid.min.js'), true);

  expectEqual('prism/plain: mermaid.min.js', site.html('plain').includes('mermaid.min.js'), false);
}

async function main() {
  console.log(`[test] work dir: ${WORK}`);

  testDetector();

  const modules = resolveModules();
  await testEnabledBuild(modules);
  await testDisabledBuild(modules);
  await testHighlightLineNumberBuild(modules);
  await testPrismBuild(modules);

  console.log('[test] all mermaid assertions passed');
  fs.rmSync(WORK, { recursive: true, force: true });
}

main().catch((err) => {
  fail(err && err.stack ? err.stack : String(err));
});
