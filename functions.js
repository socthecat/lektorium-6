const isPrime = n => {
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false
  }
  return n > 1
}

const factorial = n => (n < 2) ? 1 : factorial(n - 1) * n

const fib = n => n <= 1 ? n : fib(n - 1) + fib(n - 2)

const isSorted = arr => arr.every((n, i, a) => !i || a[i - 1] <= n)

const reverse = str => str.split('').map(str.split('').pop, str.split('')).join('')

const indexOf = (arr, n) => {
  let index = -1
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === n) {
      index = i
      break
    }
  }
  return index
}

const isPalindrome = str => str.replace(/\s/g, '').toLowerCase() === str.replace(/\s/g, '').toLowerCase().split('').reverse().join('')

const missing = arr => {
  for (let i = 1; i < arr.length; i++) {
    if (arr.indexOf(i) === -1) return i
  }
}

const isBalanced = string => {
  const arr = []
  const openBrackets = new Set(['(', '[', '{'])
  const pairs = {
    ')': '(',
    ']': '[',
    '}': '{'
  }

  for (const a of string) {
    if (openBrackets.has(a)) {
      arr.push(a)
    } else if (pairs[a] && arr.pop() !== pairs[a]) {
      return false
    }
  }

  return !arr.length
}
