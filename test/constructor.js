"use strict";

var assert = require("assert");

function testNoConstructor(templ) {
  return assert.throws(function () {
    var foo = new templ();
  }, function (e) {
    if (e instanceof TypeError && /constructor/.test(e)) {
      return true;
    }
  }, "Unexpected error");
}

module.exports = {
  testNoConstructor: testNoConstructor
};
