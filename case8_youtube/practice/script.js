;(function () {
  'use strict'

  const get = (target) => document.querySelector(target)
  const getAll = (target) => document.querySelectorAll(target)

  const $search = get('#search')
  const $list = getAll('.contents.list figure')
  const $serachButton = get('.btn_search')
  const $source = getAll('.list figure')

  const init = () => {
    $search.addEventListener('keyup', search)
    $serachButton.addEventListener('click', search)
  }

  const search = () => {
    let searchText = $search.value.toLowerCase()
    for (let index = 0; index < $list.length; index++) {
      const $target = $list[index].querySelector('strong')
      const text = $target.textContent.toLowerCase()
      if (-1 < text.indexOf(searchText)) {
        $list[index].style.display = 'flex'
      } else {
        $list[index].style.display = 'none'
      }
    }
  }

  init()
})()
