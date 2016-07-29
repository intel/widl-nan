// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

'use strict';

var gen = require('..').generator;
var path = require('path');

function compileWIDLOrCxxHeader(array, targetDir) {
  if (!Array.isArray(array)) {
    array = [array];
  }

  gen.reset();

  var promiseArray = [];
  array.forEach(file => {
    var ext = path.parse(file).ext;
    if (ext === '.widl') {
      promiseArray.push(gen.addFile(file));
    } else if (ext === '.h' || ext === '.hpp') {
      promiseArray.push(gen.addCppEnum(file));
    }
  });

  return Promise.all(promiseArray).then(function() {
    gen.compile();
    gen.writeToDir(targetDir);
  }).catch(e => {
    console.log(e);
    throw e;
  });
}

module.exports = {
  compile: compileWIDLOrCxxHeader
};
