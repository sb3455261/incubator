//https://www.codewars.com/kata/55aa170b54c32468c30000a9
function parse(str) {
    let index = 0
   
    function parseValue() {
      skipWhitespace()
      const char = str[index]
      if (char === '{') return parseObject()
      if (char === '[') return parseArray()
      if (char === '"') return parseString()
      if (char === 't') return parseTrue()
      if (char === 'f') return parseFalse()
      if (char === 'n') return parseNull()
      return parseNumber()
    }
   
    function parseObject() {
      index++
      const obj = {}
      skipWhitespace()
      if (str[index] === '}') {
        index++
        return obj
      }
      while (true) {
        const key = parseString()
        skipWhitespace()
        if (str[index] !== ':') throw new Error('Expected :')
        index++
        const value = parseValue()
        obj[key] = value
        skipWhitespace()
        if (str[index] === '}') {
          index++
          return obj
        }
        if (str[index] !== ',') throw new Error('Expected , or }')
        index++
      }
    }
   
    function parseArray() {
      index++
      const arr = []
      skipWhitespace()
      if (str[index] === ']') {
        index++
        return arr
      }
      while (true) {
        arr.push(parseValue())
        skipWhitespace()
        if (str[index] === ']') {
          index++
          return arr
        }
        if (str[index] !== ',') throw new Error('Expected , or ]')
        index++
      }
    }
   
    function parseString() {
      index++
      let result = ''
      while (str[index] !== '"') {
        if (index >= str.length) throw new Error('Unterminated string')
        result += str[index++]
      }
      index++
      return result
    }
   
    function parseNumber() {
      const start = index
      if (str[index] === '-') index++
      if (str[index] === '0') {
        index++
        if (isDigit(str[index])) throw new Error('Invalid number')
      } else if (isDigit(str[index])) {
        index++
        while (isDigit(str[index])) index++
      } else {
        throw new Error('Invalid number')
      }
      if (str[index] === '.') {
        index++
        if (!isDigit(str[index])) throw new Error('Invalid number')
        while (isDigit(str[index])) index++
      }
      return Number(str.slice(start, index))
    }
   
    function parseTrue() {
      if (str.slice(index, index + 4) !== 'true') throw new Error('Expected true')
      index += 4
      return true
    }
   
    function parseFalse() {
      if (str.slice(index, index + 5) !== 'false') throw new Error('Expected false')
      index += 5
      return false
    }
   
    function parseNull() {
      if (str.slice(index, index + 4) !== 'null') throw new Error('Expected null')
      index += 4
      return null
    }
   
    function skipWhitespace() {
      while (str[index] === ' ' || str[index] === '\n' || str[index] === '\r' || str[index] === '\t') {
        index++
      }
    }
   
    function isDigit(char) {
      return char >= '0' && char <= '9'
    }
   
    if (str.length === 0) throw new Error('Empty input')
    
    const result = parseValue()
    skipWhitespace()
    if (index !== str.length) throw new Error('Unexpected characters at end')
    return result
}


//https://www.codewars.com/kata/55c4eb777e07c13528000021
function zeroes(base, number) {
    function factorialZeroes(n, prime) {
      let count = 0
      while (n > 0) {
        n = Math.floor(n / prime)
        count += n
      }
      return count
    }
   
    function factorize(n) {
      let factors = {}
      for (let i = 2; i * i <= n; i++) {
        while (n % i === 0) {
          factors[i] = (factors[i] || 0) + 1
          n /= i
        }
      }
      if (n > 1) factors[n] = 1
      return factors
    }
   
    let baseFactors = factorize(base)
    let minZeroes = Infinity
   
    for (let prime in baseFactors) {
      let primeZeroes = Math.floor(factorialZeroes(number, parseInt(prime)) / baseFactors[prime])
      minZeroes = Math.min(minZeroes, primeZeroes)
    }
   
    return minZeroes
}


//https://www.codewars.com/kata/6638277786032a014d3e0072
function allocateRooms(customers) {
    const events = []
    for (let i = 0; i < customers.length; i++) {
      events.push([customers[i][0], 1, i])
      events.push([customers[i][1], -1, i])
    }
    events.sort((a, b) => a[0] - b[0] || b[1] - a[1])
   
    const rooms = []
    const allocation = new Array(customers.length)
    const availableRooms = []
   
    for (const [, type, index] of events) {
      if (type === 1) {
        if (availableRooms.length > 0) {
          allocation[index] = availableRooms.pop()
        } else {
          allocation[index] = rooms.length + 1
          rooms.push(true)
        }
      } else {
        availableRooms.push(allocation[index])
      }
    }
   
    return allocation
}


