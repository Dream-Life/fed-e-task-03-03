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
                <nuxt-link class="nav-link" :class="{active: tab === 'your_feed'}" :to="{
                  name: 'home', query: {tab: 'your_feed'}
                }">Your Feed</nuxt-link>
              </li>
               <li class="nav-item">
                <nuxt-link class="nav-link" :class="{active: tab === 'global_feed'}" :to="{
                  name: 'home'
                }">Global Feed</nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link class="nav-link" :class="{active: tab === 'tag'}" :to="{
                  name: 'home', query:{tab:'tag', tag: tag}
                }"># {{tag}}</nuxt-link>
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
                <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
                @click="onFavorite(article)"
                :disabled ="article.favoriteDisabled"
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
              <li class="page-item" 
               v-for="(item, index) in totalPage" :key="'page'+index" :class="page === item ? 'active':''">
                <nuxt-link class="page-link" :to="`/?tab=${tab}&page=${item}&tag=${tag}`">
                {{item}}
                </nuxt-link>
              </li>
            </ul>
          </nav>

          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link v-for="(item,index) in tags" :to="{
                name: 'home', query: {tag:item, tab:tab}
              }" :key="'tag'+index" class="tag-pill tag-default">{{item}}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, getYourFeedArticles,addFavorite, deleteFavorite } from "@/apis/acrticle.js";
import {getTags} from '@/apis/tag.js'
export default {
  name: "Home",
  async asyncData({ query }) {
    const page = Number.parseInt(query.page || 1);
    const limit = 20;
    const tab = query.tab || 'global_feed'
    const tag = query.tag
    const loadArticles = tab === 'global_feed' ? getArticles : getYourFeedArticles
    const [articleRes,tagRes] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag: query.tag
      }),
      getTags()
    ])

    const {articles, articlesCount} = articleRes.data
    const { tags} = tagRes.data
    // console.log(data);
    articles.forEach(article=>article.favoriteDisabled = false)
    return {
      articles,
      articlesCount,
      tags,
      limit,
      page,
      tab,
      tag
    };
  },
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  watchQuery: ['page','tab','tag'],
  methods:{
    async onFavorite(article){
      article.favoriteDisabled = true
      if(!article.favorited){
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount++
      }else{
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount--
      }
      article.favoriteDisabled = false
    }
  }
};
</script>

<style>
</style>