import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { site } from "../site";
import { postPath, sortByDateDesc } from "../utils";

export async function GET(context: { site: URL }) {
  const posts = (await getCollection("blog")).sort(sortByDateDesc);

  return rss({
    title: `${site.title}的博客`,
    description: site.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postPath(post),
      categories: post.data.tags,
    })),
    customData: "<language>zh-cn</language>",
  });
}
