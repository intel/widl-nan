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
      flags: 1860,
      others: {switch: true}
    });

    done();
  });

  it('Test PaintOptions as attribute', done => {
    var x = new Painter();
    x.drawText('&Menu', {
      offset: new Point(10, 20),
      color: 'red',
      flags: 1860,
      others: {switch: true}
    });

    var option = x.options;
    assert.equal(option.offset.x, 10);
    assert.equal(option.offset.y, 20);
    assert.equal(option.color, 'red');
    assert.equal(option.flags, 1860);
    assert.equal(option.others.switch, true);

    done();
  });

  it('Test PaintOptions as return value', done => {
    var x = new Painter();
    x.drawText('&Menu', {
      offset: new Point(10, 20),
      color: 'red',
      flags: 1860,
      others: {switch: true}
    });

    var option = x.getFactoryOptions();
    assert.equal(option.offset.x, 10);
    assert.equal(option.offset.y, 20);
    assert.equal(option.color, 'red');
    assert.equal(option.flags, 1860);
    assert.equal(option.others.switch, true);

    done();
  });

  it('Test Array member in Dictionary', done => {
    var painter = new Painter();
    painter.drawPolygon({transformMatrix: [1.0, 2.0, 3.5, 4.75]});
    var dic = painter.getLastPolygonDrawOption();
    assert.equal(dic.transformMatrix[0], 1.0);
    assert.equal(dic.transformMatrix[1], 2.0);
    assert.equal(dic.transformMatrix[2], 3.5);
    assert.equal(dic.transformMatrix[3], 4.75);

    painter.drawPolygon({
      transformMatrix: [8.0, 7.0, 9.5, 12.75],
      polygon: [new Point(1, 2), new Point(3, 75), new Point(89, 64)],
      color: 'yellow'
    });
    dic = painter.getLastPolygonDrawOption();
    assert.equal(dic.transformMatrix[0], 8.0);
    assert.equal(dic.transformMatrix[1], 7.0);
    assert.equal(dic.transformMatrix[2], 9.5);
    assert.equal(dic.transformMatrix[3], 12.75);
    assert.equal(dic.color, 'yellow');
    assert.equal(dic.polygon[0].x, 1);
    assert.equal(dic.polygon[0].x, 1);
    assert.equal(dic.polygon[1].x, 3);
    assert.equal(dic.polygon[1].y, 75);
    assert.equal(dic.polygon[2].x, 89);
    assert.equal(dic.polygon[2].y, 64);

    done();
  });
});
