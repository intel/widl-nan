#!/usr/bin/env node

// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

'use strict';

var cli = require('cli');
var fs = require('fs');
var fsExtra = require('fs-extra');
var glob = require('glob');
var mkdirp = require('mkdirp');
var path = require('path');
var rimraf = require('rimraf');

var compile = require('../lib/compile.js').compile;

cli.parse({
  clean: ['c', 'Cleanup generated codes', 'bool', false],
  dest: ['d', 'Destination directory of generated C++ code', 'path', '.'],
  init: ['i', 'Init workspace with impl and projecct files', 'bool', false],
  override: ['o', 'Allow override impl files unconditionally', 'bool', false],
  verbose: ['v', 'Show verbose message', 'bool', false]
});

cli.main((args, options) => {
  // Valid the destination, try to create it if not exists
  try {
    var st = fs.statSync(options.dest);
    if (!st.isDirectory()) {
      cli.error(options.dest + 'exsits but not a directory');
      process.exit(1);
    }
  } catch (e) {
    if (options.verbose) cli.debug(e.message);
    try {
      mkdirp.sync(options.dest);
    } catch (e) {
      cli.error(options.dest + 'exsits but not a directory');
      process.exit(1);
    }
  }

  if (options.clean) cleanUp(options);
  if (options.init) initWorkspace(options);

  // Validate the WIDL files
  // To support wildcard matching
  var widlFiles = args;
  for (var f of args) {
    try {
      if (!fs.statSync(f).isFile()) {
        cli.error(f + ' is not a file');
      }
    } catch (e) {
      cli.error(e.message);
      process.exit(1);
    }
  }

  if (widlFiles.length === 0) {
    cli.error('Need specify WebIDL files as input.');
    process.exit(1);
  }

  var genDir = path.join(options.dest, 'gen');
  cli.info('Generating C++ code under ' + genDir + ' by parsing Web IDL files: ' + widlFiles);
  compile(widlFiles, genDir);
});

function initWorkspace(options) {
  var files = glob.sync(path.join(options.dest, 'gen', 'dont-build', '*'));

  for (var f of files) {
    var destFile = path.join(options.dest, path.basename(f));
    if (_isFileExist(destFile) && !options.override) {
      cli.info('File ' + destFile + ' already exists, append --override/-o to override');
      continue;
    }
    fsExtra.copySync(f, destFile);
    cli.info('File ' + destFile + ' copied.');
  }

  // Replace addon name described in package.json
  var config = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  var bindingGyp = path.join(options.dest, 'binding.gyp');
  var content = fs.readFileSync(bindingGyp, 'utf8').replace(/widlNanAddon/g, config.name);
  fs.writeFileSync(bindingGyp, content, 'utf8');

  cli.ok('Init workspace sucessfully. You can now run \'node-gyp rebuild\' under ' + options.dest);
  process.exit(0);
}

function cleanUp(options) {
  var d = path.join(options.dest, 'gen');
  try {
    var st = fs.statSync(d);
    if (!st.isDirectory()) {
      cli.info(options.dest + 'exsits but not a directory');
      process.exit(1);
    }
  } catch (e) {
    if (options.verbose) cli.debug(e.message);
    process.exit(1);
  }

  rimraf.sync(d);
  cli.ok('Dir ' + d + ' is removed');
  process.exit(0);
}

function _isFileExist(f) {
  try {
    return fs.statSync(f).isFile();
  } catch (e) {
    return false;
  }
}
