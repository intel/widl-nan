"use strict"

const widlNan = require("..");
const assert = require("assert");

beforeEach(() => {
  console.log('before every test in every file');
});

afterEach(() => {
  console.log('after every test in every file');
});

describe('widl-nan basics', function() {
  var x = 5;

  describe('suite #1', function() {
    it('Case#1 Should print Hello World', function() {
      assert.equal(typeof widlNan.hello, 'function');
      widlNan.hello();
    });
  });

});
