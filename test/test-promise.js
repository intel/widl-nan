// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

'use strict';

/* global describe, it */
var assert = require('assert');
var buildAddon = require('../lib/addon-builder.js').buildAddon;
var compile = require('../lib/compile.js').compile;
var path = require('path');

var Meal = null;

describe('widl-nan Unit Test - IDL promise', function() {
  it('Generating binding C++ code', function() {
    return compile('test/promise/promise.widl', 'test/promise/gen');
  });

  it('Building addon', function() {
    // building addon maybe slow
    this.timeout(100000);

    return buildAddon('test/promise');
  });

  it('Loading addon', function() {
    var addonDir = path.join(path.dirname(__filename), 'promise');
    var addon = require('bindings')(
        // eslint-disable-next-line camelcase
        {bindings: 'testerAddon', module_root: addonDir});
    Meal = addon.Meal;
    assert.equal(typeof Meal, 'function');
  });

  it('Test return type is Promise', done => {
    var x = new Meal();
    x.initialize('rice', 0.5);
    assert(x.cook('tim') instanceof Promise);
    done();
  });
});
