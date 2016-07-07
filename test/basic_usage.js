"use strict"

const widlNan = require("..");
const enumGenerator = require('../cpp-enum.js');
const assert = require("assert");

beforeEach(() => {
});

afterEach(() => {
});

describe('widl-nan basics', function () {
  var x = 5;

  describe('suite #1', function() {
    it('Case#1 widlNan.hello is a function', function() {
      assert.equal(typeof widlNan.hello, 'function');
      // widlNan.hello();
    });

    it('Case#2 Should not crash', function () {
      var g = widlNan.generator;
      // g.scanDir('examples');

      g.addFile('examples/meal.widl')
      .then(function () {
        g.compile();
        g.writeToDir('gen');
      })
      .catch(e => {
        console.log(e);
      });
    });
  });

  describe('C++ header suite', function () {
    it('Should not crash', function () {
      return enumGenerator.addFile('examples/rs.hpp')
      .then(function () {
        enumGenerator.compile();
      })
      .catch(e => {
        console.log(e);
      });

    });

    it('Test *.widl + *.h generation', function () {
      var g = widlNan.generator;
      // g.scanDir('examples');

      return Promise.all([
        g.addFile('examples/meal.widl'),
        g.addCppEnum('examples/rs.hpp')
        ]).then(function () {
          g.compile();
          g.writeToDir('gen');
        }).catch(e => {
          console.log(e);
          throw e;
        });

    });
  });

});

