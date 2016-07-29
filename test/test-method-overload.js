// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

'use strict';

/* global describe, it */
var assert = require('assert');
var buildAddon = require('./addon-builder.js').buildAddon;
var compile = require('./compile.js').compile;
var path = require('path');

var B;

describe('widl-nan Unit Test - Method Overloading', function() {
  it('Generating binding C++ code', function() {
    return compile('test/method_overload/method_overload.widl',
                   'test/method_overload/gen');
  });

  it('Building addon', function() {
    // building addon maybe slow
    this.timeout(100000);

    return buildAddon('test/method_overload');
  });

  it('Loading addon', function() {
    var addonDir = path.join(path.dirname(__filename), 'method_overload');
    var addon = require('bindings')(
        // eslint-disable-next-line camelcase
        {bindings: 'testerAddon', module_root: addonDir});

    B = addon.B;
    assert.equal(typeof B, 'function');
  });

  it('Overloading resolution', done => {
    var x = new B();
    assert.equal(x.f('str'), 'method1');
    assert.equal(x.f(15, 3.14), 'method2');
    assert.equal(x.f(6.28, 'str'), 'method3');
    done();
  });
});
