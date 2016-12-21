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

function bufToString(array) {
  return String.fromCharCode.apply(null, array);
}

function stringToArrayBuffer(str) {
  var buf = new ArrayBuffer(str.length);
  var bufView = new Uint8Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; ++i) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

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
    assert.equal(obj.shortArray.length, 512);
    assert.equal(obj.longArray.length, 256);

    var str = '0123456789AB';
    var arrayBuf = stringToArrayBuffer(str);
    var view1 = new Uint32Array(arrayBuf);
    obj.longArray = view1;
    assert.equal(obj.longArray.length, view1.length);
    var view2 = new Uint16Array(arrayBuf);
    obj.shortArray = view2;
    assert.equal(obj.shortArray.length, view2.length);

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

  it('Test TypedArray as parameter', done => {
    var str = 'the quick brown fox jumps over the lazy dog!';
    var arrayBuf = stringToArrayBuffer(str);
    var view = new Uint8Array(arrayBuf);
    var obj = new FakeImage();
    obj.setUint8Array(view);
    assert.equal(bufToString(obj.asUint8Array()), str);
    done();
  });
});
