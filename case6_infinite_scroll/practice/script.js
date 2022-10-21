;(function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  }

  let page = 1
  const limit = 10
  const $posts = get('.posts')
  const $loader = get('.loader')
  const end = 100 // data(post) 총 갯수
  let total = 10 // 여태 불러온 data(post) 갯수

  const getPost = async () => {
    const API_URL = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`

    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error('에러가 발생했습니다.')
    }
    return await response.json()
  }

  const showPost = (posts) => {
    posts.forEach((post) => {
      const $post = document.createElement('div')
      $post.classList.add('post')
      $post.innerHTML = `
      <div class="header">
        <div class="id">${post.id}</div>
        <div class="title">${post.title}</div>
        </div>
      <div class="body">
        ${post.body}
      </div>`
      $posts.appendChild($post)
    })
  }

  const showLoader = () => {
    $loader.classList.add('show')
  }

  const hideLoader = () => {
    $loader.classList.remove('show')
  }

  const loadPost = async () => {
    // 로딩 el 보여주고
    showLoader()
    try {
      const response = await getPost()
      showPost(response)
    } catch (error) {
      console.log(error)
    } finally {
      // 로딩 el 사라지게 함
      hideLoader()
    }
  }

  const onScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement

    if (total === end) {
      window.removeEventListener('scroll', onScroll)
    }
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      page++
      total += 10
      loadPost()
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    loadPost()
    window.addEventListener('scroll', onScroll)
  })
})()
