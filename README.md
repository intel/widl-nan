[![Build Status](https://travis-ci.org/01org/widl-nan.svg?branch=master)](https://travis-ci.org/01org/widl-nan)

# Purpose

This toolchain transcompiles [W3C Web IDL](https://www.w3.org/TR/WebIDL/) and [Version 2](https://heycam.github.io/webidl/) to the [NAN](https://github.com/nodejs/nan) C++ code. This tool improve efficiency of [Node.js Addon](https://nodejs.org/api/addons.html) developing, allows developers focus on spec definition and actual implementation codes.

This bindings code is highly repetitive, primarily passing values (arguments and return values) between V8 and native and doing various conversions and checks (e.g., type checking), hence it is mostly machine-generated.

# Quick Start
### Init workspace
```
npm init
```
### Install widl-nan
```
npm install --save ssh://git@github.com/01org/widl-nan.git
```
### Compile WIDL files using widl-nan
All supported command-line options of widl-nan can be listed in the help information by ```-h``` argument.

```
./node_modules/.bin/widl-nan -h
  Usage: widl-nan [optinos] [widl] [widl...]

  Options:

    -h, --help        output usage information
    -V, --version     output the version number
    -c, --clean       Cleanup generated codes
    -d, --dest [dir]  Destination directory of generated C++ code
    -i, --init        Init workspace with impl and project files
    -o, --override    Allow override impl files unconditionally
```

You can generate the initial NAN interfaces and C++ implementation for these interfaces by the instruction below.

```
./node_modules/.bin/widl-nan <widl_file_1> <widl_file_2> ...
```

### Leverage the C++ implementaion
All generated files lay in a new folder called ```gen``` in current directory. NAN wrappers locate directly in the ```gen``` folder, while the C++ implementations locate in a subfolder called ```dont-build```.

You can of cause work on native implementations from scratch, but these C++ implementations are good basis of counterpart classes' and members' definition to the NAN interfaces. They can help you a lot, and we recommend to start work based on them.

What's more, we have a command-line option ```-i``` helping to put all C++ implementations, the entry file ```addon.cpp``` and the build file ```binding.gyp``` to the right place to make it a template Node.js addon project. 

```
./node_modules/.bin/widl-nan -i
```

### Build the addon
Given WIDL files, after running two commands mentioned above, you can got a buildable Node.js addon project. The project can be build by following instruction.

```
node-gyp rebuild
```
Now with the excutable addon, you can test it and all the defined interfaces should show up. With this basic project, you can modify files to add your own logics.

[Note] The tool can generate WIDL files to NAN wrappers and C++ implementations, but it has no ability to identify the code you have modified or added. So if WIDL files changed, and you ran steps above again in the same directory, all the files with same path and name will be replaced.

# Supported WIDL features.
This project leveraged [webidl2](https://www.npmjs.com/package/webidl2) tool to parse WIDL files. So all supported WIDL features listed below in this project are all compliant with [webidl2](https://www.npmjs.com/package/webidl2/).
- Array, both the ```sequence<TypeName>``` and the normal array ```TypeName[]```, but we recommend to use sequence.
- Attributes, readonly and writable attributes are all supported, inheritant attributes has not been supported yet.
- Buffer, ArrayBuffer and typed array are all supported.
- Callback and Promise are all supported.
- Dictionary, Interface, constructor, enum, const and static member are all supported.
- Overloaded methods and optional arguments are all supported, but method-overload is recommended. 
- Primitive types are supported except ``` long long```.
- Stringifier is supported.
- Event emitter has not been supported directly, JavaScript Wrapper can be used to achive the goal, please refer [this example](https://github.com/otcshare/node-realsense/blob/master/src/slam/index.js#L13).

For more detail or samples, please check the examples under https://github.com/01org/widl-nan/tree/master/test, basically each supported feature has a test case.

# Contribution

## Coding style guideline

We're following [Chromium coding style](https://chromium.googlesource.com/chromium/src/+/master/styleguide/styleguide.md) for different languages: [C++](https://chromium.googlesource.com/chromium/src/+/master/styleguide/c++/c++.md), [Python](https://google.github.io/styleguide/pyguide.html) and [JavaScript](https://google.github.io/styleguide/javascriptguide.xml). Please run style checker `python ./tools/lint.py` before submitting your code. [depot_tools](https://www.chromium.org/developers/how-tos/install-depot-tools) need to be installed and added to `PATH` env.

## Commit message guideline
A comprehensive commit message will help reviewer to understand what your PR is trying to resolve. There are lots of article to share experience how to write a good commit message, please Google them or check any commit message on mature projects. For eg: https://cs.chromium.org/

To close a related issue, we highly suggest to use [Closing issues via commit messages](https://help.github.com/articles/closing-issues-via-commit-messages/) format, for eg: Fixes.

# Security
If you would like to report a security issue, or have other security related questions, please email [the team](mailto:otc.prc.web.runtime.and.technology.team@intel.com).

# License

The MIT License (MIT)

Copyright (c) 2016 Intel Corporation. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
