;(function () {
  'use strict'

  const get = (target) => document.querySelector(target)

  const init = () => {
    get('form').addEventListener('submit', (event) => {
      playGame(event)
    })
    setPassword()
  }

  const baseball = {
    limit: 10,
    digit: 4,
    trial: 0,
    end: false,
    $question: get('.ball_question'),
    $answer: get('.ball_answer'),
    $input: get('.ball_input'),
  }

  const { limit, digit, $question, $answer, $input } = baseball
  let { trial, end } = baseball
  // trial, end는 계속 바뀌는 값이라 let에 담음

  const setPassword = () => {
    // 랜덤 password 지정

    const gameLimit = Array(limit).fill(false)
    // [ f, f, f, ... ,f ]

    let password = ''
    while (password.length < digit) {
      const random = parseInt(Math.random() * 10, 10)

      if (gameLimit[random]) {
        continue
      }
      password += random
      gameLimit[random] = true

      // random = 2 -> gameLimit = [ f, f, t, ... ,f]
      // random = 2가 또 나오면(중복) continue에서 걸러짐
      // 그렇다면 gameLimit(array) 는 중복을 걸러주기 위한 장치
    }

    baseball.password = password
  }

  const onPlayed = (number, hint) => {
    // 시도 했을 때
    // number : 내가 입력한 숫자, hint : 현재 어떤 상황?
    return `<em>${trial}차 시도</em>: ${number}, ${hint}`
  }

  const isCorrect = (number, answer) => {
    // 번호가 같은가?

    return number === answer
  }

  const isDuplicate = (number) => {
    // 중복된 번호가 있는가?
    return [...new Set(number.split(''))].length !== digit
    // set -> 새로운 배열을 중복없이 반환함
    // set으로 중복이 있을 시에 걸러지면서 자릿수가 안맞게 되는 경우에 기능.
  }

  const getStrikes = (number, answer) => {
    let strike = 0
    const nums = number.split('')

    nums.map((digit, index) => {
      if (digit === answer[index]) {
        strike++
      }
    })
    return strike
  }

  const getBalls = (number, answer) => {
    // 볼이 몇 개?
    let ball = 0
    const nums = number.split('')

    const gameLimit = Array(limit).fill(false)

    answer.split('').map((num) => {
      gameLimit[num] = true
    })

    nums.map((num, index) => {
      if (answer[index] !== num && !!gameLimit[num]) {
        ball++
      }
    })

    return ball
  }

  const getResult = (number, answer) => {
    // 시도에 따른 결과는?

    if (isCorrect(number, answer)) {
      end = true
      $answer.innerHTML = baseball.password
      return `홈런!!`
    }

    const strikes = getStrikes(number, answer)
    const balls = getBalls(number, answer)

    return `STRIKE : ${strikes}, BALL : ${balls}`
  }

  const playGame = (e) => {
    // 게임 플레이
    e.preventDefault()

    if (!!end) {
      return
    }

    const inputNumber = $input.value
    const { password } = baseball

    if (inputNumber.length !== digit) {
      alert(`${digit}자리 숫자를 입력해주세요.`)
    } else if (isDuplicate(inputNumber)) {
      alert(`중복 숫자가 있습니다.`)
    } else {
      trial++
      const result = onPlayed(inputNumber, getResult(inputNumber, password))
      $question.innerHTML += `<span>${result}</span>`

      if (limit <= trial && !isCorrect(inputNumber, password)) {
        alert(`쓰리아웃!`)
        end = true
        $answer.innerHTML = password
      }
    }

    $input.value = ''
    $input.focus()
  }

  init()
})()
