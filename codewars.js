//Even or Odd Accessor 2 : Electric Boogaloo
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


//Create Phone Number
function createPhoneNumber(numbers){
    const _1 = numbers.slice(0, 3)
    const _2 = numbers.slice(3, 6)
    const _3 = numbers.slice(6)

    return `(${_1.join('')}) ${_2.join('')}-${_3.join('')}`
}