// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

'use strict';

/* global describe, it */
var assert = require('assert');
var buildAddon = require('../lib/addon-builder.js').buildAddon;
var compile = require('../lib/compile.js').compile;
var path = require('path');

var Canvas = null;
var Point = null;
describe('widl-nan Unit Test - sequence<T> as Array', function() {
  it('Generating binding C++ code', function() {
    return compile('test/array/array.widl', 'test/array/gen');
  });

  it('Building addon', function() {
    // building addon maybe slow
    this.timeout(100000);

    return buildAddon('test/array');
  });

  it('Loading addon', function() {
    var addonDir = path.join(path.dirname(__filename), 'array');
    var addon = require('bindings')(
        // eslint-disable-next-line camelcase
        {bindings: 'widlNanAddon', module_root: addonDir});
    Canvas = addon.Canvas;
    Point = addon.Point;
    assert.equal(typeof Canvas, 'function');
  });

  it('Test array as property', done => {
    var x = new Canvas();

    x.coordinates = [1.0, 2.0, 3.0, 4.5, 19.75];

    assert.equal(x.coordinates[0], 1.0);
    assert.equal(x.coordinates[1], 2.0);
    assert.equal(x.coordinates[2], 3.0);
    assert.equal(x.coordinates[3], 4.5);
    assert.equal(x.coordinates[4], 19.75);

    assert.equal(x.codecs[0], 'jpg'); // See canvas.cpp for expected values
    assert.equal(x.codecs[1], 'png');
    assert.equal(x.codecs[2], 'tif');
    assert.equal(x.codecs[3], 'gif');

    var p1 = new Point();
    var p2 = new Point();
    p1.x = 1;
    p1.y = 2;
    p2.x = 2;
    p2.y = 3;
    x.points = [];
    x.points.push(p1);
    x.points.push(p2);

    assert.equal(x.points.length, 2);
    assert.equal(x.points[0].x, 1);
    assert.equal(x.points[0].y, 2);
    assert.equal(x.points[1].x, 2);
    assert.equal(x.points[1].y, 3);

    done();
  });

  it('Test array as method return value', done => {
    var x = new Canvas();
    var array = x.getSupportedImageCodecs();

    assert.equal(array[0], 'jpg'); // See canvas.cpp for expected values
    assert.equal(array[1], 'png');
    assert.equal(array[2], 'tif');
    assert.equal(array[3], 'gif');

    var points = x.getInternalPoints();
    assert.equal(points.length, 2);
    assert.equal(points[0].x, 1);
    assert.equal(points[0].y, 1);
    assert.equal(points[1].x, 2);
    assert.equal(points[1].y, 2);

    done();
  });

  it('Test array as an argument', done => {
    var x = new Canvas();
    var paramArray = [0.5, 0.75, 1.00, 20, 38];

    x.drawPolygon(paramArray);
    var array = x.getLastDrawnPolygon();

    assert.equal(array[0], 0.5);
    assert.equal(array[1], 0.75);
    assert.equal(array[2], 1.00);
    assert.equal(array[3], 20);
    assert.equal(array[4], 38);

    done();
  });
});
