// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

"use strict"

var assert = require("assert"),
    exec = require('child_process').exec,
    gen = require("..").generator,
    path = require("path"),
    buildAddon = require("./addon-builder.js").buildAddon;

var AsyncOperations = null;

describe('widl-nan Unit Test - IDL callback', function () {
  it('Generating binding C++ code', function () {
    gen.reset();
    return Promise.all([
      gen.addFile('test/callback/callback.widl')
      ]).then(function () {
        gen.compile();
        gen.writeToDir('test/callback/gen');
      }).catch(e => {
        console.log(e);
        throw e;
      });
  });

  it('Building addon', function () {
    this.timeout(100000);
    return buildAddon('test/callback');
  });

  it('Loading addon', function () {
    var addonDir = path.join(path.dirname(__filename), 'callback');
    var addon = require('bindings')(
        {'bindings': 'testerAddon', 'module_root': addonDir});
    // TODO: Detect errors
    AsyncOperations = addon.AsyncOperations;
    assert.equal(typeof AsyncOperations, 'function');
  });

  it('AsyncOperations.performOperation callback', () => {
    var x = new AsyncOperations();
    return new Promise(function (resolve, reject) {
      x.performOperation(status => {
        assert.equal(status, 'pending');
        resolve(status);
      });
    });
  });

});
