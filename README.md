<h1 align="center">Material-T</h1>

<p align="center">一款 Material Design 风格的主题</p>

<p align="center">
  <img alt="GitHub repo size in bytes" src="https://img.shields.io/github/repo-size/invom/Material-T.svg">
  <a href="https://github.com/invom/Material-T/issues?q=is%3Aopen+is%3Aissue+label%3Anotification"><img alt="notification" src="https://img.shields.io/github/issues-raw/invom/Material-T/notification.svg?label=notification&style=flat"></a>
  <img alt="contributors" src="https://img.shields.io/github/contributors/invom/Material-T.svg?style=flat">
  <img alt="license" src="https://img.shields.io/github/license/invom/Material-T.svg?style=flat">
</p>

![ScreenShot](https://i.imgur.com/mMHoZJE.png)


## Demo

[invom's blog](https://invom.github.io)

## [文档 Docs](http://invom.github.io/Material-T-docs)

## 快速开始 Quick Start

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

## 更新 Update

> `v0.9` 向上升级时，建议先备份，然后直接用新版本替换，以免 `git pull` 时出现过多冲突。

```bash
cd /themes/Material-T
git pull
```

## Contributors

@zhugaoqi, @ChungZH

## [TODO](https://github.com/invom/Material-T/projects)

## License

MIT
