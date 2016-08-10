// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

'use strict';

/* global describe, it */
var assert = require('assert');
var buildAddon = require('../lib/addon-builder.js').buildAddon;
var compile = require('../lib/compile.js').compile;
var path = require('path');

var ColorCreator = null;

describe('widl-nan Unit Test - Optional argument', function() {
  it('Generating binding C++ code', function() {
    return compile('test/optional-argument/optional-argument.widl', 'test/optional-argument/gen');
  });

  it('Building addon', function() {
    // building addon maybe slow
    this.timeout(100000);

    return buildAddon('test/optional-argument');
  });

  it('Loading addon', function() {
    var addonDir = path.join(path.dirname(__filename), 'optional-argument');
    var addon = require('bindings')(
        // eslint-disable-next-line camelcase
        {bindings: 'widlNanAddon', module_root: addonDir});
    ColorCreator = addon.ColorCreator;
    assert.equal(typeof ColorCreator, 'function');
  });

  it('test methods with all arguments provided', done => {
    var x = new ColorCreator();
    assert.equal(x.createColor(1.0, 2.0, 3.0, 0.5), '1,2,3,0.5');
    assert.equal(x.createColor2(1.0, 2.0, 3.0, 0.5), '1,2,3,0.5');
    done();
  });

  it('test methods with only non-optional arguments provided', done => {
    var x = new ColorCreator();
    assert.equal(x.createColor(1.0, 2.0, 3.0), '1,2,3,Undefined');
    assert.equal(x.createColor2(1.0, 2.0, 3.0), '1,2,3,0.75');
    done();
  });

  it('test optional argument in all primitive types', done => {
    var x = new ColorCreator();
    assert.equal(x.primitiveTypeCoverage1(1.0, 2.0, 3.0), '1,2,3,0.75');
    assert.equal(x.primitiveTypeCoverage2(1.0, 2.0, 3.0), '1,2,3,0.75');
    assert.equal(x.primitiveTypeCoverage3(1.0, 2.0, 3.0), '1,2,3,0.75');
    assert.equal(x.primitiveTypeCoverage4(1.0, 2.0, 3.0), '1,2,3,75');
    assert.equal(x.primitiveTypeCoverage5(1.0, 2.0, 3.0), '1,2,3,75');
    assert.equal(x.primitiveTypeCoverage6(1.0, 2.0, 3.0), '1,2,3,275');
    assert.equal(x.primitiveTypeCoverage7(1.0, 2.0, 3.0), '1,2,3,20275');
    assert.equal(x.primitiveTypeCoverage8(1.0, 2.0, 3.0), '1,2,3,800275');
    assert.equal(x.primitiveTypeCoverage9(1.0, 2.0, 3.0), '1,2,3,3000000275');
    assert.equal(x.primitiveTypeCoverage10(1.0, 2.0, 3.0), '1,2,3,2000000275');
    assert.equal(x.primitiveTypeCoverage11(1.0, 2.0, 3.0), '1,2,3,3000000275');
    assert.equal(x.primitiveTypeCoverage12(1.0, 2.0, 3.0), '1,2,3,0x1000');
    assert.equal(x.primitiveTypeCoverage13(1.0, 2.0, 3.0), '1,2,3,true');
    done();
  });
});
