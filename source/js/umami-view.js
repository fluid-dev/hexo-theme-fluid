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

// 获取站点统计数据
async function siteStats() {
  try {
    const response = await fetch(`${request_url}?${params}`, request_header);
    const data = await response.json();
    const uniqueVisitors = data.visitors.value; // 获取独立访客数
    const pageViews = data.pageviews.value; // 获取页面浏览量

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
    const response = await fetch(`${request_url}?${params}&url=${path}`, request_header);
    const data = await response.json();
    const pageViews = data.pageviews.value;

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
  let target = decodeURI(path.replace(/\/*(index.html)?$/, "/"));
  pageStats(target);
}
