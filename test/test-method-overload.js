// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

"use strict"

var assert = require("assert"),
    gen = require("..").generator,
    path = require("path"),
    buildAddon = require("./addon-builder.js").buildAddon,
    testNoConstructor = require("./constructor.js").testNoConstructor,
    testEnumProperty = require("./property.js").testEnumProperty,
    spawn = require('child_process').spawn;

var B;

describe('widl-nan Unit Test - Method Overloading', function () {
  it('Generating binding C++ code', function () {
    gen.reset();
    return Promise.all([
      gen.addFile('test/method_overload/method_overload.widl')
      ]).then(function () {
        gen.compile();
        gen.writeToDir('test/method_overload/gen');
      }).catch(e => {
        console.log(e);
        throw e;
      });
  });

  it('Building addon', function () {
    // building addon maybe slow
    this.timeout(100000);

    return buildAddon('test/method_overload');
  });

  it('Loading addon', function () {
    var addonDir = path.join(path.dirname(__filename), 'method_overload');
    var addon = require('bindings')(
        {'bindings': 'testerAddon', 'module_root': addonDir});
    // TODO: Detect errors

    B = addon.B;
    assert.equal(typeof B, 'function');
  });

  it('Overloading resolution', done => {
    var x = new B();
    assert.equal(x.f('str'), 'method1');
    assert.equal(x.f(15, 3.14), 'method2');
    assert.equal(x.f(6.28, 'str'), 'method3');
    done();
  });

});
