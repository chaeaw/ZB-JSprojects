;(function () {
  'use strict'

  let timerId
  const get = (target) => {
    return document.querySelector(target)
  }

  const throttle = (callback, time) => {
    if (timerId) return
    timerId = setTimeout(() => {
      callback()
      timerId = undefined
    }, time)
  }

  const $progressBar = get('.progress-bar')

  const onScroll = () => {
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight

    /*
      const height2 = document.documentElement.scrollHeight
      왜 scrollHeight만이 아닌 clientHeight를 빼서 height를 구했을까? 
      => scrollTop은 보여지는 화면에서의 상단이 기준이다.
         즉, 스크롤을 전부 내렸을 때 scrollTop은 보여지는 view의 상단이므로
         현재 보여지고있는 clientHeight만큼 다 내려갈 수 가 없다..!!
         따라서 맨 상단에 있을때의 scrollTop이 0이라면 
         clientHeight를 빼줌으로써 scroll을 다 내렸을 때,
         scrollTop이 100이 되게끔! 만들어 줄 수 있다.
      
      const width2 = (scrollTop / height2) * 100
      => 스크롤을 완전히 내려도 92.5 로 나온다.
    
    */
    const scrollTop = document.documentElement.scrollTop

    const width = (scrollTop / height) * 100
    $progressBar.style.width = width + '%'
  }

  window.addEventListener('scroll', () => throttle(onScroll, 100))
})()
