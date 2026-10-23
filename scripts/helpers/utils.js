/* global hexo */

'use strict';

const md5 = require('../utils/crypto');
const { decodeURL } = require('hexo-util');
const compareVersions = require('../../scripts/utils/compare-versions');

hexo.extend.helper.register('md5', function(string) {
  return md5(string);
});

hexo.extend.helper.register('require_version', function(current, require) {
  const verRe = current.match(/[@/](\d{1,2})\.?(\d{0,2})\.?(\d{0,2})/);
  if (verRe && verRe.length >= 4) {
    const ver = `${verRe[1]}.${verRe[2] || 'x'}.${verRe[3] || 'x'}`;
    return compareVersions(ver, require) >= 0;
  }
  return false;
});

hexo.extend.helper.register('deduplicate', function(arr) {
  if (!Array.isArray(arr)) {
    return [];
  }
  return [...new Set(arr)];
});

hexo.extend.helper.register('decode_url', decodeURL);

// 移除正文里的 mermaid 源码，避免图表代码进入摘要和 meta description
// Strip mermaid source so diagram code never leaks into excerpts or meta descriptions
// 只匹配独立的 mermaid 类名，避免误伤 mermaid-wrapper 之类的复合类名；单双引号都支持
// Match only the exact `mermaid` class token, so names like mermaid-wrapper survive
const MERMAID_BLOCK = /<(pre|div|code)\b[^>]*\bclass=(["'])(?:[^"']*\s)?(?:language-)?mermaid(?:\s[^"']*)?\2[^>]*>[\s\S]*?<\/\1>/gi;

hexo.extend.helper.register('strip_mermaid', function(html) {
  // 第二步清掉只剩空壳的 <pre>，fenced 代码块被剥离后会留下它
  // Second pass removes the empty <pre> left behind by a fenced block
  return String(html || '').replace(MERMAID_BLOCK, ' ').replace(/<pre[^>]*>\s*<\/pre>/gi, ' ');
});
