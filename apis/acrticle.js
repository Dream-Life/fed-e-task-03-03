import {request} from '@/plugins/request'
// 获取文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
}) }

export const createArticles = params => {
  return request({
    method: 'POST',
    url: '/api/articles',
    params
}) }

export const getYourFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params,
    // headers:{
    //   Authorization: `Token "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTEwMzI4LCJ1c2VybmFtZSI6InlqeWoiLCJleHAiOjE2MDI4MzE1MDV9.DEHVEczhjhYOy74hVKLXMsf4W5zm1ZyhvVo76Ato03g"`
    // }
}) }

export const addFavorite = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
}) }

export const deleteFavorite = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
}) }



export const getArticle = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
}) }


export const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
}) }


export const addComments = ({slug,comment}) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    params:{
      comment:{
        body: comment
      }
    }
}) }

export const deleteComments = ({slug,id}) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/comments/${id}`
}) }