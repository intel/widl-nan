// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

'use strict';

/* global describe, it */
var assert = require('assert');
var buildAddon = require('../lib/addon-builder.js').buildAddon;
var compile = require('../lib/compile.js').compile;
var path = require('path');

var BufferTest;

describe('widl-nan Unit Test - Buffer', function() {
  it('Generating binding C++ code', function() {
    return compile([
      'test/buffer/buffer.widl'
    ], 'test/buffer/gen');
  });

  it('Building addon', function() {
    // building addon maybe slow
    this.timeout(100000);

    return buildAddon('test/buffer');
  });

  it('Loading addon', function() {
    var addonDir = path.join(path.dirname(__filename), 'buffer');
    var addon = require('bindings')(
        // eslint-disable-next-line camelcase
        {bindings: 'testerAddon', module_root: addonDir});

    BufferTest = addon.Buffer;
    assert.equal(typeof BufferTest, 'function');
  });

  it('Method returning an ArrayBuffer', done => {
    var bufferTest = new BufferTest();
    assert.equal(bufferTest.getArrayBuffer().toString(), "hello world!");
    done();
  });
});
