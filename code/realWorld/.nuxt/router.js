import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ef73aa50 = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _5960380d = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _5a41dc0a = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _70894fbb = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _31e0b851 = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _7c77511b = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _57539308 = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _ef73aa50,
    children: [{
      path: "",
      component: _5960380d,
      name: "home"
    }, {
      path: "/login",
      component: _5a41dc0a,
      name: "login"
    }, {
      path: "/register",
      component: _5a41dc0a,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _70894fbb,
      name: "profile"
    }, {
      path: "/settings",
      component: _31e0b851,
      name: "settings"
    }, {
      path: "/editor",
      component: _7c77511b,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _57539308,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
