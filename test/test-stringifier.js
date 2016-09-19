// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

'use strict';

/* global describe, it, after */
var assert = require('assert');
var buildAddon = require('../lib/addon-builder.js').buildAddon;
var compile = require('../lib/compile.js').compile;
var path = require('path');

var Student = null;
var Student2 = null;
var Student3 = null;

describe('widl-nan Unit Test - stringifier keyword usage', function() {
  it('Generating binding C++ code', function() {
    return compile('test/stringifier/stringifier.widl', 'test/stringifier/gen');
  });

  it('Building addon', function() {
    // building addon maybe slow
    this.timeout(100000);

    return buildAddon('test/stringifier');
  });

  it('Loading addon', function() {
    var addonDir = path.join(path.dirname(__filename), 'stringifier');
    var addon = require('bindings')(
        // eslint-disable-next-line camelcase
        {bindings: 'widlNanAddon', module_root: addonDir});
    Student = addon.Student;
    assert.equal(typeof Student, 'function');
    Student2 = addon.Student2;
    assert.equal(typeof Student2, 'function');
    Student3 = addon.Student3;
    assert.equal(typeof Student3, 'function');
  });

  it('Test stringifier as property', done => {
    var x = new Student();
    x.name = 'thequickbrownwhatjumpsoverthedah';
    assert.equal(x.toString(), 'thequickbrownwhatjumpsoverthedah');
    var str = '';
    str += x;
    assert.equal(str, 'thequickbrownwhatjumpsoverthedah');

    done();
  });

  it('Test stringifier as method', done => {
    var x = new Student2();
    assert.equal(x.toString(), 'C++ std::string value from Student2::ToString()');
    var str = '';
    str += x;
    assert.equal(str, 'C++ std::string value from Student2::ToString()');

    done();
  });

  it('Test stringifier as method, in short', done => {
    var x = new Student3();
    assert.equal(x.toString(), 'C++ std::string value from Student2::ToString()');
    var str = '';
    str += x;
    assert.equal(str, 'C++ std::string value from Student2::ToString()');

    done();
  });

  after(function() {
    Student = undefined;
    Student2 = undefined;
    Student3 = undefined;
  });
});
