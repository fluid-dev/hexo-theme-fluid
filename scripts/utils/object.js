'use strict';

const isObject = (obj) => {
  return obj && typeof obj === 'object' && !Array.isArray(obj);
};

const isNotEmptyObject = (obj) => {
  return obj && typeof obj === 'object' && Object.getOwnPropertyNames(obj).length !== 0;
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
  isObject,
  isNotEmptyObject,
  merge
};