//https://www.codewars.com/kata/5dcde0b9fcb0d100349cb5c0
function longest_palindrome(s) {
    if (s.length === 0) return ""
    let t = '#' + s.split('').join('#') + '#'
    let n = t.length
    let p = new Array(n).fill(0)
    let c = 0, r = 0
    for (let i = 0; i < n; i++) {
        let mirr = 2 * c - i
        if (i < r) {
            p[i] = Math.min(r - i, p[mirr])
        }
        while (i + 1 + p[i] < n && i - 1 - p[i] >= 0 && t[i + 1 + p[i]] === t[i - 1 - p[i]]) {
            p[i]++
        }
        if (i + p[i] > r) {
            c = i;
            r = i + p[i]
        }
    }

    let maxLen = 0
    let centerIndex = 0
    for (let i = 0; i < n; i++) {
        if (p[i] > maxLen) {
            maxLen = p[i]
            centerIndex = i
        }
    }

    let start = (centerIndex - maxLen) / 2
    return s.substring(start, start + maxLen)
}


//https://www.codewars.com/kata/608cc9666513cc00192a67a9
class SegmentTree {
    constructor(arr, op) {
        this.op = op
        this.n = arr.length
        this.tree = new Array(4 * this.n)
        this.build(arr, 1, 0, this.n - 1)
    }

    build(arr, v, tl, tr) {
        if (tl === tr) {
            this.tree[v] = arr[tl]
        } else {
            let tm = Math.floor((tl + tr) / 2)
            this.build(arr, v * 2, tl, tm)
            this.build(arr, v * 2 + 1, tm + 1, tr)
            this.tree[v] = this.op(this.tree[v * 2], this.tree[v * 2 + 1])
        }
    }

    query(v, tl, tr, l, r) {
        if (l > r) return null
        if (l === tl && r === tr) return this.tree[v]
        let tm = Math.floor((tl + tr) / 2)
        let left = this.query(v * 2, tl, tm, l, Math.min(r, tm))
        let right = this.query(v * 2 + 1, tm + 1, tr, Math.max(l, tm + 1), r)
        if (left === null) return right
        if (right === null) return left
        return this.op(left, right)
    }
}
function computeRanges(arr, op, ranges) {
    let segTree = new SegmentTree(arr, op)
    return ranges.map(([start, end]) => segTree.query(1, 0, arr.length - 1, start, end - 1))
}


//https://www.codewars.com/kata/617ae98d26537f000e04a863
function toMountain(matrix) {
    const rows = matrix.length
    const cols = matrix[0].length
    let changes = true

    while (changes) {
        changes = false
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const neighbors = getNeighbors(matrix, i, j)
                const maxNeighbor = Math.max(...neighbors)
                if (matrix[i][j] < maxNeighbor - 1) {
                    matrix[i][j] = maxNeighbor - 1
                    changes = true
                }
            }
        }
    }

    return matrix
}
function getNeighbors(matrix, i, j) {
    const neighbors = []
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    for (const [di, dj] of directions) {
        const ni = i + di
        const nj = j + dj
        if (ni >= 0 && ni < matrix.length && nj >= 0 && nj < matrix[0].length) {
            neighbors.push(matrix[ni][nj])
        }
    }

    return neighbors
}


/https://www.codewars.com/kata/5a3af5b1ee1aaeabfe000084
function sumOfSquares(n) {
    if (Math.floor(Math.sqrt(n)) ** 2 === n) {
        return 1
    }
    for (let i = 1; i <= Math.floor(Math.sqrt(n)); i++) {
        if (Math.floor(Math.sqrt(n - i*i)) ** 2 === n - i*i) {
            return 2
        }
    }
    while (n % 4 === 0) {
        n /= 4
    }
    if (n % 8 === 7) {
        return 4
    }
    return 3
}


