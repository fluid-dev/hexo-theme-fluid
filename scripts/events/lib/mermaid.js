/* global hexo */

'use strict';

const MERMAID_BLOCK = /<code[^>]*\bmermaid\b[^>]*>/i;

module.exports = (hexo) => {
  // 构建期提示：页面里有 mermaid 块，但配置导致脚本不会被加载时给出警告，
  // 避免图表被当成普通文本静默展示
  // Build-time warning: the page contains mermaid blocks but the script will not
  // be loaded, so the diagrams would silently show up as plain text
  hexo.extend.filter.register('after_post_render', (page) => {
    const config = hexo.theme.config.post.mermaid;
    if (!config || !MERMAID_BLOCK.test(page.content || '')) {
      return page;
    }
    if (!config.enable) {
      hexo.log.warn(`[Fluid] Mermaid block found in "${page.path}" but "post.mermaid.enable" is false, it will be rendered as plain text.`);
    } else if (page.mermaid === false) {
      hexo.log.warn(`[Fluid] Mermaid block found in "${page.path}" but it is disabled by "mermaid: false" in Front-matter.`);
    }
    return page;
  });
};
