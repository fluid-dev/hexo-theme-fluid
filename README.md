<h1 align="center">Material-T</h1>

<p align="center">一款 Material Design 风格的主题</p>

<p align="center">
  <img alt="Hexo version" src="https://img.shields.io/badge/Hexo-3%2B-orange">
  <img alt="contributors" src="https://img.shields.io/github/contributors/0x2e/Material-T.svg?style=flat">
  <img alt="license" src="https://img.shields.io/github/license/0x2e/Material-T.svg?style=flat">
</p>

![ScreenShot](https://i.imgur.com/mMHoZJE.png)


## Demo

[Rook1e's blog](https://0x2e.github.io)

## [文档 Docs](http://0x2e.github.io/Material-T-docs)

## 快速开始 Quick Start

**1.** 获取最新版本

```bash
cd themes
git clone -b master https://github.com/0x2e/Material-T.git Material-T
  ```

**2.** 修改 Hexo 默认配置

按如下内容修改根目录中的 `_config.yml` 

```yml
// 关闭归档页的默认分页：
archive_generator:
  per_page: 0  
  yearly: true
  monthly: true
  daily: false
  order_by: -date

// 关闭默认的代码高亮
highlight:
  enable: false
  line_number: false
  auto_detect: false
  tab_replace:
```

**3.** 在根目录中的 `_config.yml` 中启用 `Material-T`

## 更新 Update

> `v0.9` 向上升级时，建议先备份，然后直接用新版本替换，以免 `git pull` 时出现过多冲突。


建议更新前备份 _config.yml。

```bash
cd /themes/Material-T
git pull
```

## Changelog

2019/8/1
- 新增 subtitle 打字机效果
- 优化文章页中锚的效果
- 文章页底部新增支持 HTML 的 custom 区域，可自定义展示赞赏码等内容
- 优化配置文件和目录结构

2019/7/31
- 自动创建 about 页面

2019/7/31

结合 @zkqiang 的优化建议：

- 文章页样式更换为 Github 风格
- 增加页脚备案信息
- 优化配置文件结构
- 页面细节优化

2019/6/6
- 完善 archive 渲染逻辑

2019/3/15
- 重新设计基本完成，特别感谢 @zhugaoqi 同学的设计指导；
- 将所有第三方库、图片替换为 CDN 引用，极大精简仓库大小；
- 重新设计 archive 渲染逻辑；
- 统一文章页布局，新增文章版权声明；
- 精简页面，配置项;
- 老版本停止维护，代码暂时归档在 v0.9 分支，如有需要请 fork 备份；

## Contributors

按首次 commit 的时间排序，感谢：@zhugaoqi, @ChungZH, @aptend, @zkqiang

## License

MIT
