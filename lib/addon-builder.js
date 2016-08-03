// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

'use strict';

const spawn = require('child_process').spawn;
var log = require('npmlog');

var verbose = process.env.WIDL_NAN_VERBOSE || false;

function buildAddon(workingDir, done) {
  return new Promise((resolve, reject) => {
    var buildProc = spawn('node-gyp', ['rebuild'], {cwd: workingDir});

    buildProc.stdout.on('data', function(data) {
      if (verbose) log.info(data.toString());
    });

    buildProc.stderr.on('data', function(data) {
      if (verbose) log.info(data.toString());
    });

    buildProc.on('exit', function(code) {
      if (verbose) log.info('node-gyp process exited with code ' + code);
      resolve(code);
    });
  });
}

module.exports = {
  buildAddon: buildAddon
};