//https://www.codewars.com/kata/581d1d669ae06274d5000074
function permutationByNumber(word, n) {
    const chars = word.split('')
    const len = chars.length
    const sortedUniqueChars = [...new Set(chars)].sort()
    const charCounts = {}
    
    for (let char of chars) {
      charCounts[char] = (charCounts[char] || 0) + 1
    }
    
    function factorial(n) {
      if (n <= 1) return 1
      return n * factorial(n - 1)
    }
    
    function totalPermutations(counts) {
      let denominator = 1
      let sum = 0
      for (let count of Object.values(counts)) {
        sum += count
        denominator *= factorial(count)
      }
      return factorial(sum) / denominator
    }
    
    const total = totalPermutations(charCounts);
    if (n >= total) return ''
    
    let result = ''
    let remainingChars = {...charCounts}
    
    for (let i = 0; i < len; i++) {
      for (let char of sortedUniqueChars) {
        if (remainingChars[char] > 0) {
          const subPermutations = totalPermutations({...remainingChars, [char]: remainingChars[char] - 1})
          if (n >= subPermutations) {
            n -= subPermutations
          } else {
            result += char
            remainingChars[char]--
            break
          }
        }
      }
    }
    
    return result
}


//https://www.codewars.com/kata/5340298112fa30e786000688
function twosDifference(arr) {
    arr.sort((a, b) => a - b)
    
    let left = 0
    let right = 1
    let results = []
    
    while (right < arr.length) {
        if (arr[right] - arr[left] === 2) {
            results.push([arr[left], arr[right]])
            left++
            right++
        } else if (arr[right] - arr[left] < 2) {
            right++
        } else {
            left++
        }
    }
    
    return results
}


//https://www.codewars.com/kata/52742f58faf5485cae000b9a
function formatDuration(seconds) {
    if (seconds === 0) {
        return "now"
    }

    const units = {
        year: 365 * 24 * 60 * 60,
        day: 24 * 60 * 60,
        hour: 60 * 60,
        minute: 60,
        second: 1
    };

    let result = []

    for (const [unit, unitSeconds] of Object.entries(units)) {
        if (seconds >= unitSeconds) {
            const count = Math.floor(seconds / unitSeconds)
            result.push(count + " " + (count === 1 ? unit : unit + "s"))
            seconds %= unitSeconds
        }
    }

    return result.length > 1
        ? result.join(", ").replace(/,([^,]*)$/, " and" + "$1")
        : result[0]
}


//https://www.codewars.com/kata/52f7892a747862fc9a0009a6
function countSubsequences(needle, haystack) {
    const n = needle.length
    const m = haystack.length
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))
    
    for (let i = 0; i <= m; i++) {
        dp[i][0] = 1
    }
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = dp[i-1][j]
            if (haystack[i-1] === needle[j-1]) {
                dp[i][j] += dp[i-1][j-1]
            }
            dp[i][j] %= 100000000
        }
    }
    return dp[m][n]
}


//https://www.codewars.com/kata/52a382ee44408cea2500074c
function determinant(matrix) {
    const n = matrix.length

    if (n === 1) return matrix[0][0]

    let det = 0
    for (let j = 0; j < n; j++) {
        const minorMatrix = getMinorMatrix(matrix, 0, j)
        const minorDeterminant = determinant(minorMatrix)
        det += matrix[0][j] * minorDeterminant * Math.pow(-1, j)
    }

    return det
}
function getMinorMatrix(matrix, rowToRemove, colToRemove) {
    return matrix.filter((row, i) => i !== rowToRemove).map(row => row.filter((_, j) => j !== colToRemove))
}


//https://www.codewars.com/kata/6627c36bbd7b811078d09184
function isPrime(n, k = 5) {
    if (n <= 1n) return false
    if (n <= 3n) return true
    if (n % 2n === 0n) return false
  
    let d = n - 1n;
    let r = 0n
    while (d % 2n === 0n) {
      d /= 2n
      r++
    }
  
    const witnesses = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n]
  
    for (let i = 0; i < k; i++) {
      const a = witnesses[i] % n
      if (a === 0n) continue
  
      let x = modExp(a, d, n)
      if (x === 1n || x === n - 1n) continue;
  
      let continueLoop = false
      for (let j = 0; j < r - 1n; j++) {
        x = (x * x) % n
        if (x === 1n) return false
        if (x === n - 1n) {
          continueLoop = true
          break
        }
      }
      if (continueLoop) continue
      return false
    }
    return true
}
function modExp(base, exp, mod) {
    let result = 1n
    base = base % mod
    while (exp > 0n) {
      if (exp % 2n === 1n) {
        result = (result * base) % mod
      }
      exp = exp >> 1n
      base = (base * base) % mod
    }
    return result
}
function findGenerator(p) {
    if (!isPrime(p)) return -1n
    const q = (p - 1n) / 2n
    if (!isPrime(q)) return -1n
  
    for (let g = 2n; g < p; g++) {
      if (modExp(g, q, p) !== 1n && modExp(g, 2n, p) !== 1n) {
        return g
      }
    }
  
    return -1n
}


