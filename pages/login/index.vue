<template>
  <div class="auth-page">
    <div class="container page">
        <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center"> {{isLogin ? 'Sign in':'Sign up'}}</h1>
            <p class="text-xs-center">
            <nuxt-link v-if="!isLogin" to="/login">Have an account?</nuxt-link>
            <nuxt-link v-else to="/register">Need an account?</nuxt-link>
            </p>

            <ul class="error-messages">
                <template v-for="(messages,field) in errors">  
                    <li v-for="(item,index) in messages" :key="index">{{field}} {{item}}</li>
                </template>
            </ul>

            <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
                <input class="form-control form-control-lg" v-model="user.username" type="text" placeholder="Your Name" required>
            </fieldset>
            <fieldset class="form-group">
                <input class="form-control form-control-lg" v-model="user.email" type="email" placeholder="Email" required>
            </fieldset>
            <fieldset class="form-group">
                <input class="form-control form-control-lg" v-model="user.password" type="password" placeholder="Password" required minlength="8">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
                {{isLogin ? 'Sign in':'Sign up'}}
            </button>
            </form>
        </div>

        </div>
    </div>
    </div>
</template>

<script>
import {login, register} from '@/apis/user'

const Cookie = process.client ? require('js-cookie') : undefined

export default {
    name: 'Login',
    data(){
        return{
            user: {
                username: '',
                email: '',
                password: ''
            },
            errors:{}
        }
    },
    computed: {
        isLogin(){
            return this.$route.name === 'login'
        }
    },
    methods: {
        async onSubmit(){
            try {
                const {data} = this.isLogin ? await login({user: this.user}) : await register({user: this.user})

                // console.log(data)
                this.$store.commit('setUser', data.user) // mutating to store for client rendering   
                Cookie.set('user', data.user) // saving token in cookie for server rendering
                this.$router.push('/')
            } catch (error) {
                console.dir(error)
                this.errors = error.response.data.errors
                console.log(this.errors)

            }
        }
    },
    middleware:['not-auth']
}
</script>

<style>

</style>