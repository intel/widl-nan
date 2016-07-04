"use strict";

const path = require('path');
const fs = require("fs.promised");
const mkdirp = require("mkdirp");
const glob = require("glob");
const webIDL2 = require("webidl2");
const dot = require("dot");
dot.templateSettings.strip = false; // Do not remove spaces & linebreaks
var dots = dot.process({path: path.join(__dirname, "templates")});


function helloWorld() {
  console.log("Hello World!");
}

const _writeFile = function(name, text) {
  return fs.writeFile(name, text);
};

const _packEmptyLines = function(str) {
  return str.replace(/\n{3,}/gm, '\n\n');
};

const _parseIDL = function(idlText) {
  return webIDL2.parse(idlText);
};

const _genHeaderName = function(def) {
  return 'nan' + def.name.toLowerCase() + '.h';
};

const _genCppName = function(def) {
  return 'nan' + def.name.toLowerCase() + '.cpp';
};

const WIDL2NanGenerator = function () {
  const _readFile = function (path) {
    return fs.readFile(path);
  };

  var generator = {
    option: {
      targetDir: 'gen'
    },
    idlStore: []
  };

  generator.reset = function () {

  };

  generator.setOption = function (option) {
    this.option = option || {};
  };

  generator.addFile = function (fileName) {
    return _readFile(fileName)
      .then(data => {
        return this.addText(data.toString(), fileName);
      });
  };

  generator.scanDir = function (dirName) {
    // options is optional
    glob(path.join(dirName, '*.widl'), /*options, */function (er, files) {
      console.log(files);
      // files is an array of filenames.
      // If the `nonull` option is set, and nothing
      // was found, then files is ["**/*.js"]
      // er is an error object or null.
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
        } else if (def.type === '') {

        }
      });
    });

  };

  generator.writeToDir = function (dirName) {
    this.targetDir = dirName;
    mkdirp.sync(this.option.targetDir);

    this.idlStore.forEach(idl => {
      idl.headers.forEach(header => {
        _writeFile(path.join(this.option.targetDir, header.name), header.text);
      });
      idl.cpp.forEach(cpp => {
        _writeFile(path.join(this.option.targetDir, cpp.name), cpp.text);
      });
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
