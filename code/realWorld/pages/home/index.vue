<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link disabled" href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">Global Feed</a>
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link
                class="author"
                :to="`/profile/${article.author.username}`"
              >
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  class="author"
                  :to="`/profile/${article.author.username}`"
                >
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{ article.createdAt }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{ name: 'article', params: { slug: article.slug } }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span
                @click="
                  $router.push({
                    name: 'article',
                    params: { slug: article.slug },
                  })
                "
                >Read more...</span
              >
            </nuxt-link>
          </div>
        </div>

        <div class="col-md-3">
          <nav>
            <ul class="pagination">
              <li class="page-item active">
                <nuxt-link class="page-link" to="/">1</nuxt-link>
              </li>
              <li class="page-item">
                <nuxt-link class="page-link" to="/">2</nuxt-link>
              </li>
              <li class="page-item">
                <nuxt-link class="page-link" to="/">3</nuxt-link>
              </li>
            </ul>
          </nav>

          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a href="" class="tag-pill tag-default">programming</a>
              <a href="" class="tag-pill tag-default">javascript</a>
              <a href="" class="tag-pill tag-default">emberjs</a>
              <a href="" class="tag-pill tag-default">angularjs</a>
              <a href="" class="tag-pill tag-default">react</a>
              <a href="" class="tag-pill tag-default">mean</a>
              <a href="" class="tag-pill tag-default">node</a>
              <a href="" class="tag-pill tag-default">rails</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles } from "@/apis/acrticle.js";
export default {
  name: "Home",
  async asyncData({ query }) {
    const page = Number.parseInt(query.page || 1);
    const limit = 20;
    const { data } = await getArticles({
      limit,
      offset: (page - 1) * limit,
    });
    console.log(data);
    return {
      articles: data.articles,
      articlesCount: data.articlesCount,
      limit,
      page,
    };
  },
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
};
</script>

<style>
</style>