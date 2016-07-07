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

const _genHeaderName = function(def) {
  return 'nan__' + def.name.toLowerCase() + '.h';
};

const _genCppName = function(def) {
  return 'nan__' + def.name.toLowerCase() + '.cpp';
};

const WIDL2NanGenerator = function () {
  const _readFile = function (path) {
    return fs.readFile(path);
  };

  var defaultOption = {
    targetDir: 'gen'
  };

  var generator = {
    option: defaultOption,
    idlStore: []
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
      headers: [],
      cpp: []
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

    this.idlStore.forEach(idl => {
      idl.tree.forEach(def => {
        if (def.type === 'interface') {
          var headerText = _packEmptyLines(dots.nanCxxHeader(def));
          idl.headers.push({name: _genHeaderName(def), text: headerText});

          var cppText = _packEmptyLines(dots.nanCxxImpl(def));
          idl.cpp.push({name: _genCppName(def), text: cppText});

          // console.log(def);
          // var v = def.members[0];
          // console.log(v.value);
        } else if (def.type === 'exception') {
          // console.log(def);
        }
      });
    });

  };

  generator.writeToDir = function (dirName) {
    this.option.targetDir = dirName;
    mkdirp.sync(this.option.targetDir);

    var all = [];
    this.idlStore.forEach(idl => {
      idl.headers.forEach(header => {
        all.push(_writeFile(path.join(this.option.targetDir, header.name), header.text));
      });
      idl.cpp.forEach(cpp => {
        all.push(_writeFile(path.join(this.option.targetDir, cpp.name), cpp.text));
      });
    });

    all.push(_writeFile(path.join(this.option.targetDir, 'generator_helper.h'), dots.helperHeader({})));

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
