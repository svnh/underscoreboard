/* Based on qunit tests written by
 * Jeremy Ashkenas <https://github.com/jashkenas/> and modified by
 * Jonas Huckstein <https://github.com/jonashuckestein/>
 */


describe("_.each", function() {
  it("should provide value and iteration count", function() {
    _.each([1, 2, 3], function(num, i) {
      expect(num).to.equal(i + 1);
    });
  });

  it("should iterate over objects, ignoring the object prototype", function() {
    var answers = [];
    var obj = {one : 1, two : 2, three : 3};
    obj.constructor.prototype.four = 4;
    _.each(obj, function(value, key){ answers.push(key); });
    expect(answers.join(", ")).to.equal('one, two, three');
  });


  it("should be able to reference the original collection from inside the iterator", function() {
    var answer = null;
    _.each([1, 2, 3], function(num, index, arr){ if (arr.indexOf(num)>0) answer = true; });
    expect(answer).to.be(true);
  });

  it("should handle a null value gracefully", function() {
    var answers = 0;
    _.each(null, function(){ ++answers; });
    expect(answers).to.equal(0);
  });
});

describe("_.contains", function() {
  it("should return true if a collection contains a user-specified value", function() {
    expect(_.contains([1,2,3], 2)).to.equal(true);
    expect(_.contains({moe:1, larry:3, curly:9}, 3)).to.equal(true);
  });

  it("should return false if a collection does not contain a user-specified value", function() {
    expect(_.contains([1,3,9], 2)).to.equal(false);
  });
});

describe("_.map", function() {
  it("should apply a function to every value in an array", function() {
    var doubled = _.map([1, 2, 3], function(num){ return num * 2; });
    expect(doubled.join(', ')).to.equal('2, 4, 6');
  });

  it("should handle a null value gracefully", function() {
    var ifnull = _.map(null, function(){});
    expect(Array.isArray(ifnull)).to.be(true);
    expect(ifnull.length).to.equal(0);
  });
});

describe("_.pluck", function() {
  it("should return values contained at a user-defined property", function() {
    var people = [{name : 'moe', age : 30}, {name : 'curly', age : 50}];
    expect(_.pluck(people, 'name').join(', ')).to.equal('moe, curly');
  });
});


describe("_.last", function() {
  it("should pull the last element from an array", function() {
    expect(_.last([1,2,3])).to.equal(3);
  });
  it("should handle a user-defined index", function() {
    expect(_.last([1,2,3], 0).join(', ')).to.equal('');
  });
  it("should be able to ", function() {
    expect(_.last([1,2,3], 2).join(', ')).to.equal('2, 3');
  });
  it("should be able to pull the last element from an array", function() {
    expect(_.last([1,2,3], 5).join(', ')).to.equal('1, 2, 3');
  });
  it("should work on an arguments object", function() {
    var result = (function(){ return _.last(arguments, 2); })(1, 2, 3, 4);
    expect(result.join(', ')).to.equal('3, 4');
  });
  it("should work well with _.map", function() {
    var result = _.map([[1,2,3],[1,2,3]], _.last);
    expect(result.join(', ')).to.equal('3, 3');
  });
  it("handle a null value gracefully", function() {
    expect(_.last(null)).to.equal(undefined);
  });
});


describe("_.first", function() {
  it("should be able to pull out the first element of an array", function() {
    expect(_.first([1,2,3])).to.equal(1);
  });
  it("should be able to accept a user-defined index", function() {
    expect(_.first([1,2,3], 0).join(', ')).to.equal('');
    expect(_.first([1,2,3], 2).join(', ')).to.equal('1, 2');
    expect(_.first([1,2,3], 5).join(', ')).to.equal('1, 2, 3');
  });
  it("should work on an arguments object", function() {
    var result = (function(){ return _.first(arguments, 2); })(4, 3, 2, 1);
    expect(result.join(', ')).to.equal('4, 3');
  });
  it("should work well with _.map", function() {
    var result = _.map([[1,2,3],[1,2,3]], _.first);
    expect(result.join(', ')).to.equal('1, 1');
  });
  it("should handle a null value gracefully", function() {
    expect(_.first(null)).to.equal(undefined);
  });
});

describe("_.reduce", function() {
  it("should be able to sum up an array", function() {
    var sum = _.reduce([1, 2, 3], function(sum, num){ return sum + num; }, 0);
    expect(sum).to.equal(6);
  });
  it("should handle a null value gracefully (as long as the user provides an initial value)", function() {
    var sum = _.reduce([1, 2, 3], function(sum, num){ return sum + num; });
    expect(sum).to.equal(6);
  });
  it("should handle a null value gracefully (as long as the user provides an initial value)", function() {
    expect(_.reduce(null, function(){}, 138)).to.equal(138);
  });
});

describe("_.select", function() {
  it("should select each even number in an array", function() {
    var evens = _.select([1, 2, 3, 4, 5, 6], function(num){ return num % 2 === 0; });
    expect(evens.join(', ')).to.equal('2, 4, 6');
  });
  it("should select each odd number in an array", function() {
    var odds = _.select([1, 2, 3, 4, 5, 6], function(num){ return num % 2 !== 0; });
    expect(odds.join(', ')).to.equal('1, 3, 5');
  });
});

