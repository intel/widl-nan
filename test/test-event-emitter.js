// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

'use strict';

/* global describe, it */
var assert = require('assert');
var buildAddon = require('../lib/addon-builder.js').buildAddon;
var compile = require('../lib/compile.js').compile;
var path = require('path');
var EventEmitter = require('events').EventEmitter;

var Meal = null;

function inherits(target, source) {
  /* eslint-disable */
  for (var k in source.prototype) {
    target.prototype[k] = source.prototype[k];
  }
  /* eslint-enable */
}

describe('widl-nan Unit Test - IDL EventEmitter', function() {
  it('Generating binding C++ code', function() {
    return compile('test/event-emitter/promise.widl', 'test/event-emitter/gen');
  });

  it('Building addon', function() {
    // building addon maybe slow
    this.timeout(100000);

    return buildAddon('test/event-emitter');
  });

  it('Loading addon', function() {
    var addonDir = path.join(path.dirname(__filename), 'event-emitter');
    var addon = require('bindings')(
        // eslint-disable-next-line camelcase
        {bindings: 'testerAddon', module_root: addonDir});
    Meal = addon.Meal;
    inherits(Meal, EventEmitter);
    assert.equal(typeof Meal, 'function');
  });

  it('Return type is a Promise', done => {
    var x = new Meal();
    x.initialize('rice', 0.5);
    assert(x.cook('tim') instanceof Promise);
    done();
  });

  it('Return type is a Promise and it can be resolved', () => {
    var x = new Meal();
    x.initialize('rice', 0.5);

    return new Promise((resolve, reject) => {
      x.cook('tim').then(() => {
        resolve();
      }).catch(e => {
        reject(e);
      });
    });
  });

  it('Return type of stop() is a Promise', done => {
    var x = new Meal();
    x.initialize('rice', 0.5);
    x.cook('tim');
    return new Promise((resolve, reject) => {
      x.stop().then(() => {
        resolve();
        done();
      }).catch(e => {
        reject(e);
      });
    });
  });

  it('Event can be emitted', () => {
    var x = new Meal();
    x.initialize('rice', 0.5);

    return new Promise((resolve, reject) => {
      x.on('microwaveding', evt => {
        resolve();
      });

      if (!(x.cook('tim') instanceof Promise)) {
        reject('return type is not Promise');
      }
    });
  });
});
