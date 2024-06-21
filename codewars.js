//



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