//https://www.codewars.com/kata/5270d0d18625160ada0000e4
function score(dice) {
    const counts = [0, 0, 0, 0, 0, 0]
    
    dice.forEach(die => {
      counts[die - 1]++
    })
  
    let totalScore = 0
  
    for (let i = 0; i < 6; i++) {
      if (counts[i] >= 3) {
        switch (i) {
          case 0:
            totalScore += 1000
            break
          case 1:
            totalScore += 200
            break
          case 2:
            totalScore += 300
            break
          case 3:
            totalScore += 400
            break
          case 4:
            totalScore += 500
            break
          case 5:
            totalScore += 600
            break
          default:
            break
        }
        counts[i] -= 3
      }
    }
  
    totalScore += counts[0] * 100
    totalScore += counts[4] * 50
  
    return totalScore
}


//https://www.codewars.com/kata/5659c6d896bc135c4c00021e
function nextSmaller(n) {
    const digits = n.toString().split('').map(Number)
    let i = digits.length - 2
    while (i >= 0 && digits[i] <= digits[i + 1]) {
      i--
    }
  
    if (i === -1) return -1
  
    let j = digits.length - 1
    while (digits[j] >= digits[i]) {
      j--
    }
  
    [digits[i], digits[j]] = [digits[j], digits[i]]
  
    const left = digits.slice(0, i + 1)
    const right = digits.slice(i + 1).sort((a, b) => b - a)
    const result = parseInt(left.concat(right).join(''), 10)
  
    if (result.toString().length !== digits.length) {
      return -1
    }
  
    return result
}


//https://www.codewars.com/kata/52f677797c461daaf7000740
function gcd(a, b) {
    while (b !== 0) {
      [a, b] = [b, a % b]
    }
    return a
}
function solution(arr) {
    if (arr.length === 0) return 0
    let currentGCD = arr[0]
    for (let i = 1; i < arr.length; i++) {
      currentGCD = gcd(currentGCD, arr[i])
    }
  
    return currentGCD * arr.length;
}


//https://www.codewars.com/kata/5a1fe6b1ffe75f9f5a00009f
function operate(set, operation) {
    const isInversion = operation.includes('I')
    const n = parseInt(operation.match(/\d+/)[0], 10)
  
    const transform = (note) => {
      if (isInversion) {
        return (12 - note + n) % 12
      } else {
        return (note + n) % 12
      }
    }
    const transformedSet = set.map(transform)
  
    return transformedSet.sort((a, b) => a - b)
}


//https://www.codewars.com/kata/5503013e34137eeeaa001648
function diamond(size) {
    if (size <= 0 || size % 2 === 0) {
      return null
    }
    let diamondStr = ''
    for (let i = 1; i <= size; i += 2) {
      const spaces = ' '.repeat((size - i) / 2)
      const stars = '*'.repeat(i)
      diamondStr += spaces + stars + '\n'
    }
    for (let i = size - 2; i >= 1; i -= 2) {
      const spaces = ' '.repeat((size - i) / 2)
      const stars = '*'.repeat(i)
      diamondStr += spaces + stars + '\n'
    }
  
    return diamondStr
}


