var _u = require("./underscore.js");
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