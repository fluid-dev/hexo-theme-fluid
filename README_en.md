<p align="right">English | <a title="Chinese" href="README.md">中文简体</a></p>

<p align="center">
  <img alt="Fluid Logo" src="https://avatars2.githubusercontent.com/t/3419353?s=280&v=4" width="128">
</p>

<p align="center">An elegant Material-Design theme for Hexo</p>

<p align="center">
  <a href="https://github.com/fluid-dev/hexo-theme-fluid/releases"><img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/fluid-dev/hexo-theme-fluid"></a>
  <a href="https://hexo.io"><img alt="Hexo version" src="https://img.shields.io/badge/Hexo-3%2B-orange"></a>
  <a href="https://github.com/fluid-dev/hexo-theme-fluid/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/fluid-dev/hexo-theme-fluid.svg?style=flat"></a>
  <a href="https://github.com/fluid-dev/hexo-theme-fluid/blob/master/LICENSE"><img alt="License" src="https://img.shields.io/github/license/fluid-dev/hexo-theme-fluid.svg?style=flat"></a>
</p>

![ScreenShot](https://cdn.jsdelivr.net/gh/fluid-dev/static@master/hexo-theme-fluid/screenshots/index.png)


## Live Preview

[Rook1e's blog](https://rook1e.com)

[zkqiang's blog](http://zkqiang.cn)

## Quick Start

#### 1. Get the latest version

Please download the [latest release version](https://github.com/fluid-dev/hexo-theme-fluid/releases) first, and the master branch cannot guarantee stability.

After downloading, extract it to the themes directory and rename it to `fluid`.

#### 2. Necessary configuration

Modify `_config.yml` in the root directory as follows:

```yaml
# Turn off default highlighting
highlight:
  enable: false
```

#### 3. Enable theme

Still the `_config.yml` in the root directory, modified as follows:
```yaml
# Extensions
theme: fluid
```

## Smooth upgrade

Starting with v1.4.0, you can use Hexo [data files](https://hexo.io/docs/data-files.html) to host theme configurations:

1. Go to the site's `/source/_data/` directory (note: not the `source` directory of the theme), create `_data` directory if it did not exist.
2. Create `fluid_config.yml` and copy the modified or all configuration items from the theme configuration file into it. In this way, configuration item in `fluid_config.yml` will automatically override the theme's `_config.yml` when `hexo g` and will not be lost after updating the theme.
3. Move your custom resource files (head_img, about.md, etc.) to site's `source` folder (don't forget to change the reference address for the resource in the configuration file)
4. (v1.5.0 version and above) If you need to use a CDN or other means to store static resources: Copy theme's `_static_prefix.yml` to site's `/source/_data/`, rename it to `fluid_static_prefix.yml` and modify its configuration. If `_data/fluid_static_prefix.yml` exists, it will automatically overwrite theme's `_static_prefix.yml`.

After completing the above steps, in the future update, you only need to overwrite the `theme/fluid` folder with the new release.

## Features

- [x] Img lazyload
- [x] Custom code highlighting scheme
- [x] Internationalization
- [x] Support for multiple comment plugins
- [x] Support for storing configuration in [Data Files](https://hexo.io/docs/data-files.html)
- [x] Custom static resource CDN
- [x] Built-in search plugin
- [x] Website analysis
- [x] Support for KaTeX

## FAQ

#### Code highlighting exception

- Please confirm that the above "Turn off default highlighting" step has been completed.
- Try "clean" command: `hexo clean && hexo g` `hexo clean && hexo g`

#### Configuration cannot take effect

- Please check if the configuration file conforms to the yml syntax, such as spaces after the colon, 2 spaces for indentation, etc.

## Contributors

[![contributors](https://opencollective.com/hexo-theme-fluid/contributors.svg?width=890&button=false)](https://github.com/fluid-dev/hexo-theme-fluid/graphs/contributors)

Contributors outside PR：[@zhugaoqi](https://github.com/zhugaoqi) [@julydate](https://github.com/julydate)

## Feedback

- WeChat: After the scan, add, **reply "fluid"** (in chat reply, not request note) automatically pull you into the group<details> <summary>Qr code</summary><img width="250" src="https://cdn.jsdelivr.net/gh/fluid-dev/static@master/hexo-theme-fluid/wechat.jpeg"></details>

## Star trending

[![Stargazers over time](https://starchart.cc/fluid-dev/hexo-theme-fluid.svg)](https://starchart.cc/fluid-dev/hexo-theme-fluid)
