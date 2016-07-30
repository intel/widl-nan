// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

'use strict';

/* global describe, it */
var assert = require('assert');
var buildAddon = require('../lib/addon-builder.js').buildAddon;
var compile = require('../lib/compile.js').compile;
var path = require('path');
var testConstAttribute = require('./property.js').testConstAttribute;

var Util;

describe('widl-nan Unit Test - const attributes', function() {
  it('Generating binding C++ code', function() {
    return compile('test/const/const.widl', 'test/const/gen');
  });

  it('Building addon', function() {
    // building addon maybe slow
    this.timeout(100000);

    return buildAddon('test/const');
  });

  it('Loading addon', function() {
    var addonDir = path.join(path.dirname(__filename), 'const');
    var addon = require('bindings')(
        // eslint-disable-next-line camelcase
        {bindings: 'testerAddon', module_root: addonDir});
    Util = addon.Util;
    assert.equal(typeof Util, 'function');
  });

  it('const attributes', done => {
    testConstAttribute(Util, 'DEBUG', false);
    testConstAttribute(Util, 'LF', 10);
    testConstAttribute(Util, 'BIT_MASK', 0x0000fc00);
    testConstAttribute(Util, 'AVOGADRO', 6.875e1);
    done();
  });
});
