// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

'use strict';

/* global describe, it */
var assert = require('assert');
var buildAddon = require('../lib/addon-builder.js').buildAddon;
var compile = require('../lib/compile.js').compile;
var path = require('path');

var Button;
var Circle;
var Dimensions;
var Painter;
var Point;

describe('widl-nan Unit Test - const attributes', function() {
  it('Generating binding C++ code', function() {
    return compile([
      'test/interface/param.widl',
      'test/interface/return.widl',
      'test/interface/reference.widl'
    ], 'test/interface/gen');
  });

  it('Building addon', function() {
    // building addon maybe slow
    this.timeout(100000);

    return buildAddon('test/interface');
  });

  it('Loading addon', function() {
    var addonDir = path.join(path.dirname(__filename), 'interface');
    var addon = require('bindings')(
        // eslint-disable-next-line camelcase
        {bindings: 'testerAddon', module_root: addonDir});

    Dimensions = addon.Dimensions;
    assert.equal(typeof Dimensions, 'function');

    Button = addon.Button;
    assert.equal(typeof Button, 'function');

    Painter = addon.Painter;
    assert.equal(typeof Painter, 'function');

    Circle = addon.Circle;
    assert.equal(typeof Circle, 'function');

    Point = addon.Point;
    assert.equal(typeof Point, 'function');
  });

  it('Passing an object to a method', done => {
    var b = new Button();

    b.setDimensions(1127, 3365);
    assert(b.dimensions instanceof Dimensions);
    assert.equal(b.dimensions.width, 1127);
    assert.equal(b.dimensions.height, 3365);

    var d = new Dimensions();
    d.width = 89;
    d.height = 64;
    b.setDimensions(d);
    assert(b.dimensions instanceof Dimensions);
    assert.equal(b.dimensions.width, 89);
    assert.equal(b.dimensions.height, 64);
    done();
  });

  it('Method returning an object', done => {
    var c = new Circle();
    var point = c.triangulate(new Circle(), new Circle(), new Circle());
    assert(point instanceof Point); // Returned object is a Point()
    assert.equal(point.x, 5.5);     // Mock value, see circle.cpp
    assert.equal(point.y, 18.75);   // Mock value, see circle.cpp
    done();
  });
});
