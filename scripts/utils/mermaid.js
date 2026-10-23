'use strict';

// 识别页面中真正会被 mermaid.run() 渲染的元素。
// mermaid.run 默认按 `.mermaid` 选择器查找节点，所以这里必须基于真实的 class token，
// 不能对整段 HTML 做宽松正则匹配：HTML 注释、<script>/<style> 里的文本、
// `title='class="mermaid"'` 这类属性值、`data-class="mermaid"` 都会造成误判。
// Detect the elements that mermaid.run() will actually render. mermaid.run looks up
// nodes with the `.mermaid` selector, so matching must be based on real class tokens
// instead of a loose regex over the whole HTML: comments, <script>/<style> bodies,
// attribute values such as `title='class="mermaid"'` and `data-class="mermaid"`
// would all match by accident.

// 注释、原始文本元素与 template 的内容不会在页面里生效
// Comments, raw-text elements and inert <template> content never render
const NON_CONTENT = /<!--[\s\S]*?-->|<(script|style|template)\b[^>]*>[\s\S]*?<\/\1\s*>/gi;

// 标签名与属性区；属性值内的 ">" 不会提前结束标签
// Tag name and attribute area; a ">" inside an attribute value does not end the tag
const TAG = /<([a-zA-Z][a-zA-Z0-9:-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>/g;

// class 属性，兼容单引号、双引号和无引号写法
// class attribute, with single, double or no quotes
const CLASS_ATTR = /(?:^|\s)class\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/i;

// HTML 规范要求按 ASCII 空白拆分 class 值，\s 会多算其他字符
// HTML splits class values on ASCII whitespace only
const TOKEN_SPLIT = /[\t\n\f\r ]+/;

const RENDER_TOKENS = new Set(['mermaid']);
// prism 转换前，代码块上的语言标记是 language-mermaid
// Before the prism adapter runs, code blocks are marked with language-mermaid
const CODE_TOKENS = new Set(['mermaid', 'language-mermaid']);

function hasClassToken(html, tokens) {
  if (typeof html !== 'string' || html === '') {
    return false;
  }
  const source = html.replace(NON_CONTENT, ' ');
  TAG.lastIndex = 0;
  let tag;
  while ((tag = TAG.exec(source)) !== null) {
    const attr = CLASS_ATTR.exec(tag[2]);
    if (!attr) {
      continue;
    }
    // 三种引号写法只会命中其中一个分组
    // Exactly one of the three quoting forms matched
    const value = [attr[1], attr[2], attr[3]].find((candidate) => candidate !== undefined);
    if (value && value.split(TOKEN_SPLIT).some((token) => tokens.has(token))) {
      return true;
    }
  }
  return false;
}

/**
 * 页面是否存在会被 mermaid.run({ querySelector: '.mermaid' }) 渲染的元素
 * Whether the content contains an element that mermaid.run() will render
 *
 * @param {string} html
 * @returns {boolean}
 */
function hasMermaidElement(html) {
  return hasClassToken(html, RENDER_TOKENS);
}

/**
 * 代码块是否声明了 mermaid 语言（适配器需要同时识别 language-mermaid）
 * Whether a code block declares the mermaid language
 *
 * @param {string} html
 * @returns {boolean}
 */
function hasMermaidCode(html) {
  return hasClassToken(html, CODE_TOKENS);
}

const CLASS_VALUE = /([\t\n\f\r ]class[\t\n\f\r ]*=[\t\n\f\r ]*)(?:"([^"]*)"|'([^']*)')/gi;

/**
 * 把独立的 language-mermaid token 改为 mermaid，
 * language-mermaid-wrapper 之类的语言名不受影响
 * Rewrite the standalone `language-mermaid` class token only
 *
 * @param {string} html
 * @returns {string}
 */
function toMermaidClass(html) {
  if (typeof html !== 'string' || html === '') {
    return html;
  }
  return html.replace(CLASS_VALUE, (match, prefix, doubleQuoted, singleQuoted) => {
    const quote = doubleQuoted !== undefined ? '"' : '\'';
    const value = doubleQuoted !== undefined ? doubleQuoted : singleQuoted;
    const converted = value
      .split(/([\t\n\f\r ]+)/)
      .map((token) => (token === 'language-mermaid' ? 'mermaid' : token))
      .join('');
    return prefix + quote + converted + quote;
  });
}

module.exports = {
  hasMermaidElement,
  hasMermaidCode,
  toMermaidClass
};
