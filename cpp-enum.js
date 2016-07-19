// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

"use strict";

const fs = require("fs.promised");
const path = require('path');
const dot = require("dot");
dot.templateSettings.strip = false; // Do not remove spaces & linebreaks
const dots = dot.process({path: path.join(__dirname, "templates")});

const ENUM_REGEX = /^\s*(typedef)*\s*(enum)\s*(\S*)\s*(\S*)\s*(:)*\s*(\S*)([\s\S\{](?!\}\s*\S*;))+\s*\}\s*(\S*)\s*;/gm;

var matchEnumRegex = {
  // The regex
  // And then define the index of regex groups
  // TODO: modify all these indices below, after any change of the regex above
  numOfGroups : 8, enumGroup : 2,

  // The followings work for: enum class type : int {...};
  classGroup : 3, enumClassNameGroup : 4, colonGroup : 5, underlyingTypeGroup : 6,

  // The followings work for:
  //  (1) typedef enum type {...} TYPE;
  //  (2) typedef enum {...} TYPE;
  //  (3) enum TYPE {...};
  typdefKeywordGroup : 1, enumNameGroup : 3, curlyBracketGroup : 4, typedefTypeGroup : 8,
};

function getEmptyEnumOption() {
  var emptyEnumOption = {
    name: undefined,
    type: 'enum',
    jsObjName: undefined,
    cxxType: undefined,
    cxxUnderlyingType: undefined,
    defaultValue: undefined,
    minValue: undefined,
    maxValue: undefined,
    source: null
  };
  return emptyEnumOption;
}

const _parseHeaderEnum = function (fileText) {
  var result = [];

  var match = /^namespace\s+(\S+)/m.exec(fileText);
  var cxxNamespaceName = match ? (match[match.length-1] || '') : '';

  var extractedEnumArray = fileText.match(ENUM_REGEX);
  if (!extractedEnumArray) {
    console.log("Skipping (no enum definition found, or bad regex): " + fileText);
  }


  var enumNameCollection = [];
  extractedEnumArray.forEach(enumDef => {

    // Remove comments
    enumDef = enumDef.replace(/^\s*\/\/.*$/gm, '');
    enumDef = enumDef.replace(/^\s*\/\*([\s\S](?!\*\/))+.*\*\//gm, '');

    var enumOption = getEmptyEnumOption();
    var match = /^\s*(typedef)*\s*(enum)\s*(\S*)\s*(\S*)\s*(:)*\s*(\S*)([\s\S\{](?!\}\s*\S*;))+\s*\}\s*(\S*)\s*;/gm.exec(enumDef);

    var enumName = '', underlyingTypeName = '', cxxType = '';

    if (match[matchEnumRegex.typdefKeywordGroup] == 'typedef') {
      // typedef enum
      enumName = match[matchEnumRegex.typedefTypeGroup];
      underlyingTypeName = 'int';
    } else if (match[matchEnumRegex.colonGroup] == ':') {
      // enum class
      enumName = match[matchEnumRegex.enumClassNameGroup];
      underlyingTypeName = match[matchEnumRegex.underlyingTypeGroup];
    } else if (match[matchEnumRegex.typdefKeywordGroup] == ''
        && match[matchEnumRegex.curlyBracketGroup] == '{') {
      // enum
      enumName = match[matchEnumRegex.enumNameGroup];
      underlyingTypeName = 'int';
    }

    enumOption.name = enumOption.jsObjName = enumName;
    enumOption.cxxUnderlyingType = underlyingTypeName;
    if (cxxNamespaceName) {
      enumOption.cxxType = cxxNamespaceName + "::" + enumName;
    } else {
      enumOption.cxxType = enumName;
    }

    // console.log("");
    // console.log("enum: " + enumName);

    enumNameCollection.push(enumOption.name);

    var enumData = {name: enumName, option: enumOption, values: []};

    // Remove typedef enum class XXX : typename
    enumDef = enumDef.replace(/^\s*(typedef)*\s*enum[^{]*\{/gm, '');
    var lineTextArray = enumDef.split(/\n/);
    var lastSeenEnumCounter = 0;
    lineTextArray.forEach( (lineText, index) => {
      var rawName = '', rawValue = '';
      // var lineMatch = /^\s*(\S+)\s*((:?=\s*([^,]*))|(:?\s*))\s*,?$/gm.exec(lineText);
      var lineMatch = /^\s*([A-Za-z_]{1,1}[A-Za-z0-9_]*)\s*((:?=\s*([^,^}^{]*))|(:?\s*))\s*,?/gm.exec(lineText);
      if (lineMatch) {
        rawName = lineMatch[1];
        rawValue = lineMatch[4];
        if (!rawValue) {
          // Counting mode
          ++ lastSeenEnumCounter;
          rawValue = '' + lastSeenEnumCounter;
        } else {
          lastSeenEnumCounter = eval(rawValue);
          rawValue = '' + lastSeenEnumCounter;
        }
        // console.log("Found enum definition: " + rawName + " = " + rawValue);

        enumOption.minValue = 0;
        enumOption.maxValue = 0;
        if (!enumOption.defaultValue) {
          enumOption.defaultValue = enumOption.cxxType + "::" + rawName;
        }
        enumData.values.push({name: rawName, value: rawValue});
      }
    });

    // console.log(enumData);
    result.push(enumData);

    // var json = dots.enumObj(enumData);
    // console.log(enumData);

    // var idl = dots.enumIDL(enumData);
    // writeFile("./gen/gen-enum-" + enumOption.name + ".widl", idl);

    // var jsonObj = JSON.parse(json);
    // enumOption.source = jsonObj;
    // var cxxSourceCode = dots.genEnumHeader(enumOption);

    // writeFile("./gen/enum-" + enumOption.name + ".h", cxxSourceCode);
  });

  // console.log(enumNameCollection);
  // writeFile("./gen/init_all_enum.h", dots.genAllEnumHeader(enumNameCollection));
  // writeFile("./gen/test__all_enum.js", dots.genAllEnumHeaderTest(enumNameCollection));

  return result;
};

const getCppEnumGenerator = function () {
  var g = {
  	headerStore: [] // C++ header files
  };

  g.addFile = function (fileName) {
    var that = this;
    return fs.readFile(fileName)
      .then(data => {
        that.addText(data.toString(), fileName);
      });
  };

  g.addText = function (str, name) {
    this.headerStore.push({
      name: name,
      text: str,
      definitions: []
    });
  };

  g.compile = function () {
    this.headerStore.forEach(header => {
      header.definitions = _parseHeaderEnum(header.text);
    });
  };

  g.writeTo = function (callback) {
    this.headerStore.forEach(header => {
      header.definitions.forEach(def => {
        callback(header.name, dots.enumIDL(def));
      });
    });
  };

  return g;
};

module.exports = getCppEnumGenerator();
