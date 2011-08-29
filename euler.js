//npm install underscore
//npm install underscore.string

var _ = require("underscore");
//var _s = require('underscore.string');

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
        //return (_s(s).reverse() == s);
        return (Array.prototype.reverse.apply(s.split('')).join('') == s);        
        // "Being a pallindrome is a lexical property rather than a mathematical one" - Dan Dyer
    };
    
    // return primes collections up no greater than max
    var primes = function(max) {        
        var nset = _.range(2,max);
        
        // Eratosthenes' sieve
        var sieve = function(nset, n) {
            return _(nset).reject(function(x){return x !== n && x % n === 0;});            
        };                
        for(var j = 0; j <= Math.sqrt(max);j++) {
            nset = sieve(nset, nset[j]);                        
        }
        return nset;
    };
    
    var problems = {
        1: {
            'link': "http://projecteuler.net/index.php?section=problems&id=1",
            'desc': "Find the sum of all the multiples of 3 or 5 below 1000.",
            solve: function() {
                return _.range(0, 1000).reduce(function(memo, x) {
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
                
                return _.max(primefactors(n)); 
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
                return Math.pow(_.range(1,N+1).reduce(function(memo, x) {return memo + x;}), 2) - 
                _.range(1,N+1).reduce(function(memo, x){return memo + x*x;});
                */                
            }
        },
        7: {
            'link': 'http://projecteuler.net/index.php?section=problems&id=7',
            'desc': "What is the 10 001st prime number",
            solve: function() {
                var N = 10001;                
                // http://primes.utm.edu/howmany.shtml
                return primes(N * (Math.log(N) + Math.log(Math.log(N-1))))[N-1];                
            }
        },
        8: {
            'link': 'http://projecteuler.net/index.php?section=problems&id=8',
            'desc': "Find the greatest product of five consecutive digits in the 1000-digit number",
            solve: function() {
                var n = "7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450";                
                var digits = 0, product = 0, max = 0;
                for(var d = 0; d < n.length; d++) {
                    if(n[d] == '0') {
                        digits = product = 0; continue;
                    }                    
                    product = (product === 0)? n[d] : product * n[d];
                    digits++;
                    if(5 === digits) {
                        max = (product > max)? product : max;
                        product = product / n[d-digits+1];
                        digits--;
                    }                                        
                }
                return max;
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

//console.log(Euler.result(1));
//console.log(Euler.result(2));
//console.log(Euler.result(3));
//console.log(Euler.result(4));
//console.log(Euler.result(5));
//console.log(Euler.result(6));
//console.log(Euler.result(7));
console.log(Euler.result(8));
