// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

"use strict"

var assert = require("assert"),
    exec = require('child_process').exec,
    gen = require("..").generator,
    path = require("path");

var Animal = null;

describe('widl-nan Unit Test:', function () {
  describe('Attributes', function () {
    it('Generating binding C++ code', function () {
      return Promise.all([
        gen.addFile('test/attributes/attributes.widl')
        ]).then(function () {
          gen.compile();
          gen.writeToDir('test/attributes/gen');
        }).catch(e => {
          console.log(e);
          throw e;
        });
    });

    it('Building addon', function (done) {
      var cmd = 'cd test/attributes; node-gyp rebuild';
      exec(cmd, function(error, stdout, stderr) {
        // TODO: Detect errors
        done();
      })
    });

    it('Loading addon', function () {
      var addonDir = path.join(path.dirname(__filename), 'attributes');
      var addon = require('bindings')(
          {'bindings': 'testAttributes', 'module_root': addonDir});
      // TODO: Detect errors
      Animal = addon.Animal;
      assert.equal(typeof Animal, 'function');
    });

    it('Constructor w/o parameters', function () {
      var x = new Animal();
      assert.equal(typeof x.name, 'string');
      assert.equal(typeof x.age, 'number');
      assert.equal(x.name, '');
      assert.equal(x.age, 0);
    });

    it('Constructor with name', function () {
      var x = new Animal('Dog');
      assert.equal(typeof x.name, 'string');
      assert.equal(typeof x.age, 'number');

      assert.equal(x.name, 'Dog');
      assert.equal(x.age, 0);
    });

    it('Constructor with name and age', function () {
      var x = new Animal('Dog', 5);
      assert.equal(typeof x.name, 'string');
      assert.equal(typeof x.age, 'number');

      assert.equal(x.name, 'Dog');
      assert.equal(x.age, 5);
    });

    it('Readonly attribute', function () {
      var x = new Animal('StaticName');
      x.name = 'iWantToChange';

      assert.equal(x.name, 'StaticName');
      assert.equal(x.age, 0);
    });

    it('Writable attribute', function () {
      var x = new Animal();
      x.age = 10;

      assert.equal(x.name, '');
      assert.equal(x.age, 10);
    });

  });
});
