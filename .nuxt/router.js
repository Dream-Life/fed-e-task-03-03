import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4a2ef18f = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _0d2d7ef8 = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _33f71864 = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _288d4038 = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _1cb2ad48 = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _3e6017d2 = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _5af8b99e = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

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
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _4a2ef18f,
    children: [{
      path: "",
      component: _0d2d7ef8,
      name: "home"
    }, {
      path: "/login",
      component: _33f71864,
      name: "login"
    }, {
      path: "/register",
      component: _33f71864,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _288d4038,
      name: "profile"
    }, {
      path: "/settings",
      component: _1cb2ad48,
      name: "settings"
    }, {
      path: "/editor",
      component: _3e6017d2,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _5af8b99e,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
