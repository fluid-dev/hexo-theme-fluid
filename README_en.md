<p align="right">English | <a title="Chinese" href="README.md">中文简体</a></p>

<h1 align="center">Fluid</h1>

<p align="center">An elegant Material-Design theme for Hexo</p>

<p align="center">
  <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/fluid-dev/hexo-theme-fluid">
  <img alt="Hexo version" src="https://img.shields.io/badge/Hexo-3%2B-orange">
  <img alt="Contributors" src="https://img.shields.io/github/contributors/fluid-dev/hexo-theme-fluid.svg?style=flat">
  <img alt="License" src="https://img.shields.io/github/license/fluid-dev/hexo-theme-fluid.svg?style=flat">
</p>

![ScreenShot](https://cdn.jsdelivr.net/gh/fluid-dev/static@master/hexo-theme-fluid/screenshots/1.png)


## Live Preview

[Rook1e's blog](https://0x2e.github.io)

[zkqiang's blog](http://zkqiang.cn)

## Notice

:warning: This announcement is for older users and new users can ignore it.

Starting with the `v1.4.0` version, the project was officially renamed to **Fluid** (original project name: Material-T), and the repository and ownership were transferred to the **Fluid-dev** organization, so git remote url, theme directory name and related code will change.

If you plan to upgrade `v1.4.0`, it is recommended to do the following:
1. Unzip the release package and rename it to `fluid` (It is recommended that the user using the master branch re-clone the repository)
2. Modify the blog root `_config.yml` configuration `theme: fluid`
3. Copy the modified part of `_config.yml` of the original Material-T, or follow  [Configuration](https://github.com/fluid-dev/hexo-theme-fluid#Configuration) to use the configuration override feature.

We apologize for the inconvenience caused by the change.

## Quick Start

#### 1. Get the latest version

Please download the [latest release version](https://github.com/fluid-dev/hexo-theme-fluid/releases) first, and the master branch cannot guarantee stability.

After downloading, extract it to the themes directory and rename it to `fluid`.

#### 2. Necessary configuration

Modify `_config.yml` in the root directory as follows:

```yaml
# Set the language, you need to correspond to the file name in the following directory, you can customize the file content.
# https://github.com/fluid-dev/hexo-theme-fluid/tree/master/languages
language: en

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

## Configuration

Starting with v1.4.0, you can go to the source directory of the blog root directory (not the source directory of the theme), create the `_data` directory, and create `fluid_config.yml` inside it. Copy the modified or all configuration items in `/theme/fluid/_config.yml` to `fluid_config.yml`. The configuration in `fluid_config.yml` will automatically overwrite `/theme/fluid/_config.yml` when `hexo g`, and will not be lost after updating the theme.

Starting with v1.5.0, all resource references can be configured with `_static_prefix` (this means you can use cdnjs, jsDelivr or your own CDN server to speed up resource loading). It also supports configuring automatic overrides by writing `_data/fluid_static_prefix.yml`.

In other cases, it is recommended to back up `/theme/fluid/_config.yml` and your customized files before the update to avoid loss after the update.

## FAQ

#### Code highlighting exception

- Please confirm that the above "Turn off default highlighting" step has been completed.
- Try "clean" command: `hexo clean && hexo g` `hexo clean && hexo g`

#### Configuration cannot take effect

- Please check if the configuration file conforms to the yml syntax, such as spaces after the colon, 2 spaces for indentation, etc.

## Docs

[Detailed configuration](https://fluid-dev.github.io/hexo-fluid-docs/)

[Changelog](https://github.com/fluid-dev/hexo-theme-fluid/blob/master/Changelog.md)

[Article configuration](https://hexo.io/docs/front-matter)

## Contributing

If you are contributing for the first time, you can first claim a smaller task in the [help wanted](https://github.com/fluid-dev/hexo-theme-fluid/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) to quickly participate in community contributions. You can respond to the willingness to participate directly in the issue, then follow the GitHub workflow guidelines below to resolve the issue and submit the PR according to the specification, and after reviewing it will be merged into the master branch.

The following workflows are recommended to participate in the contribution:

1. Fork the repo to your own GitHub and clone it to your local development
2. Create a new branch and develop on the new branch
3. Keep the branch consistent with the remote develop branch (via fetch and rebase operations)
4. Submit changes locally (please keep the commit log simple and standardized)
5. Push the local submit to the repo of fork on GitHub
6. Create a pull request to the develop branch of fluid-dev/hexo-theme-fluid

## Contributors

[![contributors](https://opencollective.com/hexo-theme-fluid/contributors.svg?width=890&button=false)](https://github.com/fluid-dev/hexo-theme-fluid/graphs/contributors)

Contributors outside the code：@zhugaoqi

## License

[MIT](https://github.com/fluid-dev/hexo-theme-fluid/blob/master/LICENSE)
