# 吴帅 · 个人主页与博客

GitHub Pages + Jekyll。写 Markdown，推送即发布。线上地址 `https://wudgsfd.github.io/wushuai.github.io/`。

| 文件 | 用途 |
| --- | --- |
| `index.html` | 首页：个人信息、最新文章、各板块 |
| `_config.yml` | 站点配置（标题、baseurl、时区） |
| `_posts/` | 文章源文件，一篇一个 md |
| `archive/index.html` | 全部文章，按年归档 |
| `_layouts/default.html` | 全站框架：顶栏、页脚、主题切换 |
| `_layouts/post.html` | 文章页模板 |
| `assets/css/style.css` | 全部样式；改配色看顶部 `:root` |
| `assets/js/main.js` | 全部交互 |
| `assets/img/` | 文章配图，建议宽 1200px、单张 300KB 内 |
| `assets/files/` | pdf / zip 附件 |
| `assets/avatar.jpg` | 头像，720×720 |
| `写作模板.md` | 复制它写新文章 |
| `404.html` | 404 页 |

## 发一篇

1. 复制 `写作模板.md` → `_posts/2026-12-01-英文短名.md`
2. 改头部六行，写正文
3. `git add -A && git commit -m "新文章" && git push`

文件名用英文或拼音（会进网址），标题照常写中文。

## 两个禁忌

- **不要加 `.nojekyll`**：会关闭 Jekyll 构建，文章列表全部失效
- **图片不能写 `/assets/img/x.jpg`**：站点在子路径下，必须写 `{{ '/assets/img/x.jpg' | relative_url }}`
