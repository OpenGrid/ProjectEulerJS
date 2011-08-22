//npm install underscore
//npm install underscore.string

var _u = require("underscore");
var _s = require('underscore.string');

var Euler = (function() {
    var primefactors = function(number) {
        var factors = [1], n = number;
        for(var i = 2; i <= n; i++) {
            while(n % i === 0) {
                factors.push(i);
                n /= i;
            }
        }
        return factors;
    };
    
    var isPalindrome = function(number) {
        var s = ''+number;     
        // npm underscroe.string module doesn't seem to have reverseString at this stage?        
        // this is nasty
        //return (_s.reverseString(s) == s);
        return (Array.prototype.reverse.apply(s.split('')).join('') == s);        
        // "Being a pallindrome is a lexical property rather than a mathematical one" - Dan Dyer
    };
    
    // return primes collections up to max
    var primes = function(max) {        
        var nset = _u.range(1,max);
        // Eratosthenes' sieve
        var sieve = function(nset, n) {
            return _u(nset).reject(function(x){return x % n === 0;});            
        };        
        for(var i = 2; i <= Math.sqrt(max); i++) {
            nset = sieve(nset, i);
        }
        return nset;
    };
    
    var problems = {
        1: {
            'link': "http://projecteuler.net/index.php?section=problems&id=1",
            'desc': "Find the sum of all the multiples of 3 or 5 below 1000.",
            solve: function() {
                return _u.range(0, 1000).reduce(function(memo, x) {
                    return (x % 5 === 0 || x % 3 === 0) ? memo + x : memo;
                }, 0);
            }
        },
        2: {
            'link': 'http://projecteuler.net/index.php?section=problems&id=2',
            'desc': "By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms.",
            solve: function() {
                var efib = function(n) {
                    var evenSum = 0, memo = [0, 1], len = memo.length, next;
                    while ((next = memo[len - 1] + memo[len - 2]) < n) {
                        len++;
                        memo.push(next);
                        if(next % 2 === 0) evenSum += next;
                    }                    
                    return evenSum;
                };
                return efib(4e6);
            }
        },
        3: {
            'link': 'http://projecteuler.net/index.php?section=problems&id=3',
            'desc': "What is the largest prime factor of the number 600851475143",
            solve: function() {
                var n = 600851475143;
                
                return _u.max(primefactors(n)); 
                // or return http://www.wolframalpha.com/input/?i=largest+prime+factor+600851475143
            }
        },        
        4: {
            'link': 'http://projecteuler.net/index.php?section=problems&id=4',
            'desc': "Find the largest palindrome made from the product of two 3-digit numbers",
            solve: function() {
                var maxpal = 0, p;
                for(var a = 999; a >= 100; a--) {
                    for(var b = a; b >= 100; b--) {
                        p = a*b;
                        if(isPalindrome(p) && p > maxpal) maxpal = p;
                    }
                }
                return maxpal;
            }
        },
        5: {
            'link': 'http://projecteuler.net/index.php?section=problems&id=5',
            'desc': "What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20",
            solve: function() { 
                var i,j,k, pfactors, pwrcntr, total = [], maxn = 20, result = 1;
                
                // from 1 to 20 -> maxn = 20                
                for(i = 1; i <= maxn; i++) {
                    // calculating prime factors needed to calculate Least Common Multiple
                    // http://en.wikipedia.org/wiki/Least_common_multiple#Finding_least_common_multiples_by_prime_factorization
                    pfactors = primefactors(i);
                    pwrcntr = [];
                    // looking for highest powers
                    for(j in pfactors) {
                        pwrcntr[pfactors[j]] = (pwrcntr[pfactors[j]] === undefined)? 1: pwrcntr[pfactors[j]] + 1; 
                    }                    
                    for(k in pwrcntr) {
                        if(total[k] === undefined) total[k] = pwrcntr[k];
                        else total[k] = (pwrcntr[k] > total[k])? pwrcntr[k]: total[k];
                    }                                        
                }
                // The lcm will be the product of multiplying the highest power in each prime factor category together
                for(i in total) {
                    result *= (total[i] !== undefined)? Math.pow(i, total[i]): 1;
                }
                return result;
            }
        },
        6: {
            'link': 'http://projecteuler.net/index.php?section=problems&id=6',
            'desc': "Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.",
            solve: function() {
                var N = 100;
                // Sum of N natural numbers squared
                var sumsq = Math.pow((N * (N + 1))/2, 2);
                // Sum of N squared natural numbers
                // http://en.wikipedia.org/wiki/Square_pyramidal_number
                var sumofsq = N * (N + 1) * (2 * N + 1) / 6;
                return sumsq - sumofsq;
                /*
                //Range - Reduce for practice purposes
                return Math.pow(_u.range(1,N+1).reduce(function(memo, x) {return memo + x;}), 2) - 
                _u.range(1,N+1).reduce(function(memo, x){return memo + x*x;});
                */
                
            }
        }
    };
    return {
        result: function(problem) {
            var p = problems[problem];
            return "\n" + p.desc + "\n" + p.link + "\n" + p.solve();
        }
    };
})();

console.log(Euler.result(1));
console.log(Euler.result(2));
console.log(Euler.result(3));
console.log(Euler.result(4));
console.log(Euler.result(5));
console.log(Euler.result(6));