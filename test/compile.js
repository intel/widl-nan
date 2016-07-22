"use strict";

var path = require("path"),
    gen = require("..").generator;

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

  return Promise.all(promiseArray).then(function () {
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
