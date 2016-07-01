"use strict"

const widlNan = require("..");
const assert = require("assert");

beforeEach(() => {
});

afterEach(() => {
});

describe('widl-nan basics', function() {
  var x = 5;

  describe('suite #1', function() {
    it('Case#1 widlNan.hello is a function', function() {
      assert.equal(typeof widlNan.hello, 'function');
      // widlNan.hello();
    });

    it('Case#2 Should no crash', function () {
      var g = widlNan.generator;
      // g.scanDir('examples');

      g.addFile('examples/meal.widl')
      .then(function () {
        g.compile();
        g.writeToDir('gen');
      });
    });
  });

});
