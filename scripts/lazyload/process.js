'use strict';
function lazyProcess(htmlContent) {
  let loadingImage = '/img/loading.gif';
  return htmlContent.replace(/<img(\s*?)src="(.*?)"(.*?)>/gi, (str, p1, p2) => {
    if (/srcset=/gi.test(str)) {
      return str;
    }
    return str.replace(p2, `${p2}" srcset="${loadingImage}"`);
  });
}

module.exports.processPost = function(data) {
  data.content = lazyProcess.call(this, data.content);
  return data;
};

module.exports.processSite = function (htmlContent) {
  return lazyProcess.call(this, htmlContent);
};