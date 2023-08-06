'use strict';

const crypto = require('crypto');

const md5 = (content) => {
  return crypto.createHash('md5').update(content).digest('hex');
}

module.exports = md5;
