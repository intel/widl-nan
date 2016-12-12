// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

'use strict';

/* global describe, it */
var assert = require('assert');
var buildAddon = require('../lib/addon-builder.js').buildAddon;
var compile = require('../lib/compile.js').compile;
var path = require('path');

var FakeImage = null;

describe('widl-nan Unit Test - sequence<T> as Array', function() {
  it('Generating binding C++ code', function() {
    return compile('test/typedarray/typedarray.widl', 'test/typedarray/gen');
  });

  it('Building addon', function() {
    // building addon maybe slow
    this.timeout(100000);

    return buildAddon('test/typedarray');
  });

  it('Loading addon', function() {
    var addonDir = path.join(path.dirname(__filename), 'typedarray');
    var addon = require('bindings')(
        // eslint-disable-next-line camelcase
        {bindings: 'widlNanAddon', module_root: addonDir});
    FakeImage = addon.FakeImage;
    assert.equal(typeof FakeImage, 'function');
  });

  it('Test TypedArray as property', done => {
    var obj = new FakeImage();
    assert(obj.rawBuffer instanceof Uint8Array);
    assert.equal(obj.rawBuffer.length, obj.length);
    done();
  });

  it('Test TypedArray as method', done => {
    var obj = new FakeImage();

    assert(obj.asInt8Array() instanceof Int8Array);
    assert.equal(obj.asInt8Array().length, obj.length);
    assert(obj.asUint8Array() instanceof Uint8Array);
    assert.equal(obj.asUint8Array().length, obj.length);

    assert(obj.asInt16Array() instanceof Int16Array);
    assert.equal(obj.asInt16Array().length, obj.length / 2);
    assert(obj.asUint16Array() instanceof Uint16Array);
    assert.equal(obj.asUint16Array().length, obj.length / 2);

    assert(obj.asInt32Array() instanceof Int32Array);
    assert.equal(obj.asInt32Array().length, obj.length / 4);
    assert(obj.asUint32Array() instanceof Uint32Array);
    assert.equal(obj.asUint32Array().length, obj.length / 4);

    assert(obj.asFloat32Array() instanceof Float32Array);
    assert.equal(obj.asFloat32Array().length, obj.length / 4);
    assert(obj.asFloat64Array() instanceof Float64Array);
    assert.equal(obj.asFloat64Array().length, obj.length / 8);

    done();
  });

  it('Test TypedArray as static method and empty TypedArray', done => {
    var array = FakeImage.getStaticArray();
    assert(array instanceof Float32Array);
    assert.equal(array.length, 0);
    done();
  });

  it('Test TypedArray read/write', done => {
    var obj = new FakeImage();
    var array = obj.asUint8Array();
    array[874] = 64;
    assert.equal(64, obj.getData(874));

    obj.setData(874, 233);
    assert.equal(array[874], 233);
    done();
  });
});
