// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

"use strict";

const path = require('path');
const fs = require("fs.promised");
const mkdirp = require("mkdirp");
const glob = require("glob");
const webIDL2 = require("webidl2");
const dot = require("dot");
dot.templateSettings.strip = false; // Do not remove spaces & linebreaks
const dots = dot.process({path: path.join(__dirname, "templates")});
const enumGenerator = require('./cpp-enum.js');

function helloWorld() {
  console.log("Hello World!");
}

const _writeFile = function(name, text) {
  return fs.writeFile(name, text);
};

const _packEmptyLines = function(str) {
  return str.replace(/\n{3,}/gm, '\n\n').replace(/(\r\n){3,}/gm, '\r\n\r\n');
};

const _parseIDL = function(idlText) {
  return webIDL2.parse(idlText);
};

const _preprocessOverload = function(def) {
  var map = {};
  def.members.forEach((member, idx) => {
    if (member.type === 'operation') {
      var existing = map[member.name];
      if (existing) {
        existing.push({name: member.name, index: idx});
      } else {
        map[member.name] = [{name: member.name, index: idx}];
      }
    }
  });
  def.operationMap = map;
};

const _addOrAppend = function(param) {
  var map = param.map, key = param.key, value = param.value;
  if (map[key]) {
    var valueOrArray = map[key];
    if (Array.isArray(valueOrArray)) {
      valueOrArray.push(value);
    } else {
      map[key] = [valueOrArray, value];
    }
  } else {
    map[key] = value;
  }
};

const _preprocess = function(that) {
  var typeMap = that.typeMap;
  that.idlStore.forEach(idl => {
    idl.tree = _parseIDL(idl.text);
    idl.tree.forEach(def => {
      if (def.type == 'interface') {
        _preprocessOverload(def);
        _addOrAppend({map: typeMap, key: def.name, value: def});
      } else if (def.type === 'enum') {
        _addOrAppend({map: typeMap, key: def.name, value: def});
      } else if (def.type === 'callback') {
        _addOrAppend({map: typeMap, key: def.name, value: def});
      }
    });
  });

  that.idlStore.forEach(idl => {
    idl.tree.forEach(def => {
      def.refTypeMap = typeMap;
    });
    console.log(idl.tree);
  });
};

const _genWrapperHeaderName = function(def) {
  return 'nan__' + def.name.toLowerCase() + '.h';
};

const _genWrapperCppName = function(def) {
  return 'nan__' + def.name.toLowerCase() + '.cpp';
};

const _genImplHeaderName = function(def) {
  return def.name.toLowerCase() + '.h';
};

const _genImplCppName = function(def) {
  return def.name.toLowerCase() + '.cpp';
};

const _useImpl = function(def) {
  var constantCounter = 0;
  for (var i = 0 ; i < def.members.length ; ++ i) {
    const member = def.members[i];
    if (member.type === 'operation' || member.type === 'attribute') {
      return true;
    } else if (member.type === 'const') {
      ++ constantCounter;
    }
  };
  return constantCounter < def.members.length;
};

const WIDL2NanGenerator = function () {
  const _readFile = function (path) {
    return fs.readFile(path);
  };

  const defaultOption = {
    targetDir: 'gen'
  };

  var generator = {
    option: defaultOption,
    idlStore: [],
    typeMap: {}
  };

  generator.reset = function () {
    this.option = defaultOption;
    this.idlStore = [];
  };

  generator.setOption = function (option) {
    this.option = option || {};
  };

  generator.addFile = function (fileName) {
    return _readFile(fileName)
      .then(data => {
        this.addText(data.toString(), fileName);
      });
  };

  generator.scanDir = function (dirName) {
    return new Promise(function (resolve, reject) {
      // options is optional
      glob(path.join(dirName, '*.widl'), /*options, */function (er, files) {
        console.log(files);
        // TODO: deal with files

        // files is an array of filenames.
        // If the `nonull` option is set, and nothing
        // was found, then files is ["**/*.js"]
        // er is an error object or null.

        resolve('');
      });

      // glob(path.join(dirName, '*.h'), /*options, */function (er, files) {
      //   // TODO: use enumGenerator to deal with files
      // });

    });

  };

  generator.addText = function (str, name) {
    this.idlStore.push({
      name: name,
      text: str,
      tree: {},
      wrapperH: [],
      wrapperCpp: [],
      implH: [],
      implCpp: []
    });
  };

  generator.addCppEnum = function (path) {
    const that = this;
    const callback = function (fileName, idlText) {
      that.addText(idlText, fileName);
    };

    return new Promise(function (resolve, reject) {
      enumGenerator.addFile(path)
        .then(function () {
          enumGenerator.compile();
          enumGenerator.writeTo(callback);
          resolve(that.idlStore);
        })
        .catch(e => {
          reject(e);
        });
    });

  };

  generator.compile = function () {
    this.idlStore.forEach(idl => {
      idl.tree = _parseIDL(idl.text);
    });

    _preprocess(this);

    this.idlStore.forEach(idl => {
      idl.tree.forEach(def => {
        if (def.type === 'interface') {
          idl.wrapperH.push({
            name: _genWrapperHeaderName(def),
            text: _packEmptyLines(dots.nanCxxHeader(def))
          });

          idl.wrapperCpp.push({
            name: _genWrapperCppName(def),
            text: _packEmptyLines(dots.nanCxxImpl(def))
          });

          if (_useImpl(def)) {
            idl.implH.push({
              name: _genImplHeaderName(def),
              text: _packEmptyLines(dots.implHeader(def))
            });
            idl.implCpp.push({
              name: _genImplCppName(def),
              text: _packEmptyLines(dots.implCpp(def))
            });
          }

        } else if (def.type === 'exception') {

        } else if (def.type === 'enum') {

        } else if (def.type === 'callback') {

        }
      });
    });
  };

  generator.writeToDir = function (dirName) {
    this.option.targetDir = dirName;
    var dirNameSkeleton = dirName + '/dont-build';
    mkdirp.sync(dirName);
    mkdirp.sync(dirNameSkeleton);

    var all = [];
    const write = function (array) {
      array.forEach(item => {
        all.push(_writeFile(path.join(dirName, item.name), item.text));
      });
    }

    const writeImpl = function (array) {
      array.forEach(item => {
        all.push(_writeFile(path.join(dirNameSkeleton, item.name), item.text));
      });
    }

    this.idlStore.forEach(idl => {
      write(idl.wrapperH);
      write(idl.wrapperCpp);
      writeImpl(idl.implH);
      writeImpl(idl.implCpp);
    });

    all.push(_writeFile(path.join(dirName, 'generator_helper.h'), dots.helperHeader({})));

    return new Promise(function (resolve, reject) {
      Promise.all(all).then(() => {resolve('done');});
    });
  };

  generator.writeTo = function (stream) {
  };


  return generator;
};

module.exports = {
  hello: helloWorld,
  generator: WIDL2NanGenerator(),
};