//https://www.codewars.com/kata/54ce9497975ca65e1a0008c6
function convertTemp(temp, from_scale, to_scale) {
    let convertedTemp;
    switch (from_scale) {
      case 'C':
        convertedTemp = temp
        break
      case 'F':
        convertedTemp = (temp - 32) * 5 / 9
        break
      case 'K':
        convertedTemp = temp - 273.15
        break
      case 'R':
        convertedTemp = (temp - 491.67) * 5 / 9
        break
      case 'De':
        convertedTemp = 100 - temp * 2 / 3
        break
      case 'N':
        convertedTemp = temp * 100 / 33
        break
      case 'Re':
        convertedTemp = temp * 5 / 4
        break
      case 'Ro':
        convertedTemp = (temp - 7.5) * 40 / 21
        break
      default:
        throw new Error('Invalid from_scale')
    }
  
    switch (to_scale) {
      case 'C':
        convertedTemp = convertedTemp
        break
      case 'F':
        convertedTemp = convertedTemp * 9 / 5 + 32
        break
      case 'K':
        convertedTemp = convertedTemp + 273.15
        break
      case 'R':
        convertedTemp = (convertedTemp + 273.15) * 9 / 5
        break
      case 'De':
        convertedTemp = (100 - convertedTemp) * 3 / 2
        break
      case 'N':
        convertedTemp = convertedTemp * 33 / 100
        break
      case 'Re':
        convertedTemp = convertedTemp * 4 / 5
        break
      case 'Ro':
        convertedTemp = convertedTemp * 21 / 40 + 7.5
        break
      default:
        throw new Error('Invalid to_scale')
    }
  
    return Math.round(convertedTemp)
}


//https://www.codewars.com/kata/5a4ff3c5fd56cbaf9800003e
function withoutLast(arr) {
    const arrr = [...arr]
    arrr.pop()
    return [...arrr]
}


//https://www.codewars.com/kata/5865918c6b569962950002a1
function strCount(str, letter){
    return str.length - str.replaceAll(letter, '').length
}


//https://www.codewars.com/kata/578553c3a1b8d5c40300037c
const binaryArrayToNumber = arr => {
    return parseInt(arr.join(''), 2)
}


//https://www.codewars.com/kata/61c49a1045dba2004e7acd1f
function quine() { return(String(quine)) }


//https://www.codewars.com/kata/56b0f5f84de0afafce00004e
function relativelyPrime(n, arr) {
    if(n === 1) {
      return arr
    }
    let factors = [n]
    for(let i = 2; i * i <= n; i += 1) {
      if(!(n % i)) {
        if(i * i === n) {
          factors.push(i)
          continue
        }
        factors.push(i, n / i)
      }
    }
    const results = []
    for(let i = 0; i < arr.length; i += 1) {
        if(factors.every((factor) => !!(arr[i] % factor))) {
           results.push(arr[i])
         }
    }
    
    return results
}


//https://www.codewars.com/kata/665bf5790be3c249ffb9422b
function EvenOdd(num) {
    if (!(this instanceof EvenOdd)) {
        return Math.abs(num % 2) === 0 ? "Even" : "Odd"
    }
    this.num = num
}
EvenOdd.prototype.valueOf = function() {
    return Math.abs(+this.num % 2) === 0 ? "Even" : "Odd"
}
const evenOrOdd = new Proxy(EvenOdd, {
    get: function(target, prop) {
        if (typeof prop === 'string' && !isNaN(prop)) {
            evenOrOdd.toString = () => target(prop)
            evenOrOdd['num'] = Math.abs(+prop) % 2 ? 1 : 2
            return evenOrOdd
        }
        return target[prop]
    },
    apply: function(target, thisArg, argumentsList) {
        let num = argumentsList[0];
        return Math.abs(num % 2) === 0 ? "Even" : "Odd";
    },
    construct: function(target, argumentsList) {
        return new target(argumentsList[0] || evenOrOdd.num)
    }
})


//https://www.codewars.com/kata/57eb8fcdf670e99d9b000272
function wordScore(word) {
    return word.split('').reduce((score, char) => {
        return score + (char.charCodeAt(0) - 96)
    }, 0)
}
function high(x){
    let words = x.split(' ')
    let highestScore = 0
    let highestScoringWord = ''

    for (let word of words) {
        let score = wordScore(word)
        if (score > highestScore) {
            highestScore = score
            highestScoringWord = word
        }
    }

    return highestScoringWord
}


//https://www.codewars.com/kata/525f50e3b73515a6db000b83
function createPhoneNumber(numbers){
    const _1 = numbers.slice(0, 3)
    const _2 = numbers.slice(3, 6)
    const _3 = numbers.slice(6)

    return `(${_1.join('')}) ${_2.join('')}-${_3.join('')}`
}