describe("_.reject", function() {
  it("should reject all even numbers", function() {
    var odds = _.reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 === 0; });
    expect(odds.join(', ')).to.equal('1, 3, 5');
  });
  it("should return all odd numbers", function() {
    var evens = _.reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 !== 0; });
    expect(evens.join(', ')).to.equal('2, 4, 6');
  });
});

describe("_.every", function() {
  it("should handle an empty set", function() {
    expect( _.every([], function(i){return i;}) ).to.equal(true);
  });
  it("should handle a set that contains only true values", function() {
    expect( _.every([true, true, true], function(i){return i;}) ).to.equal(true);
  });
  it("should handle a set that contains one false value", function() {
    expect( _.every([true, false, true], function(i){return i;}) ).to.equal(false);
  });
  it("should handle a set that contains even numbers", function() {
    expect( _.every([0, 10, 28], function(num){ return num % 2 === 0; }) ).to.equal(true);
  });
  it("should handle a set that contains an odd number", function() {
    expect( _.every([0, 11, 28], function(num){ return num % 2 === 0; }) ).to.equal(false);
  });
  it("should cast to boolean true", function() {
    expect( _.every([1], function(i){return i;}) ).to.equal(true);
  });
  it("should cast to boolean false", function() {
    expect( _.every([0], function(i){return i;}) ).to.equal(false);
  });
  it("should work with an array that contains several undefined values", function() {
    expect( _.every([undefined, undefined, undefined], function(i){return i;}) ).to.equal(false);
  });
});

describe("_.any", function() {
  var nativeSome;
  beforeEach(function(){
    nativeSome = Array.prototype.some;
    Array.prototype.some = null;
  });
  afterEach(function(){
    Array.prototype.some = nativeSome;
  });

  it("should handle the empty set", function() {
    expect(_.any([])).to.equal(false);
  });

  it("should handle a set containing 'false' values", function() {
    expect(_.any([false, false, false])).to.equal(false);
  });

  it("should handle a set containing one 'true' value", function() {
    expect(_.any([false, false, true])).to.equal(true);
  });

  it("should handle a set containing a string", function() {
    expect(_.any([null, 0, 'yes', false])).to.equal(true);
  });

  it("should handle a set that contains falsy values", function() {
    expect(_.any([null, 0, '', false])).to.equal(false);
  });

  it("should handle a set that contains all odd numbers", function() {
    expect(_.any([1, 11, 29], function(num){ return num % 2 === 0; })).to.equal(false);
  });

  it("should handle a set that contains an even number", function() {
    expect(_.any([1, 10, 29], function(num){ return num % 2 === 0; })).to.equal(true);
  });

  it("should handle casting to boolean - true", function() {
    expect(_.any([1], function(i){return i;})).to.equal(true);
  });

  it("should handle casting to boolean - false", function() {
    expect(_.any([0], function(i){return i;})).to.equal(false);
  });
});

describe("_.uniq", function() {
  // TODO: clarify this -- "should return a list of unique values? consolidate
  // repeated values?"
  it("should return all unique values of an unsorted array", function() {
    var list = [1, 2, 1, 3, 1, 4];
    expect(_.uniq(list).join(', ')).to.equal('1, 2, 3, 4');
  });

  it("should handle iterators that work with a sorted array", function() {
    var iterator = function(value) { return value +1; };
    var list = [1, 2, 2, 3, 4, 4];
    expect(_.uniq(list, true, iterator).join(', ')).to.equal('1, 2, 3, 4');
  });

  it("should work on an arguments object", function() {
    var result = (function(){ return _.uniq(arguments); })(1, 2, 1, 3, 1, 4);
    expect(result.join(', ')).to.equal('1, 2, 3, 4');
  });
});

describe("_.once", function() {
  it("should only run a user-defined function if it hasn't been run before", function() {
    var num = 0;
    var increment = _.once(function(){ num++; });
    increment();
    increment();

    expect(num).to.equal(1);
  });
});

describe("_.memoize", function() {
  // TODO: rewrite to be more clear
  it("a memoized version of fibonacci produces identical results", function() {
    var fib = function(n) {
      return n < 2 ? n : fib(n - 1) + fib(n - 2);
    };
    var fastFib = _.memoize(fib);
    expect(fib(10)).to.equal(55);
    expect(fastFib(10)).to.equal(55);
  });

  it("should check hasOwnProperty", function() {
    var o = function(str) {
      return str;
    };
    var fastO = _.memoize(o);
    expect(o('toString')).to.equal('toString');
    expect(fastO('toString')).to.equal('toString');
  });
});

