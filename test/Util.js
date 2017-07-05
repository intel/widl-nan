// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

'use strict';

var Path = require('path');
var Fs = require('fs');
var Crypto = require('crypto');
var Rimraf = require('rimraf');

function Util() {}

Util.prototype.ensureTestRoot =
function() {
  var rootPath = Path.join(__dirname, '..', 'test-tmp');
  rootPath = Path.normalize(rootPath);
  if (!this.isDir(rootPath)) {
    Fs.mkdirSync(rootPath);
  }
  if (this.isDir(rootPath)) {
    return rootPath;
  }
  return null;
};

Util.prototype.isFile =
function(dir) {
  try {
    if (Fs.statSync(dir).isFile()) {
      return true;
    }
  } catch (e) {
    return false;
  }
};

Util.prototype.isDir =
function(dir) {
  try {
    if (Fs.statSync(dir).isDirectory()) {
      return true;
    }
  } catch (e) {
    return false;
  }
};

Util.prototype.createTmpDir =
function() {
  var tmpDir = null;
  var rootPath = this.ensureTestRoot();
  if (rootPath) {
    var tmpDirName = Crypto.randomBytes(5).toString('hex');
    tmpDir = rootPath + Path.sep + tmpDirName;
    if (this.isDir(tmpDir)) {
      Rimraf.sync(tmpDir);
    }
    Fs.mkdirSync(tmpDir);
  }
  return tmpDir;
};

module.exports = new Util();
