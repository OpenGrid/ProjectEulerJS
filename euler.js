var _u = require("./underscore.js");
var Euler = (function() {
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