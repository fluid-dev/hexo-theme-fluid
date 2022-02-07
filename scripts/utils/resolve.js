'use strict';

const path = require('path');

const resolveModule = (name, file = '') => {
  let dir;
  try {
    dir = path.dirname(require.resolve(`${name}/package.json`));
  } catch (error) {
    return '';
  }
  return `${dir}/${file}`;
};

module.exports = resolveModule;
