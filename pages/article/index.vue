<template>
  <div class="article-page">

    <div class="banner">
        <div class="container">

        <h1>{{article.title}}</h1>

        <article-meta :article="article" />

        </div>
    </div>

    <div class="container page">

        <div class="row article-content">
        <div class="col-md-12" v-html="article.body ">
        </div>
        </div>

        <hr />

        <div class="article-actions">
            <article-meta :article="article" />
        </div>

        <div class="row">
            <article-comments :article="article"/>

        </div>

    </div>

    </div>
</template>

<script>
import {getArticle} from '@/apis/acrticle'
import MarkdownIt from 'markdown-it'
import ArticleMeta from './components/article-meta'
import ArticleComments from './components/article-comments'
export default {
    name: 'article',
    components:{ArticleMeta,ArticleComments},
    async asyncData({params}) {
        const {data} = await getArticle(params.slug)
        const {article} = data
        const md = new MarkdownIt()
        article.body = md.render(article.body)
        return {
            article: data.article
        }
    },
      head() {
      return {
        title: `${this.article.title} - RealWorld`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.article.description
          }
        ]
      }
    }
}
</script>

<style>

</style>