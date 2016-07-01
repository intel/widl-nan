"use strict";

const fs = require("fs.promised");
const dot = require("dot");
const webIDL2 = require("webidl2");

function helloWorld() {
  console.log("Hello World!");
}

const WIDL2NanGenerator = function () {
  const _readFile = function (path) {
    return fs.readFile(path);
  };

  var generator = {
  	reset: function () {},
    setOption: function (option) {},
  	readIDL: function (fileName) {},
    scanDir: function (pathName) {},
    readText: function (str) {},
    writeFiles: function (pathName) {},
    writeTo: function () {},
  };

  return generator;
};

module.exports = {
  hello: helloWorld
};
