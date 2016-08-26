// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

'use strict';

/* global describe, it */
var assert = require('assert');
var buildAddon = require('../lib/addon-builder.js').buildAddon;
var compile = require('../lib/compile.js').compile;
var path = require('path');

var ComputingDeviceNetwork = null;

describe('widl-nan Unit Test - IDL dictionary', function() {
  it('Generating binding C++ code', function() {
    return compile('test/dictionary-enum/dictionary-enum.widl', 'test/dictionary-enum/gen');
  });

  it('Building addon', function() {
    // building addon maybe slow
    this.timeout(100000);

    return buildAddon('test/dictionary-enum');
  });

  it('Loading addon', function() {
    var addonDir = path.join(path.dirname(__filename), 'dictionary-enum');
    var addon = require('bindings')(
        // eslint-disable-next-line camelcase
        {bindings: 'widlNanAddon', module_root: addonDir});
    ComputingDeviceNetwork = addon.ComputingDeviceNetwork;
    assert.equal(typeof ComputingDeviceNetwork, 'function');
  });

  it('Test dictionary containing a member with an enum type', done => {
    var x = new ComputingDeviceNetwork();
    x.addNode({
      name: 'foo',
      quantity: 1.0,
      type: 'desktop'
    });

    assert.equal(x.name, 'foo');
    assert.equal(x.type, 'desktop');
    assert.equal(x.quantity, 1.0);

    var d = x.getLastNode();

    assert.equal(d.name, 'foo');
    assert.equal(d.type, 'desktop');
    assert.equal(d.quantity, 1.0);

    done();
  });
});
