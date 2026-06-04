// 从配置文件中获取 umami 的配置
const website_id = CONFIG.web_analytics.umami.website_id;
// 拼接请求地址
const request_url = `${CONFIG.web_analytics.umami.api_server}/api/websites/${website_id}/stats`;

const start_time = new Date(CONFIG.web_analytics.umami.start_time).getTime();
const end_time = new Date().getTime();
const token = CONFIG.web_analytics.umami.token;

// 检查配置是否为空
if (!website_id) {
  throw new Error("Umami website_id is empty");
}
if (!request_url) {
  throw new Error("Umami request_url is empty");
}
if (!start_time) {
  throw new Error("Umami start_time is empty");
}
if (!token) {
  throw new Error("Umami token is empty");
}

// 构造请求参数
const params = new URLSearchParams({
  startAt: start_time,
  endAt: end_time,
});
// 构造请求头
const request_header = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token,
  },
};

// 兼容 Umami v2 的 { value } 和 v3 的数字返回格式
function getStatValue(data, key) {
  const value = data && data[key];

  if (typeof value === "number") {
    return value;
  }

  if (value && typeof value.value === "number") {
    return value.value;
  }

  return 0;
}

async function requestStats(queryParams) {
  const response = await fetch(`${request_url}?${queryParams}`, request_header);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Umami API error ${response.status}: ${JSON.stringify(data)}`);
  }

  if (!data || typeof data.pageviews === "undefined") {
    throw new Error(`Invalid Umami stats response: ${JSON.stringify(data)}`);
  }

  return data;
}

async function requestPageStats(path) {
  const v3Params = new URLSearchParams(params);
  v3Params.set("path", path);

  try {
    const data = await requestStats(v3Params);
    if (typeof data.pageviews === "number") {
      return data;
    }
  } catch (error) {
    console.warn("Failed to fetch Umami stats with v3 path filter, fallback to v2 url filter.", error);
  }

  const v2Params = new URLSearchParams(params);
  v2Params.set("url", path);
  return requestStats(v2Params);
}

// 获取站点统计数据
async function siteStats() {
  try {
    const data = await requestStats(params);
    const uniqueVisitors = getStatValue(data, "visitors"); // 获取独立访客数
    const pageViews = getStatValue(data, "pageviews"); // 获取页面浏览量

    let pvCtn = document.querySelector("#umami-site-pv-container");
    if (pvCtn) {
      let ele = document.querySelector("#umami-site-pv");
      if (ele) {
        ele.textContent = pageViews; // 设置页面浏览量
        pvCtn.style.display = "inline"; // 将元素显示出来
      }
    }

    let uvCtn = document.querySelector("#umami-site-uv-container");
    if (uvCtn) {
      let ele = document.querySelector("#umami-site-uv");
      if (ele) {
        ele.textContent = uniqueVisitors;
        uvCtn.style.display = "inline";
      }
    }
  } catch (error) {
    console.error(error);
    return "-1";
  }
}

// 获取页面浏览量
async function pageStats(path) {
  try {
    const data = await requestPageStats(path);
    const pageViews = getStatValue(data, "pageviews");

    let viewCtn = document.querySelector("#umami-page-views-container");
    if (viewCtn) {
      let ele = document.querySelector("#umami-page-views");
      if (ele) {
        ele.textContent = pageViews;
        viewCtn.style.display = "inline";
      }
    }
  } catch (error) {
    console.error(error);
    return "-1";
  }
}

siteStats();

// 获取页面容器
let viewCtn = document.querySelector("#umami-page-views-container");
// 如果页面容器存在，则获取页面浏览量
if (viewCtn) {
  let path = window.location.pathname;
  let target = path
    .replace(/(\/[^/]+\.html)\/$/, "$1")  // 如果是 '/xxxx.html/' 格式的路径，则去掉最后那个 '/'
    .replace(/\/index\.html$/, "/");      // 如果是 '/index.html' 格式，则合并成 '/'
  pageStats(target);
}
