/* global hexo */

'use strict';

const crypto = require('crypto');
const compareVersions = require('../../scripts/utils/compare-versions');

hexo.extend.helper.register('md5', function(string) {
  return crypto.createHash('md5').update(string).digest('hex');
});

hexo.extend.helper.register('compareVersions', function(ver1, ver2) {
  return compareVersions(ver1, ver2);
});
