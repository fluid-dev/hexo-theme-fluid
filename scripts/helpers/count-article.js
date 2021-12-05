/* global hexo */

'use strict';

// 构建图表数据结构
const takeYearData = ({ originData, __ }) => {
  if (!originData || !Array.isArray(originData)) {
    return {};
  }
  const cacheData = {};
  originData.forEach(({ year }) => {
    if (!cacheData[year]) {
      cacheData[year] = 1;
    } else {
      cacheData[year] += 1;
    }
  });
  const years = Object.keys(cacheData);
  return {
    labels  : years.sort((a, b) => a - b),
    datasets: [{
      label: __('article'),
      data : years.sort((a, b) => a - b).map(item => cacheData[item])
    }]
  };
};
const takeMonthData = ({ originData, __ }) => {
  if (!originData || !Array.isArray(originData)) {
    return {};
  }
  const cacheData = {};
  originData.forEach(({ month }) => {
    // 月份+1
    const key = Number(month) + 1;
    if (!cacheData[key]) {
      cacheData[key] = 1;
    } else {
      cacheData[key] += 1;
    }
  });
  return {
    labels  : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => __(`month.${item}`) || item),
    datasets: [{
      label: __('article'),
      data : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => cacheData[item] || 0)
    }]
  };
};
const takeWeekData = ({ originData, __ }) => {
  if (!originData || !Array.isArray(originData)) {
    return {};
  }
  const cacheData = {};
  originData.forEach(({ week }) => {
    // 月份+1
    if (!cacheData[week]) {
      cacheData[week] = 1;
    } else {
      cacheData[week] += 1;
    }
  });
  return {
    labels  : [1, 2, 3, 4, 5, 6, 0].map(item => __(`week.${item}`) || item),
    datasets: [{
      label: __('article'),
      data : [1, 2, 3, 4, 5, 6, 0].map(item => cacheData[item] || 0)
    }]
  };
};

hexo.extend.helper.register('countArticle', function(__) {
  // 返回给页面图标所需要的结构的数据
  const chartsData = {
    year  : {},
    month : {},
    week  : {},
    length: hexo.locals.get('posts').length
  };
  // 统计数据
  const result = hexo.locals.get('posts').data.map(item => {
    return {
      year : item.date.year(),
      month: item.date.month(),
      week : item.date.weekday()
    };
  });
  chartsData.year = takeYearData({ originData: result, __ });
  chartsData.month = takeMonthData({ originData: result, __ });
  chartsData.week = takeWeekData({ originData: result, __ });
  return JSON.stringify(chartsData);
});
