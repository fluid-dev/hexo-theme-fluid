'use strict';

const isObject = (item) => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

const merge = (target, ...sources) => {
  for (const source of sources) {
    for (const key in source) {
      if (!Object.prototype.hasOwnProperty.call(source, key)) {
        continue;
      }
      if (isObject(target[key]) && isObject(source[key])) {
        merge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
};

module.exports = {
  isObject: isObject,
  merge   : merge
};
