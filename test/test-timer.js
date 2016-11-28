// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

'use strict';

/* global describe, it */
var assert = require('assert');
var buildAddon = require('../lib/addon-builder.js').buildAddon;
var compile = require('../lib/compile.js').compile;
var path = require('path');

var TimerTester = null;

describe('widl-nan Unit Test - IDL timer', function() {
  it('Generating binding C++ code', function() {
    return compile('test/timer/timer.widl', 'test/timer/gen');
  });

  it('Building addon', function() {
    // building addon maybe slow
    this.timeout(100000);

    return buildAddon('test/timer');
  });

  it('Loading addon', function() {
    var addonDir = path.join(path.dirname(__filename), 'timer');
    var addon = require('bindings')(
        // eslint-disable-next-line camelcase
        {bindings: 'widlNanAddon', module_root: addonDir});
    TimerTester = addon.TimerTester;
    assert.equal(typeof TimerTester, 'function');
  });

  it('Test startDelayedTask() method using WIDLNANTimerHelper', () => {
    var x = new TimerTester();
    x.taskCounter = 1000;
    assert.equal(x.taskCounter, 1000);
    var p = x.startDelayedTask(10);
    assert(p instanceof Promise);
    return new Promise(function(resolve, reject) {
      p.then(function() {
        assert.equal(x.taskCounter, 0);
        resolve();
      });
    });
  });

  it('Test startRegularTask() method using WIDLNANTimerHelper', () => {
    var x = new TimerTester();
    x.taskCounter = 1000;
    assert.equal(x.taskCounter, 1000);
    x.startRegularTask(10, 64);

    return new Promise(function(resolve, reject) {
      var timer = setInterval(function() {
        if (x.taskCounter >= 64) {
          clearInterval(timer);
          resolve();
        }
      }, 10);
    });
  });
});
