import type { CollectionEntry } from "astro:content";

export const withBase = (path: string) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}` || "/";
};

export const formatDate = (
  date: Date,
  style: "long" | "short" = "long",
) =>
  new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: style === "long" ? "long" : "2-digit",
    day: style === "long" ? "numeric" : "2-digit",
  }).format(date);

export const postPath = (post: CollectionEntry<"blog">) => {
  const date = post.data.date;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return withBase(`/posts/${year}/${month}/${day}/${post.id}/`);
};

export const readingTime = (body = "") => {
  const plain = body
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#>*_`\\[\\]()!-]/g, "")
    .replace(/\s/g, "");
  return Math.max(1, Math.ceil(plain.length / 350));
};

export const sortByDateDesc = (
  a: CollectionEntry<"blog">,
  b: CollectionEntry<"blog">,
) => b.data.date.getTime() - a.data.date.getTime();
