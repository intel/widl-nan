"use strict";

var gen = require(".").generator;

Promise.all([
  gen.addFile('test/callback/callback.widl')
  ]).then(function () {
    gen.compile();
    gen.writeToDir('test/callback/gen');
  }).catch(e => {
    console.log(e);
    throw e;
  });

