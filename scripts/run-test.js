// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

const glob = require('glob');
const path = require('path');
const spawn = require('child_process').spawn;
const log = require('npmlog');
/* eslint-disable no-restricted-modules */
const colors = require('colors');
/* eslint-enable no-restricted-modules */

const scanDir = 'test';

var verbose = process.env.WIDL_NAN_VERBOSE || false;

function runSingleTest(fileName) {
  return new Promise(function(resolve, reject) {
    var buildProc = spawn('mocha', ['--no-timeouts', fileName]);

    var logCache = null;

    buildProc.stdout.on('data', function(data) {
      logCache += data.toString();
      if (verbose) log.info(data.toString());
    });

    buildProc.stderr.on('data', function(data) {
      logCache += data.toString();
      if (verbose) log.info(data.toString());
    });

    buildProc.on('exit', function(code) {
      if (verbose) log.info('node-gyp process exited with code ' + code);

      if (code !== 0) {
        if (logCache && !verbose) console.log(logCache);
        process.exit(code);
      }

      if (code === 0) {
        resolve(code);
      } else {
        reject(-1);
      }
    });
  });
}

glob(path.join(scanDir, 'test-*.js'), /* options, */ function(err, files) {
  if (err) {
    process.exit(89);
  }

  var promises = [];
  files.forEach(fileName => {
    promises.push(runSingleTest(fileName));
  });

  Promise.all(promises).then(function() {
    console.log(`All ${colors.green('green')} with ${colors.yellow(String(files.length))} suites.`);
    process.exit(0); // make it return zero explicitly
  }).catch(err => {
    console.log(err);
    process.exit(64);
  });
});
