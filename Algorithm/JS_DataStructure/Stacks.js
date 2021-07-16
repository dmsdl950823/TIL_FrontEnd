/*  🌸  Stacks  */

let letters = [] // stack

let word = "freeCodeCamp"

let rword = ''

// 단어의 글자를 stack 에 쌓기
for (let i = 0; i < word.length; i++) {
  letters.push(word[i])
}

for (let i = 0; i < word.length; i++) {
  rword += letters.pop()
}

if (rword === word) console.log(`${word} is a palindrome.`)
else console.log(`${word} is not a palindrome.`)


let Stack = function () {
  this.count = 0
  this.storage = {}

  // 값을 stack 의 끝에 추가합니다
  this.push = function (value) {
    this.storage[this.count] = value
    this.count++
  }

  // 값을 stack 의 끝에서 삭제하고 반환합니다.
  this.pop = function () {
    if (this.count === 0) return undefined

    this.count--
    const result = this.storage[this.count]
    delete this.storage[this.count]
    return result
  }

  this.size = function () { return this.count }

  // 맨 끝에 값 확인하기
  this.peek = function () { return this.storage[this.count - 1] }
}

let myStack = new Stack()

myStack.push(1)
myStack.push(2)
console.log(myStack.peek())
console.log(myStack.pop())
console.log(myStack.peek())
myStack.push("freeCodeCamp")
console.log(myStack.size())
console.log(myStack.peek())
console.log(myStack.pop())
console.log(myStack.peek())


// 출처: https://morioh.com/p/92f7181a4f08?f=5c21fb01c16e2556b555ab32