/* global hexo */

'use strict';

const crypto = require('crypto');

hexo.extend.helper.register('md5', function(string) {
  return crypto.createHash('md5').update(string).digest('hex');
});
