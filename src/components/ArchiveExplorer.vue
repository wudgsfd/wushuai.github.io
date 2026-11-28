<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { ArrowUpRight, Search, X } from "lucide-vue-next";

type Post = {
  title: string;
  description: string;
  date: string;
  dateIso: string;
  readingTime: number;
  tags: string[];
  url: string;
};

const props = defineProps<{
  posts: Post[];
}>();

const allTag = "全部";
const query = ref("");
const activeTag = ref(allTag);
const tags = computed(() => [
  allTag,
  ...Array.from(new Set(props.posts.flatMap((post) => post.tags))).sort((a, b) =>
    a.localeCompare(b, "zh-CN"),
  ),
]);

const filteredPosts = computed(() => {
  const needle = query.value.trim().toLocaleLowerCase("zh-CN");
  return props.posts.filter((post) => {
    const matchesTag =
      activeTag.value === allTag || post.tags.includes(activeTag.value);
    const haystack = [post.title, post.description, ...post.tags]
      .join(" ")
      .toLocaleLowerCase("zh-CN");
    return matchesTag && (!needle || haystack.includes(needle));
  });
});

const updateUrl = () => {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (activeTag.value === allTag) {
    url.searchParams.delete("tag");
  } else {
    url.searchParams.set("tag", activeTag.value);
  }
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
};

watch(activeTag, updateUrl);

onMounted(() => {
  const requestedTag = new URLSearchParams(window.location.search).get("tag");
  if (requestedTag && tags.value.includes(requestedTag)) {
    activeTag.value = requestedTag;
  }
});
</script>

<template>
  <div class="archive-explorer">
    <div class="archive-toolbar">
      <div class="search-field">
        <Search :size="18" :stroke-width="1.8" aria-hidden="true" />
        <label class="sr-only" for="post-search">搜索文章</label>
        <input
          id="post-search"
          v-model="query"
          type="search"
          placeholder="搜索文章、项目或关键词"
          autocomplete="off"
        />
        <button
          v-if="query"
          class="clear-search"
          type="button"
          aria-label="清空搜索"
          @click="query = ''"
        >
          <X :size="16" aria-hidden="true" />
        </button>
      </div>
      <p aria-live="polite">{{ filteredPosts.length }} 篇</p>
    </div>

    <div class="filter-row" aria-label="按标签筛选">
      <button
        v-for="tag in tags"
        :key="tag"
        type="button"
        :class="{ 'is-active': activeTag === tag }"
        @click="activeTag = tag"
      >
        {{ tag }}
      </button>
    </div>

    <div v-if="filteredPosts.length" class="archive-list">
      <article v-for="post in filteredPosts" :key="post.url" class="archive-item">
        <time :datetime="post.dateIso">{{ post.date }}</time>
        <div>
          <div class="archive-item-meta">
            <span>{{ post.readingTime }} 分钟</span>
            <span v-for="tag in post.tags" :key="tag">{{ tag }}</span>
          </div>
          <h2>
            <a :href="post.url">{{ post.title }}</a>
          </h2>
          <p>{{ post.description }}</p>
        </div>
        <a class="archive-arrow" :href="post.url" :aria-label="`阅读：${post.title}`">
          <ArrowUpRight :size="19" :stroke-width="1.8" aria-hidden="true" />
        </a>
      </article>
    </div>

    <div v-else class="empty-state">
      <p>没有找到匹配的文章。</p>
      <button type="button" @click="query = ''; activeTag = allTag">查看全部文章</button>
    </div>
  </div>
</template>
