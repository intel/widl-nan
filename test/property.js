// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

'use strict';

var assert = require('assert');

function testEnumProperty(templ, enumName, expectedValue) {
  assert.equal(typeof templ[enumName], typeof expectedValue);
  assert.equal(Object.getOwnPropertyDescriptor(templ, enumName).writable,
               false);
  assert.equal(templ[enumName], expectedValue);
}

module.exports = {
  testEnumProperty: testEnumProperty,
  testConstAttribute: testEnumProperty
};
