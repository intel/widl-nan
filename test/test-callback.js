// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

'use strict';

/* global describe, it */
var assert = require('assert');
var buildAddon = require('./addon-builder.js').buildAddon;
var compile = require('./compile.js').compile;
var path = require('path');

var AsyncOperations = null;

describe('widl-nan Unit Test - IDL callback', function() {
  it('Generating binding C++ code', function() {
    return compile('test/callback/callback.widl', 'test/callback/gen');
  });

  it('Building addon', function() {
    this.timeout(100000);
    return buildAddon('test/callback');
  });

  it('Loading addon', function() {
    var addonDir = path.join(path.dirname(__filename), 'callback');
    var addon = require('bindings')(
        // eslint-disable-next-line camelcase
        {bindings: 'testerAddon', module_root: addonDir});
    AsyncOperations = addon.AsyncOperations;
    assert.equal(typeof AsyncOperations, 'function');
  });

  it('AsyncOperations.performOperation callback', () => {
    var x = new AsyncOperations();
    return new Promise(function(resolve, reject) {
      x.performOperation(status => {
        assert.equal(status, 'pending');
        resolve(status);
      });
    });
  });
});
