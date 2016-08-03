// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

'use strict';

/* global describe, it */
var assert = require('assert');
var compile = require('../lib/compile.js').compile;
var buildAddon = require('../lib/addon-builder.js').buildAddon;
var path = require('path');

var PrimitivesAttributes;
var PrimitivesParam;
var PrimitivesReturn;

describe('widl-nan Unit Test - primitives', function() {
  it('Generating binding C++ code', function() {
    return compile([
      'test/primitives/primitives-attributes.widl',
      'test/primitives/primitives-param.widl',
      'test/primitives/primitives-return.widl'
    ], 'test/primitives/gen');
  });

  it('Building addon', function() {
    // building addon maybe slow
    this.timeout(100000);

    return buildAddon('test/primitives');
  });

  it('Loading addon', function() {
    var addonDir = path.join(path.dirname(__filename), 'primitives');
    var addon = require('bindings')(
        // eslint-disable-next-line camelcase
        {bindings: 'testerAddon', module_root: addonDir});

    PrimitivesAttributes = addon.PrimitivesAttributes;
    assert.equal(typeof PrimitivesAttributes, 'function');

    PrimitivesParam = addon.PrimitivesParam;
    assert.equal(typeof PrimitivesParam, 'function');

    PrimitivesReturn = addon.PrimitivesReturn;
    assert.equal(typeof PrimitivesReturn, 'function');
  });

  it('primitives attributes', done => {
    var x = new PrimitivesAttributes();
    assert.equal(x.vByte, -128);
    assert.equal(x.vOctet, 255);
    assert.equal(x.vShort, -32768);
    assert.equal(x.vUnsignedShort, 65535);
    assert.equal(x.vLong, -200000);
    assert.equal(x.vUnsignedLong, 200000);
    done();
  });

  it('primitives param', done => {
    var y = new PrimitivesParam();
    assert.equal(y.addByte(-60, -60), -120);
    assert.equal(y.addOctet(60, 60), 120);
    assert.equal(y.addShort(-150, -2000), -2150);
    assert.equal(y.addUnsignedShort(200, 3000), 3200);
    assert.equal(y.addLong(-100000, -30000), -130000);
    assert.equal(y.addUnsignedLong(120000, 240000), 360000);
    assert.equal(y.show('DOMString'), 'DOMString');
    done();
  });

  it('primitives return value', done => {
    var z = new PrimitivesReturn();
    assert.equal(z.showByte(), -127);
    assert.equal(z.showOctet(), 255);
    assert.equal(z.showShort(), -32768);
    assert.equal(z.showUnsignedShort(), 65535);
    assert.equal(z.showLong(), -1234567);
    assert.equal(z.showUnsignedLong(), 1234567);
    assert.equal(z.showDOMString(), 'DOMString');
    done();
  });
});
