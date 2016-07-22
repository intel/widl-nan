"use strict";

var assert = require("assert");

function testEnumProperty(templ, enumName, expectedValue) {
  assert.equal(typeof templ[enumName], 'number');
  assert.equal(Object.getOwnPropertyDescriptor(templ, enumName).writable, false);
  assert.equal(templ[enumName], expectedValue);
}

module.exports = {
  testEnumProperty: testEnumProperty
};
