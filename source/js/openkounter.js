/* global CONFIG, Fluid */

(function(window, document) {
  'use strict';

  // Get server URL from config
  const API_SERVER = (CONFIG.web_analytics.openkounter && CONFIG.web_analytics.openkounter.server_url) || '';

  if (!API_SERVER) {
    console.warn('OpenKounter: server_url is not configured');
    return;
  }

  function getRecord(target) {
    return fetch(`${API_SERVER}/api/counter?target=${encodeURIComponent(target)}`)
      .then(resp => {
        if (!resp.ok) {
          throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
        }
        return resp.json();
      })
      .then(({ data, code, message }) => {
        if (code !== 0) {
          throw new Error(message || 'Unknown error');
        }
        return { time: data.time || 0, objectId: data.target };
      })
      .catch(error => {
        console.error('OpenKounter fetch error:', error);
        return { time: 0, objectId: target };
      });
  }

  function increment(incrArr) {
    if (!incrArr || incrArr.length === 0) {
      return Promise.resolve([]);
    }

    return fetch(`${API_SERVER}/api/counter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'batch_inc',
        requests: incrArr
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(res => {
        if (res.code !== 0) {
          throw new Error(res.message || 'Failed to increment counter');
        }
        return res.data;
      })
      .catch(error => {
        console.error('OpenKounter increment error:', error);
      });
  }

  function buildIncrement(objectId) {
    return { target: objectId };
  }

  // 校验是否为有效的主机（排除本地开发环境）
  function validHost() {
    const ignoreLocal = CONFIG.web_analytics.openkounter && CONFIG.web_analytics.openkounter.ignore_local;
    if (ignoreLocal !== false) {
      const hostname = window.location.hostname;
      if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]') {
        return false;
      }
    }
    return true;
  }

  // 校验是否为有效的独立访客（24小时内只计一次）
  function validUV() {
    const key = 'OpenKounter_UV_Flag';
    const now = Date.now();

    try {
      const flag = localStorage.getItem(key);
      if (flag) {
        const lastVisit = parseInt(flag, 10);
        // 距离上次访问小于 24 小时则不计为新 UV
        if (now - lastVisit <= 86400000) {
          return false;
        }
      }
      localStorage.setItem(key, now.toString());
    } catch (e) {
      // localStorage 不可用时默认计为 UV
      console.warn('OpenKounter: localStorage is not available');
    }
    return true;
  }

  function addCount() {
    const enableIncr = CONFIG.web_analytics.enable && (!window.Fluid || !Fluid.ctx.dnt) && validHost();
    const getterArr = [];
    const incrArr = [];

    // 请求站点 PV 并自增
    const pvCtn = document.querySelector('#openkounter-site-pv-container');
    if (pvCtn) {
      const pvGetter = getRecord('site-pv').then((record) => {
        if (enableIncr) {
          incrArr.push(buildIncrement(record.objectId));
        }
        const ele = document.querySelector('#openkounter-site-pv');
        if (ele) {
          ele.innerText = (record.time || 0) + (enableIncr ? 1 : 0);
          pvCtn.style.display = 'inline';
        }
      });
      getterArr.push(pvGetter);
    }

    // 请求站点 UV 并自增
    const uvCtn = document.querySelector('#openkounter-site-uv-container');
    if (uvCtn) {
      const uvGetter = getRecord('site-uv').then((record) => {
        const incrUV = validUV() && enableIncr;
        if (incrUV) {
          incrArr.push(buildIncrement(record.objectId));
        }
        const ele = document.querySelector('#openkounter-site-uv');
        if (ele) {
          ele.innerText = (record.time || 0) + (incrUV ? 1 : 0);
          uvCtn.style.display = 'inline';
        }
      });
      getterArr.push(uvGetter);
    }

    // 请求页面浏览数并自增
    const viewCtn = document.querySelector('#openkounter-page-views-container');
    if (viewCtn) {
      const pathConfig = CONFIG.web_analytics.openkounter.path || 'window.location.pathname';
      const path = eval(pathConfig);
      const target = decodeURI(path.replace(/\/*(index.html)?$/, '/'));

      const viewGetter = getRecord(target).then((record) => {
        if (enableIncr) {
          incrArr.push(buildIncrement(record.objectId));
        }
        const ele = document.querySelector('#openkounter-page-views');
        if (ele) {
          ele.innerText = (record.time || 0) + (enableIncr ? 1 : 0);
          viewCtn.style.display = 'inline';
        }
      });
      getterArr.push(viewGetter);
    }

    // 批量发起统计请求
    Promise.all(getterArr).then(() => {
      if (enableIncr && incrArr.length > 0) {
        increment(incrArr);
      }
    }).catch(error => {
      console.error('OpenKounter error:', error);
    });
  }

  addCount();

})(window, document);

