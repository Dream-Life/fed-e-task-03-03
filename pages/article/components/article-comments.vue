<template>
  
        <div class="col-xs-12 col-md-8 offset-md-2">

            <form class="card comment-form">
            <div class="card-block">
                <textarea v-model="comment" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
            </div>
            <div class="card-footer">
                <img :src="article.author.image" class="comment-author-img" />
                <button class="btn btn-sm btn-primary" @click="addComment">
                Post Comment
                </button>
            </div>
            </form>
            
            <div class="card" v-for="comment in comments" :key="comment.id">
            <div class="card-block">
                <p class="card-text">{{comment.body}}</p>
            </div>
            <div class="card-footer">
                <nuxt-link :to="{name: 'profile',params: {usrname: comment.author.username}}" class="comment-author">
                <img :src="comment.author.image" class="comment-author-img" />
                </nuxt-link>
                &nbsp;
                <nuxt-link :to="{name: 'profile',params: {usrname: comment.author.username}}"  class="comment-author">{{comment.author.username}}</nuxt-link>
                <span class="date-posted">{{comment.createAt | date('MMM DD, YYYY')}}</span>
            </div>
            </div>

            
        </div>
</template>

<script>
import {getComments,addComments,deleteComments} from '@/apis/acrticle'
import {mapState} from 'vuex'
export default {
    name:'article-comments',
     props:{
        article:{
            type:Object,
            required:true
        }
    },
    computed:{
        ...mapState(['user'])
    },
    data(){
        return {
            comments: [],
            comment: ''
        }
    },
    mounted() {    
       console.log(this.user)
       this.getComments()
    },
    methods:{
        async getComments(){
            const {data} = await getComments(this.article.slug)
            this.comments = data.comments
        },
        async addComment(){
            try {
                const {data} = await addComments({
                    slug: this.article.slug,
                    comment: this.comment
                })
                console.log(data)
                debugger
                // this.getComments()
            } catch (error) {
                console.dir(error)
            }
        },
        async deleteComment(id){
            try {
                const {data} = await deleteComments({slug:this.article.slug,id})
                // this.getComments()
            } catch (error) {
                console.dir(error)
            }
        }
    }
}
</script>

<style>

</style>