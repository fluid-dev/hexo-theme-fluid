<h1 align="center">Fluid</h1>

<p align="center">一款 Material Design 风格的主题</p>

<p align="center">
  <img alt="Hexo version" src="https://img.shields.io/badge/Hexo-3%2B-orange">
  <img alt="contributors" src="https://img.shields.io/github/contributors/fluid-dev/hexo-theme-fluid.svg?style=flat">
  <img alt="license" src="https://img.shields.io/github/license/fluid-dev/hexo-theme-fluid.svg?style=flat">
</p>

![ScreenShot](https://cdn.jsdelivr.net/gh/fluid-dev/static@master/hexo-theme-fluid/screenshots/1.png)


## 演示 Demo

[Rook1e's blog](https://0x2e.github.io)

[zkqiang's blog](http://zkqiang.cn)

## 公告 Notice

:warning: 本公告面向老用户，新用户可忽略。

从 `v1.4.0` 版本开始，本项目正式更名为 **Fluid** (原项目名：Material-T)，并将仓库和归属转移至 **Fluid-dev** 组织，因此 git remote url、主题目录名、相关代码 会有变化。

如打算升级 `v1.4.0`，建议按如下操作：
1. 将 release 包解压后重命名为 `fluid` （使用 master 分支建议重新 clone）
2. 将博客根目录 `_config.yml` 配置修改 `theme: fluid`
3. 将原 Material-T 的 `_config.yml` 被修改部分复制过来，或按「[关于配置 Config](https://github.com/fluid-dev/hexo-theme-fluid#%E5%85%B3%E4%BA%8E%E9%85%8D%E7%BD%AE-config)」使用覆盖配置功能。

给各位带来的不便敬请谅解。

## 快速开始 Quick Start

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

## 关于配置 Config

v1.4.0 版本开始，可以在 Hexo 博客根目录的 source 目录下（不是主题的 source 目录），创建 `_data/fluid_config.yml`，然后将 `/theme/fluid/_config.yml` 中被修改的配置或者全部配置，复制到 `_data/fluid_config.yml` 中，生成时会自动覆盖主题配置，并且更新主题后不会丢失。

其他情况，建议更新前备份 `/theme/fluid/_config.yml`，以免覆盖自定义的配置项。

## 常见问题 FAQ

#### 代码高亮效果异常

- 请确认已完成上述『关闭默认的代码高亮』步骤
- 尝试清除命令 `hexo clean && hexo g`

#### 配置无效

- 请检查配置文件是否符合 yml 语法，如冒号后需要有空格，缩进需要 2 个空格等

## 文档 Docs

[详细配置](https://github.com/fluid-dev/hexo-fluid-docs)

[更新日志](https://github.com/fluid-dev/hexo-theme-fluid/blob/master/Changelog.md)

[文章配置](https://hexo.io/zh-cn/docs/front-matter)

## 参与开发 Contributing

如果您是初次贡献，可以先从 [help wanted](https://github.com/fluid-dev/hexo-theme-fluid/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) 列表中认领一个比较小的任务来快速参与社区贡献。您可以直接在相应 issue 中回复参与意愿，然后参照下面的 GitHub 工作流指引解决 issue 并按照规范提交 PR，通过 review 后就会被 merge 到 master 分支。

推荐使用以下工作流参与贡献：

1. 将仓库 fork 到自己的 GitHub，并 clone 到本地进行开发
2. 创建新的分支，在新的分支上开发
3. 保持分支与远程 develop 分支一致（通过 fetch 和 rebase 操作）
4. 在本地提交变更（注意 commit log 保持简练、规范）
5. 将提交 push 到 fork 的仓库下
6. 创建一个 pull request 到 fluid-dev/hexo-theme-fluid 的 develop 分支

## 贡献者 Contributors

https://github.com/fluid-dev/hexo-theme-fluid/graphs/contributors

非代码贡献：@zhugaoqi

## 开源协议 License

[MIT](https://github.com/fluid-dev/hexo-theme-fluid/blob/master/LICENSE)
