// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

'use strict';

/* global describe, it */
var assert = require('assert');
var buildAddon = require('../lib/addon-builder.js').buildAddon;
var compile = require('../lib/compile.js').compile;
var path = require('path');

var Point = null;
var Line = null;

describe('widl-nan Unit Test - static attribute/method', function() {
  it('Generating binding C++ code', function() {
    return compile('test/static-member/static-member.widl', 'test/static-member/gen');
  });

  it('Building addon', function() {
    // building addon maybe slow
    this.timeout(100000);

    return buildAddon('test/static-member');
  });

  it('Loading addon', function() {
    var addonDir = path.join(path.dirname(__filename), 'static-member');
    var addon = require('bindings')(
        // eslint-disable-next-line camelcase
        {bindings: 'widlNanAddon', module_root: addonDir});
    Point = addon.Point;
    assert.equal(typeof Point, 'function');
    Line = addon.Line;
    assert.equal(typeof Line, 'function');
  });

  it('Test static method', done => {
    var x = new Line();
    assert.equal(typeof x.intersectionPoint, 'undefined');
    assert.equal(typeof Line.prototype.intersectionPoint, 'undefined');
    assert.equal(typeof Line.intersectionPoint, 'function');
    // eslint-disable-next-line new-cap
    var pt = Line.intersectionPoint(Line(0, 0, 200, 0), Line(120, 20, 120, -20));
    assert(pt instanceof Point);
    assert.equal(pt.x, 120);
    assert.equal(pt.y, 0);
    done();
  });

  it('Test static attribute', done => {
    var x = new Line();
    assert.equal(typeof x.pointsInALine, 'undefined');
    assert.equal(typeof Line.prototype.pointsInALine, 'undefined');
    assert.equal(typeof Line.pointsInALine, 'number');
    assert.equal(Line.pointsInALine, 2);
    Line.whateverPoint.x = 1989;
    Line.whateverPoint.y = 2016;
    assert.equal(Line.whateverPoint.x, 1989);
    assert.equal(Line.whateverPoint.y, 2016);
    done();
  });
});
