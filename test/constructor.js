// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

'use strict';

var assert = require('assert');

function testNoConstructor(templ) {
  return assert.throws(function() {
    // eslint-disable-next-line
    var foo = new templ();
  }, function(e) {
    if (e instanceof TypeError && /constructor/.test(e)) {
      return true;
    }
  }, 'Unexpected error');
}

module.exports = {
  testNoConstructor: testNoConstructor
};
