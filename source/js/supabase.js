/* global CONFIG */
// eslint-disable-next-line no-console

(function(window, document) {
  var supabaseUrl = CONFIG.web_analytics.supabase.server_url;
  var supabaseKey = CONFIG.web_analytics.supabase.anon_key;

  if (!supabaseUrl) {
    throw new Error('Supabase serverUrl is empty');
  }
  if (!supabaseKey) {
    throw new Error('Supabase anonKey is empty');
  }

  // 参数: target (slug), amount (增加的数量，1 或 0)
  // 这个 RPC 调用同时包含了更新和查询逻辑
  function updateCounter(target, amount) {
    return fetch(`${supabaseUrl}/rest/v1/rpc/update_counter`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        slug_input: target,
        increment_amount: amount
      })
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => {
      console.error('Supabase Error:', err);
      return 0;
    });
  }

  // 校验是否为有效的 Host
  function validHost() {
    if (window.location.protocol === 'file:') {
      return false;
    }
    
    if (CONFIG.web_analytics.supabase.ignore_local) {
      var hostname = window.location.hostname;
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return false;
      }
    }
    return true;
  }

  // 校验是否为有效的 UV
  function validUV() {
    var key = 'supabase_UV_Flag';
    var flag = localStorage.getItem(key);
    if (flag) {
      // 距离标记小于 24 小时则不计为 UV
      if (new Date().getTime() - parseInt(flag, 10) <= 86400000) {
        return false;
      }
    }
    localStorage.setItem(key, new Date().getTime().toString());
    return true;
  }

  function addCount() {
    var enableIncr = CONFIG.web_analytics.enable && !Fluid.ctx.dnt && validHost();
    
    // 请求 PV 并自增
    var pvCtn = document.querySelector('#supabase-site-pv-container');
    if (pvCtn) {
      // 如果允许统计则 +1，否则 +0 (只读)
      var amount = enableIncr ? 1 : 0;
      updateCounter('site-pv', amount).then(count => {
        var ele = document.querySelector('#supabase-site-pv');
        if (ele) {
          ele.innerText = count;
          pvCtn.style.display = 'inline';
        }
      });
    }

    // 请求 UV 并自增
    var uvCtn = document.querySelector('#supabase-site-uv-container');
    if (uvCtn) {
      var amount = (enableIncr && validUV()) ? 1 : 0;
      updateCounter('site-uv', amount).then(count => {
        var ele = document.querySelector('#supabase-site-uv');
        if (ele) {
          ele.innerText = count;
          uvCtn.style.display = 'inline';
        }
      });
    }

    // 如果有页面浏览数节点，则请求浏览数并自增
    var viewCtn = document.querySelector('#supabase-page-views-container');
    if (viewCtn) {
      var path = eval(CONFIG.web_analytics.supabase.path || 'window.location.pathname');
      var target = decodeURI(path.replace(/\/*(index.html)?$/, '/'));
      
      var amount = enableIncr ? 1 : 0;
      updateCounter(target, amount).then(count => {
        var ele = document.querySelector('#supabase-page-views');
        if (ele) {
          ele.innerText = count;
          viewCtn.style.display = 'inline';
        }
      });
    }
  }
  addCount();
})(window, document);