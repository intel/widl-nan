"use strict";

var assert = require("assert");

function testEnumProperty(templ, enumName, expectedValue) {
  assert.equal(typeof templ[enumName], typeof expectedValue);
  assert.equal(Object.getOwnPropertyDescriptor(templ, enumName).writable, false);
  assert.equal(templ[enumName], expectedValue);
}

module.exports = {
  testEnumProperty: testEnumProperty,
  testConstAttribute: testEnumProperty
};
