// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

'use strict';

/* global describe, it */
var assert = require('assert');
var buildAddon = require('../lib/addon-builder.js').buildAddon;
var compile = require('../lib/compile.js').compile;
var path = require('path');

var Painter = null;
var Point = null;

describe('widl-nan Unit Test - IDL dictionary', function() {
  it('Generating binding C++ code', function() {
    return compile('test/dictionary/dictionary.widl', 'test/dictionary/gen');
  });

  it('Building addon', function() {
    // building addon maybe slow
    this.timeout(100000);

    return buildAddon('test/dictionary');
  });

  it('Loading addon', function() {
    var addonDir = path.join(path.dirname(__filename), 'dictionary');
    var addon = require('bindings')(
        // eslint-disable-next-line camelcase
        {bindings: 'widlNanAddon', module_root: addonDir});
    Painter = addon.Painter;
    assert.equal(typeof Painter, 'function');
    Point = addon.Point;
    assert.equal(typeof Point, 'function');
  });

  it('Test PaintOptions as argument', done => {
    var x = new Painter();
    x.drawText('&Menu', {
      offset: new Point(10, 20),
      color: 'red',
      flags: 1860
    });

    done();
  });

  it('Test PaintOptions as attribute', done => {
    var x = new Painter();
    x.drawText('&Menu', {
      offset: new Point(10, 20),
      color: 'red',
      flags: 1860
    });

    var option = x.options;
    assert.equal(option.offset.x, 10);
    assert.equal(option.offset.y, 20);
    assert.equal(option.color, 'red');
    assert.equal(option.flags, 1860);

    done();
  });

  it('Test PaintOptions as return value', done => {
    var x = new Painter();
    x.drawText('&Menu', {
      offset: new Point(10, 20),
      color: 'red',
      flags: 1860
    });

    var option = x.getFactoryOptions();
    assert.equal(option.offset.x, 10);
    assert.equal(option.offset.y, 20);
    assert.equal(option.color, 'red');
    assert.equal(option.flags, 1860);

    done();
  });
});
