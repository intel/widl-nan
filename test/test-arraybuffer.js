// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

'use strict';

/* global describe, it */
var assert = require('assert');
var buildAddon = require('../lib/addon-builder.js').buildAddon;
var compile = require('../lib/compile.js').compile;
var path = require('path');

var Buffer;

function bufToString(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

function stringToArrayBuffer(str) {
  var buf = new ArrayBuffer(str.length);
  var bufView = new Uint8Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; ++i) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

describe('widl-nan Unit Test - Buffer', function() {
  it('Generating binding C++ code', function() {
    return compile([
      'test/arraybuffer/arraybuffer.widl'
    ], 'test/arraybuffer/gen');
  });

  it('Building addon', function() {
    // building addon maybe slow
    this.timeout(100000);

    return buildAddon('test/arraybuffer');
  });

  it('Loading addon', function() {
    var addonDir = path.join(path.dirname(__filename), 'arraybuffer');
    var addon = require('bindings')(
        // eslint-disable-next-line camelcase
        {bindings: 'testerAddon', module_root: addonDir});

    Buffer = addon.Buffer;
    assert.equal(typeof Buffer, 'function');
  });

  it('Method returning an ArrayBuffer', done => {
    var buf = new Buffer();
    assert.equal(bufToString(buf.getArrayBuffer()), 'hello world!');
    done();
  });

  it('Static method returning an ArrayBuffer', done => {
    assert.equal(bufToString(Buffer.getCommonData()), 'static buffer test data');
    assert.equal(bufToString(Buffer.getCommonData()), 'static buffer test data');
    assert.equal(bufToString(Buffer.getCommonData()), 'static buffer test data');
    done();
  });

  it('Object property as ArrayBuffer', done => {
    var buf = new Buffer();
    assert.equal(bufToString(buf.data), 'hello world!');
    buf.data = stringToArrayBuffer('hello universe!');
    assert.equal(bufToString(buf.data), 'hello universe!');
    done();
  });

  it('Passing ArrayBuffer as paramter', done => {
    var buf = new Buffer();
    const buffer = stringToArrayBuffer('Array buffer string test...');
    assert.equal(buf.buffer2String(buffer), 'Array buffer string test...');
    done();
  });
});
