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

describe('widl-nan Unit Test - IDL enum', function() {
  it('Generating binding C++ code', function() {
    return compile('test/enum/enum.widl', 'test/enum/gen');
  });

  it('Building addon', function() {
    // building addon maybe slow
    this.timeout(100000);

    return buildAddon('test/enum');
  });

  it('Loading addon', function() {
    var addonDir = path.join(path.dirname(__filename), 'enum');
    var addon = require('bindings')(
        // eslint-disable-next-line camelcase
        {bindings: 'testerAddon', module_root: addonDir});
    Meal = addon.Meal;
    assert.equal(typeof Meal, 'function');
  });

  it('Setting attribute with a valid enum value', done => {
    var x = new Meal();
    x.type = 'rice';
    assert.equal(x.type, 'rice');
    done();
  });

  it('Setting attribute with an invalid enum value (no effect)', () => {
    var x = new Meal();
    x.type = 'rice';
    x.type = 'invalid-enum-value'; // No effect
    assert.equal(x.type, 'rice');
  });

  it('Calling operation with a valid enum value', () => {
    var x = new Meal();
    x.initialize('noodles', 50);
    assert.equal(x.type, 'noodles');
  });

  it('Calling operation with an invalid enum value (throw exception)', () => {
    return assert.throws(function() {
      var x = new Meal();
      x.initialize('lasagna', 50); // Throws TypeError()
    }, function(e) {
      if (e instanceof TypeError && /type/.test(e)) {
        return true;
      }
    }, 'Unexpected error');
  });

  it('NOP test', done => {
    done();
  });
});
