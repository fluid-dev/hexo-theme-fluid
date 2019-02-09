<h1 align="center">Material-T</h1>

<p align="center">一款 Material Design 风格的主题，灵感来源于 <a href="https://github.com/creativetimofficial/material-kit">Material-Kit</a></p>

<p align="center">
  <a href="https://join.slack.com/t/material-t/shared_invite/enQtNTQ2NjA3OTAzOTQwLWIyNGZlYWE2N2U2ZWEzMzBlNDZlYjQxNmI3NGM2Njk4ODUzYTY2MTdmNzRhYjgyYTY5NGZlOTc2YTk1YTMzNDg"><img src="https://img.shields.io/badge/chat-on%20slack-blueviolet.svg"></a>
  <a href="https://github.com/invom/Material-T/issues?q=is%3Aopen+is%3Aissue+label%3Anotification"><img alt="notification" src="https://img.shields.io/github/issues-raw/invom/Material-T/notification.svg?label=notification&style=flat"></a>
  <img alt="contributors" src="https://img.shields.io/github/contributors/invom/Material-T.svg?style=flat">
  <img alt="license" src="https://img.shields.io/github/license/invom/Material-T.svg?style=flat">
</p>

![screenshot-index](https://github.com/invom/Material-T/raw/master/screenshot-index.png)


## 在线预览 Live Preview

[invom's blog](https://invom.cc)

## [文档 Document](http://invom.github.io/Material-T-docs)

## 安装 Installation

**1.** 获取最新版本

```bash
cd themes
git clone -b master https://github.com/invom/Material-T.git Material-T
  ```

**2.** 修改 Hexo 的`_config.yml`

```yml
// 关闭归档页的默认分页：
archive_generator:
  per_page: 0  
  yearly: true
  monthly: true
  daily: false
  order_by: -date

// 关闭默认代码高亮
highlight:
  enable: false
  line_number: false
  auto_detect: false
  tab_replace:
```

**3.** 创建 About Page

```bash
hexo new page about
```

修改 `/source/about/index.md`，添加属性 `type: "about"`

**4.** 在 Hexo 的 `_config.yml` 中启用 `Material-T`

## 更新

`git pull`


## [TODO](https://github.com/invom/Material-T/projects)


## 贡献 Contributing

项目会持续更新，期待您的 Pull Request


## License

MIT
