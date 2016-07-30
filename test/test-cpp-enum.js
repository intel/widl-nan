// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

'use strict';

/* global describe, it */

var assert = require('assert');
var compile = require('../lib/compile.js').compile;
var buildAddon = require('../lib/addon-builder.js').buildAddon;
var path = require('path');
var testNoConstructor = require('./constructor.js').testNoConstructor;
var testEnumProperty = require('./property.js').testEnumProperty;

var ordinal;
var number;
/* eslint-disable camelcase */
var another_number;
var yet_another_number;
/* eslint-enable camelcase */

describe('widl-nan Unit Test - C++ header enum', function() {
  it('Generating binding C++ code', function() {
    return compile('test/cpp_header_enum/cpp_header.h', 'test/cpp_header_enum/gen');
  });

  it('Building addon', function() {
    // building addon maybe slow
    this.timeout(100000);

    return buildAddon('test/cpp_header_enum');
  });

  it('Loading addon', function() {
    var addonDir = path.join(path.dirname(__filename), 'cpp_header_enum');
    var addon = require('bindings')(
        // eslint-disable-next-line camelcase
        {bindings: 'testerAddon', module_root: addonDir});

    ordinal = addon.ordinal;
    number = addon.number;
    /* eslint-disable camelcase */
    another_number = addon.another_number;
    yet_another_number = addon.yet_another_number;
    /* eslint-enable camelcase */

    assert.equal(typeof ordinal, 'function');
    assert.equal(typeof number, 'function');
    /* eslint-disable camelcase */
    assert.equal(typeof another_number, 'function');
    assert.equal(typeof yet_another_number, 'function');
    /* eslint-enable camelcase */
  });

  it('C++ enum test: no constructor', () => {
    return Promise.all([
      testNoConstructor(ordinal),
      testNoConstructor(number),
      /* eslint-disable camelcase */
      testNoConstructor(another_number),
      testNoConstructor(yet_another_number)
      /* eslint-enable camelcase */
    ]);
  });

  it('C++ enum value test for: enum ordinal {};', done => {
    testEnumProperty(ordinal, 'first', 1);
    testEnumProperty(ordinal, 'second', 2);
    testEnumProperty(ordinal, 'third', 3);
    testEnumProperty(ordinal, 'fourth', 4);
    testEnumProperty(ordinal, 'last', 10);
    done();
  });

  it('C++ enum value test for: enum number {};', done => {
    testEnumProperty(number, 'one', 1);
    testEnumProperty(number, 'two', 2);
    testEnumProperty(number, 'three', 3);
    testEnumProperty(number, 'four', 4);
    testEnumProperty(number, 'hundred', 100);
    testEnumProperty(number, 'thousand', 1000);
    done();
  });

  /* eslint-disable camelcase */
  it('C++ enum value test for: typedef enum {} another_number;', done => {
    testEnumProperty(another_number, 'one', 1);
    testEnumProperty(another_number, 'two', 2);
    testEnumProperty(another_number, 'three', 3);
    testEnumProperty(another_number, 'four', 4);
    testEnumProperty(another_number, 'hundred', 100);
    testEnumProperty(another_number, 'thousand', 1000);
    done();
  });

  it('C++ enum value test for: typedef enum _yet_another_number {} yet_another_number;', done => {
    testEnumProperty(yet_another_number, 'one', 1);
    testEnumProperty(yet_another_number, 'two', 2);
    testEnumProperty(yet_another_number, 'three', 3);
    testEnumProperty(yet_another_number, 'four', 4);
    testEnumProperty(yet_another_number, 'hundred', 100);
    testEnumProperty(yet_another_number, 'thousand', 1000);
    done();
  });
  /* eslint-enable camelcase */
});
