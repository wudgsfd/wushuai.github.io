# 吴帅的个人博客

基于 Astro + Vue 的静态个人博客，部署在 GitHub Pages。

## 本地开发

```bash
npm install
npm run dev
```

构建与检查：

```bash
npm run build
npm run preview
```

## 写文章

文章放在 `src/content/blog/`，每篇文章一个 Markdown 文件。

```md
---
title: 文章标题
date: 2026-12-01 20:00:00 +0800
description: 一句话摘要，用于首页和搜索分享。
tags: [教学, 项目]
featured: false
---

正文从这里开始。
```

文件名会成为文章 URL 的最后一段。文章继续使用原来的日期路径：

```text
/posts/2026/12/01/your-file-name/
```

## 页面结构

- `/`：个人介绍、最近文章、精选项目
- `/writing/`：文章检索与标签筛选
- `/projects/`：系统项目索引
- `/about/`：完整履历、论文、专利与荣誉
- `/feed.xml`：RSS

## 发布到 GitHub Pages

仓库已经包含 `.github/workflows/deploy.yml`。在 GitHub 仓库设置中：

1. 打开 `Settings → Pages`。
2. 将 `Source` 设置为 `GitHub Actions`。
3. 推送到 `main` 分支后，工作流会自动构建并发布。

当前站点路径由 `astro.config.mjs` 中的 `base` 控制。如果以后把仓库改名为
`wudgsfd.github.io` 或绑定独立域名，需要同步修改 `base`、`robots.txt`
和分享图脚本中的地址。

重新生成默认社交分享图：

```bash
python scripts/generate_og.py
```
