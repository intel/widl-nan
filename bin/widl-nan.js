#!/usr/bin/env node

// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

'use strict';

var fs = require('fs');
var fsExtra = require('fs-extra');
var glob = require('glob');
var mkdirp = require('mkdirp');
var log = require('npmlog');
var path = require('path');
var program = require('commander');
var rimraf = require('rimraf');

var compile = require('../lib/compile.js').compile;

var verbose = process.env.WIDL_NAN_VERBOSE || false;

program
  .version('0.0.1')
  .usage('[optinos] [widl] [widl...]')
  .option('-c, --clean', 'Cleanup generated codes')
  .option('-d, --dest [dir]', 'Destination directory of generated C++ code', '.')
  .option('-i, --init', 'Init workspace with impl and projecct files')
  .option('-o, --override', 'Allow override impl files unconditionally')
  .parse(process.argv);

// Valid the destination, try to create it if not exists
try {
  var st = fs.statSync(program.dest);
  if (!st.isDirectory()) {
    log.error(program.dest + ' exsits but not a directory');
    process.exit(1);
  }
} catch (e) {
  if (verbose) log.verbose(e.message);
  try {
    mkdirp.sync(program.dest);
  } catch (e1) {
    log.error(e1.message);
    process.exit(1);
  }
}

if (program.clean) cleanUp();
if (program.init) initWorkspace();

// Validate the WIDL files
// To support wildcard matching
for (var f of program.args) {
  try {
    if (!fs.statSync(f).isFile()) {
      log.info(f + ' is not a file');
    }
  } catch (e) {
    log.error(e.message);
    process.exit(1);
  }
}

if (program.args.length === 0) {
  log.error('Need specify WebIDL files as input.');
  process.exit(1);
}

var genDir = path.join(program.dest, 'gen');
log.info('Generating C++ code under ' + genDir + ' by parsing Web IDL files: ' + program.args);
compile(program.args, genDir);


function initWorkspace() {
  var files = glob.sync(path.join(program.dest, 'gen', 'dont-build', '*'));

  for (var f of files) {
    var destFile = path.join(program.dest, path.basename(f));
    if (_isFileExist(destFile) && !program.override) {
      log.info('File ' + destFile + ' already exists, append --override/-o to override');
      continue;
    }
    fsExtra.copySync(f, destFile);
    log.info('File ' + destFile + ' copied.');
  }

  // Replace addon name described in package.json
  var config = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  var bindingGyp = path.join(program.dest, 'binding.gyp');
  var content = fs.readFileSync(bindingGyp, 'utf8').replace(/widlNanAddon/g, config.name);
  fs.writeFileSync(bindingGyp, content, 'utf8');

  log.info('Init workspace sucessfully. You can now run \'node-gyp rebuild\' under ' + program.dest);
  process.exit(0);
}

function cleanUp() {
  var d = path.join(program.dest, 'gen');
  try {
    var st = fs.statSync(d);
    if (!st.isDirectory()) {
      log.error(program.dest + ' exsits but not a directory');
      process.exit(1);
    }
  } catch (e) {
    log.error(e.message);
    process.exit(1);
  }

  rimraf.sync(d);
  log.info('Dir ' + d + ' is removed');
  process.exit(0);
}

function _isFileExist(f) {
  try {
    return fs.statSync(f).isFile();
  } catch (e) {
    return false;
  }
}
