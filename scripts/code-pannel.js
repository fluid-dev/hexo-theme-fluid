let attributes = [
  'autocomplete="off"',
  'autocorrect="off"',
  'autocapitalize="off"',
  'spellcheck="false"',
  'contenteditable="true"',
];
let attributesStr = attributes.join(' ');

hexo.extend.filter.register('after_post_render', function (data) {
  let pattern = /<figure class="highlight.*?>.*?<\/figure>/;
  while (pattern.test(data.content)) {
    data.content = data.content.replace(pattern, function () {
      let language = RegExp.$1 || 'plain';
      let lastMatch = RegExp.lastMatch;
      lastMatch = lastMatch.replace(/<figure class="highlight /, '<figure class="iseeu highlight /');
      return `<div class="highlight-wrap" ${ attributesStr } data-rel="${ language.toUpperCase() }">${ lastMatch }</div>`;
    });
  }
  return data;
});