xdescribe("_.delay", function() {
  // TODO: rewrite test descriptions to be more clear
  // TODO: This currently tests whether or not a function gets fired after some
  // amount of time, but it doesn't test whether it is NOT fired before that time.
  // Figure this out in another 'it' block.
  var flag, testArgs;
  it("should only execute the function after the specified wait time", function() {
    runs(function() {
      flag = false;
      testArgs = false;

      _.delay(
        function(newVal){
          flag = true;
          testArgs = newVal;
        }, 50, true);
    });
    waitsFor(function() {
      return flag;
    }, "The function should have been executed by now", 100);

    // TODO: equivalent qunit code for above todo
    //setTimeout(function(){ ok(!delayed, "didn't delay the function quite yet"); }, 50);
    //setTimeout(function(){ ok(delayed, 'delayed the function'); start(); }, 150);
    //setTimeout(function(){ ok(testArgs, "function arguments are passed in successfully"); }, 150);
  });
  it("should have successfully passed function arguments in", function() {
    expect(testArgs).to.equal(true);
  });
});

describe("_.extend", function() {
  var result;
  afterEach(function(){
    result = null;
  });

  it("should extend an object with the attributes of another", function() {
    expect(_.extend({}, {a:'b'}).a).to.equal('b');
  });
  it("should override properties found on the destination", function() {
    expect(_.extend({a:'x'}, {a:'b'}).a).to.equal('b');
  });
  it("should not override properties not found in the source", function() {
    expect(_.extend({x:'x'}, {a:'b'}).x).to.equal('x');
  });
  it("should extend from multiple source objects", function() {
    result = _.extend({x:'x'}, {a:'a'}, {b:'b'});
    expect(result.x == 'x' && result.a == 'a' && result.b == 'b').to.be(true);
  });
  it("in the case of a conflict, it should use the last property's values when extending from multiple source objects", function() {
    result = _.extend({x:'x'}, {a:'a', x:2}, {a:'b'});
    expect(result.x == 2 && result.a == 'b').to.be(true);
  });
  it("should not copy undefined values", function() {
    result = _.extend({}, {a: void 0, b: null});
    expect(result.hasOwnProperty('a') && result.hasOwnProperty('b')).to.be(true);
  });
});

describe("_.defaults", function() {
  var result, options;
  beforeEach(function(){
    options = {zero: 0, one: 1, empty: "", nan: NaN, string: "string"};
    _.defaults(options, {zero: 1, one: 10, twenty: 20}, {empty: "full"}, {nan: "nan"}, {word: "word"}, {word: "dog"});
  });
  it("should apply a value when one doesn't already exist on the target", function() {
    expect(options.zero).to.equal(0);
    expect(options.one).to.equal(1);
    expect(options.twenty).to.equal(20);
  });
  it("should not apply a value if one already exist on the target", function() {
    expect(options.empty).to.equal("");
    expect(isNaN(options.nan)).to.equal(true);
  });
  it("if two identical values are passed in, the first one wins", function() {
    expect(options.word).to.equal("word");
  });
});

describe("_.flatten", function() {
  it("can flatten nested arrays", function() {
    var nestedArray = [1, [2], [3, [[[4]]]]];
    expect(JSON.stringify(_.flatten(nestedArray))).to.equal('[1,2,3,4]');
  });
  it("works on an arguments object", function() {
    var result = (function(){ return _.flatten(arguments); })(1, [2], [3, [[[4]]]]);
    expect(JSON.stringify(result)).to.equal('[1,2,3,4]');
  });
});

describe("_.sortBy", function() {
  it("should sort by age", function() {
    var people = [{name : 'curly', age : 50}, {name : 'moe', age : 30}];
    people = _.sortBy(people, function(person){ return person.age; });
    expect(_.pluck(people, 'name').join(', ')).to.equal('moe, curly');
  });
  it("should handle undefined values", function() {
    var list = [undefined, 4, 1, undefined, 3, 2];
    expect(_.sortBy(list, function(i){return i;}).join(',')).to.equal('1,2,3,4,,');
  });
  it("should sort by length", function() {
    var list = ["one", "two", "three", "four", "five"];
    var sorted = _.sortBy(list, 'length');
    expect(sorted.join(' ')).to.equal('one two four five three');
  });
  // TODO: What the hell does 'stable' mean? Improve description here
  it("should be stable", function() {
    function Pair(x, y) {
      this.x = x;
      this.y = y;
    }
    var collection = [
      new Pair(1, 1), new Pair(1, 2),
      new Pair(1, 3), new Pair(1, 4),
      new Pair(1, 5), new Pair(1, 6),
      new Pair(2, 1), new Pair(2, 2),
      new Pair(2, 3), new Pair(2, 4),
      new Pair(2, 5), new Pair(2, 6),
      new Pair(undefined, 1), new Pair(undefined, 2),
      new Pair(undefined, 3), new Pair(undefined, 4),
      new Pair(undefined, 5), new Pair(undefined, 6)
    ];
    var actual = _.sortBy(collection, function(pair) {
      return pair.x;
    });
    expect(actual).to.equal(collection);
  });
});

describe("_.zip", function() {
  it("should zip together arrays of different lengths", function() {
    var names = ['moe', 'larry', 'curly'], ages = [30, 40, 50], leaders = [true];
    var stooges = _.zip(names, ages, leaders);
    expect(String(stooges)).to.equal('moe,30,true,larry,40,,curly,50,');
  });
});
