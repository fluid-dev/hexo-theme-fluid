<p align="right">中文简体 | <a title="English" href="README_en.md">English</a></p>

<p align="center">
  <img alt="Fluid Logo" src="https://avatars2.githubusercontent.com/t/3419353?s=280&v=4" width="128">
</p>

<p align="center">一款 Material Design 风格的主题</p>

<p align="center">
  <a href="https://github.com/fluid-dev/hexo-theme-fluid/releases"><img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/fluid-dev/hexo-theme-fluid"></a>
  <a href="https://hexo.io/zh-cn/"><img alt="Hexo version" src="https://img.shields.io/badge/Hexo-3%2B-orange"></a>
  <a href="https://github.com/fluid-dev/hexo-theme-fluid/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/fluid-dev/hexo-theme-fluid.svg?style=flat"></a>
  <a href="https://github.com/fluid-dev/hexo-theme-fluid/blob/master/LICENSE"><img alt="License" src="https://img.shields.io/github/license/fluid-dev/hexo-theme-fluid.svg?style=flat"></a>
</p>

![ScreenShot](https://cdn.jsdelivr.net/gh/fluid-dev/static@master/hexo-theme-fluid/screenshots/1.png)


## 示例

[Rook1e's blog](https://0x2e.github.io)

[zkqiang's blog](http://zkqiang.cn)


## 文档

[详细配置](https://fluid-dev.github.io/hexo-fluid-docs/)

[更新日志](https://github.com/fluid-dev/hexo-theme-fluid/blob/master/Changelog.md)

[文章配置](https://hexo.io/zh-cn/docs/front-matter)

## 公告

:warning: 本公告面向老用户，新用户可忽略。

从 `v1.4.0` 版本开始，本项目正式更名为 **Fluid** (原项目名：Material-T)，并将仓库和归属转移至 **Fluid-dev** 组织，因此 git remote url、主题目录名、相关代码 会有变化。

如果您要升级到 `v1.4.0`，建议按如下操作：
1. 解压 release 包后重命名为 `fluid` （建议使用 master 分支的用户重新 clone）
2. 将博客根目录 `_config.yml` 配置修改 `theme: fluid`
3. 修改主题配置文件，或使用「[平滑升级功能](#%E5%AE%9E%E7%8E%B0%E5%B9%B3%E6%BB%91%E5%8D%87%E7%BA%A7)」。

给各位带来的不便敬请谅解。

## 快速开始

#### 1. 获取最新版本

请优先下载 [最新 release 版本](https://github.com/fluid-dev/hexo-theme-fluid/releases)，master 分支无法保证稳定。

下载后解压到 themes 目录下并重命名为 `fluid`。

#### 2. 必要的配置

按如下内容修改 Hexo 根目录中的 `_config.yml`

```yaml
# 设置语言，需要对应下面目录内的文件名，可以自定义文件内容
# https://github.com/fluid-dev/hexo-theme-fluid/tree/master/languages
language: zh-CN

# 关闭默认的代码高亮
highlight:
  enable: false
```

#### 3. 启用主题

依然是根目录中的 `_config.yml`，如下修改：
```yaml
# Extensions
theme: fluid
```

## 实现平滑升级

从 v1.4.0 版本开始可以使用 Hexo [数据文件](https://hexo.io/zh-cn/docs/data-files.html)存放主题配置：

1. 进入博客根目录的 `/source/_data/` 目录（注意：不是主题的 source 目录），若 `_data` 文件夹不存在，请自行创建
2. 创建 `fluid_config.yml` 文件，并将主题配置文件中被修改的或者所有配置项复制到其中。这样 `fluid_config.yml` 会在 `hexo g` 时自动覆盖主题配置，并且不会在更新主题后丢失。
3. 将您自定义的资源文件（head_img、about.md 等）移动到博客根目录的 `source` 文件夹中（别忘了修改配置文件中对资源的引用地址）
4. (v1.5.0 版本及以上)如果需要使用 CDN 或其他方式存放静态资源：将 `_static_prefix.yml` 复制到博客根目录的 `/source/_data/` 中，重命名为 `fluid_static_prefix.yml`并按自己的需求修改配置。若 `_data/fluid_static_prefix.yml` 存在则会自动覆盖 `/theme/fluid/_static_prefix.yml`。

完成上述步骤后，以后您只需用新的 release 覆盖 `/theme/fluid` 文件夹即可更新主题。

## 常见问题

#### 代码高亮异常（比如出现多重行号）

请确认 Hexo 根目录的 `_config.yml` 中高亮已关闭：

```yaml
highlight:
  enable: false
```

修改后使用清除命令 `hexo clean && hexo g`

#### 配置无效

- 请检查配置文件是否符合 yml 语法，如冒号后需要有空格，缩进需要 2 个空格等

## 参与开发

如果您是初次贡献，可以先从 [help wanted](https://github.com/fluid-dev/hexo-theme-fluid/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) 列表中认领一个比较小的任务来快速参与社区贡献。您可以直接在相应 issue 中回复参与意愿，然后参照下面的 GitHub 工作流指引解决 issue 并按照规范提交 PR，通过 review 后就会被 merge 到 master 分支。

推荐使用以下工作流参与贡献：

1. 将仓库 fork 到自己的 GitHub，并 clone 到本地进行开发
2. 创建新的分支，在新的分支上开发
3. 保持分支与远程 develop 分支一致（通过 fetch 和 rebase 操作）
4. 在本地提交变更（注意 commit log 保持简练、规范）
5. 将提交 push 到 fork 的仓库下
6. 创建一个 pull request 到 fluid-dev/hexo-theme-fluid 的 develop 分支

## 贡献者

[![contributors](https://opencollective.com/hexo-theme-fluid/contributors.svg?width=890&button=false)](https://github.com/fluid-dev/hexo-theme-fluid/graphs/contributors)

非 PR 贡献：@zhugaoqi [@julydate](https://github.com/julydate)

## 开源协议

[MIT](https://github.com/fluid-dev/hexo-theme-fluid/blob/master/LICENSE)

## 微信群

[查看微信群二维码](https://github.com/fluid-dev/hexo-theme-fluid/issues/96)
