"use strict";

const spawn = require('child_process').spawn;

function buildAddon(workingDir, done) {
  return new Promise((resolve, reject) => {
    var buildProc  = spawn('node-gyp', ['rebuild'], {cwd: workingDir});

    buildProc.stdout.on('data', function (data) {
      console.log(data.toString());
    });

    buildProc.stderr.on('data', function (data) {
      console.log(data.toString());
    });

    buildProc.on('exit', function (code) {
      console.log('node-gyp process exited with code ' + code);
      resolve(code);
    });
  });
}

module.exports = {
  buildAddon: buildAddon
};
