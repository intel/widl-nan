// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

'use strict';

/* global describe, it */
var assert = require('assert');
var buildAddon = require('../lib/addon-builder.js').buildAddon;
var compile = require('../lib/compile.js').compile;
var path = require('path');

var MyClass = null;
var MyClass2 = null;
var NoConstructorClass = null;
var ContainerClass = null;

describe('widl-nan Unit Test - Constructor', function() {
  it('Generating binding C++ code', function() {
    return compile('test/constructor/constructor.widl', 'test/constructor/gen');
  });

  it('Building addon', function() {
    // building addon maybe slow
    this.timeout(100000);

    return buildAddon('test/constructor');
  });

  it('Loading addon', function() {
    var addonDir = path.join(path.dirname(__filename), 'constructor');
    var addon = require('bindings')(
        // eslint-disable-next-line camelcase
        {bindings: 'widlNanAddon', module_root: addonDir});
    MyClass = addon.MyClass;
    MyClass2 = addon.MyClass2;
    assert.equal(typeof MyClass, 'function');

    NoConstructorClass = addon.NoConstructorClass;
    assert.equal(typeof NoConstructorClass, 'function');

    ContainerClass = addon.ContainerClass;
    assert.equal(typeof ContainerClass, 'function');
  });

  it('Test default constructor', done => {
    var x = new MyClass();
    assert.equal(x.url, '');
    assert.equal(x.radius, 0);
    done();
  });

  it('Test constructor with 1 parameter', done => {
    var x = new MyClass(64);
    assert.equal(x.url, '');
    assert.equal(x.radius, 64);
    done();
  });

  it('Test only has one constructor with 1 parameter', done => {
    var x = new MyClass2(100);
    assert.equal(x.value, 100);
    done();
  });

  it('Test constructor with 2 parameters', done => {
    var x = new MyClass('https', 1989);
    assert.equal(x.url, 'https');
    assert.equal(x.radius, 1989);
    done();
  });

  it('Test no constructor', () => {
    return assert.throws(function() {
      var x = new NoConstructorClass();
      x.foo = '1';
    }, function(e) {
      if (e instanceof TypeError && /constructor/.test(e)) {
        return true;
      }
    }, 'Unexpected error');
  });

  it('Test constructor with 1 object parameter', done => {
    var x = new MyClass('google.com', 3128);
    var y = new ContainerClass(x);
    assert.equal(y.embedded.url, 'google.com');
    assert.equal(y.embedded.radius, 3128);
    done();
  });

  it('Test object of a no constructor class', done => {
    var x = new ContainerClass();
    var obj = x.createNoConstructorClassObject();
    obj.counter = 12355;
    assert.equal(obj.counter, 12355);

    done();
  });
});
