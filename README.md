# 吴帅 · 个人主页与博客

基于 GitHub Pages + Jekyll 的静态博客。没有数据库、没有后端、没有构建依赖（构建由 GitHub 完成）。

线上地址：https://wudgsfd.github.io/wushuai.github.io/

## 写一篇新文章

1. 在 `_posts/` 里新建文件，命名 `年-月-日-英文短名.md`，例如 `2026-11-28-reading-note.md`
2. 文件开头写这一段：

```yaml
---
title: 中文标题随便写
date: 2026-11-28 20:00:00 +0800
tags: [随笔, 读书]
categories: 随笔
description: 一句话摘要，会出现在列表和搜索结果里
---
```

3. 下面直接写 Markdown 正文，`git push` 即可，一两分钟后自动上线。

**必须注意：文件名要用英文或拼音。** 文件名会进入网址（`/posts/2026/11/28/文件名/`），中文文件名会生成空 slug 导致地址冲突。

## 目录结构

```
_config.yml          站点配置（标题、baseurl、插件）
index.html           首页：个人信息 + 最新文章 + 各板块
archive/index.html   全部文章，按年份归档
404.html             404 页面
_posts/              文章源文件（Markdown）
_layouts/            default / post 模板
assets/css/style.css 全部样式
assets/js/main.js    全部交互（原生 JS）
assets/avatar.jpg    头像
```

## 需要改的地方

- **邮箱**：`index.html` 里的 `your-email@example.com` 出现两次（`mailto:` 和显示文本），换成真实邮箱
- **头像**：替换 `assets/avatar.jpg`，建议 720×720、100KB 以内
- **配置**：`_config.yml` 里的 `url` 和 `baseurl`

## 两个坑

| 坑 | 说明 |
| --- | --- |
| 不要加 `.nojekyll` | 这个文件会关闭 Jekyll 构建，整站会变成纯静态文件拷贝，文章列表全部失效 |
| `baseurl` 必须是子路径 | 仓库名是 `wushuai.github.io` 但账号是 `wudgsfd`，站点跑在 `/wushuai.github.io/` 下。所有链接都用了 `relative_url`，改了仓库名记得同步改 `baseurl`，否则 CSS 和图片全裂 |

## 本地预览（可选）

需要 Ruby 环境：

```bash
gem install bundler jekyll
jekyll serve --baseurl "" --livereload
```

不装也行，直接推送让 GitHub 构建。
