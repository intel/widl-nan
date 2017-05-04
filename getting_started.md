# Getting Started
This documentation will give you an example about how to create a Node.js addon using WIDL-NAN. 
## Init workspace
```
mkdir circle-addon
cd circle-addon
npm init
```
## Install widl-nan
```
npm install --save ssh://git@github.com/01org/widl-nan.git
```
## Getting inputs ready
Before using WIDL-NAN, you need to get the inputs ready. Designed addon interfaces need to be defined into [WIDL](https://heycam.github.io/webidl/) format. We leveraged [webidl2](https://www.npmjs.com/package/webidl2) tool to parse Web IDL files to Abstract Syntax Tree(AST). So all supported WIDL features by WIDL-NAN are compliant with [webidl2](https://www.npmjs.com/package/webidl2/).

How to write WIDL files is out scope of this document. For more details, please refer to [W3C Web IDL](https://heycam.github.io/webidl/) spec or the [documentation of webidl2.js](https://www.npmjs.com/package/webidl2#documentation). 

But we have some notes and emphasis listed below except general syntax.
- Array, both the ```sequence<TypeName>``` and the normal array ```TypeName[]```, but we recommend to use sequence.
- Attributes, readonly and writable attributes are all supported, inheritant attributes has not been supported yet.
- Callback and Promise are all supported.
- Buffer, ArrayBuffer and typed array are all supported.
- Overloaded methods and optional arguments are all supported, but method-overload is recommended. 
- Primitive types are supported except ``` long long```, WIDL-NAN can handle ```long long```, it will be transformed as ```int64_t```, but the JavaScript engine [V8](https://github.com/v8/v8) can't support 64-bit numbers.
- Event emitter has not been supported directly, JavaScript Wrapper can be used to achive the goal, please refer [this example](https://github.com/otcshare/node-realsense/blob/master/src/slam/index.js#L13).

For example we created a WIDL file like this:
```
// File: circle.widl
[Constructor(float x, float y)]
interface Point {
  attribute float x;
  attribute float y;
};

[Constructor(Point centre, float radius)]
interface Circle {
  attribute Point centre;
  attribute float radius;

  double area();
};
```

What's more, [the test cases](https://github.com/01org/widl-nan/tree/master/test) could be good exampls for reference, basically each supported feature has a test case.

## Compile WIDL files using widl-nan
With the WIDL file ready, you can use widl-nan to generate the initial implementation of the designed Node.js addon.
```
./node_modules/.bin/widl-nan circle.widl
```
## Multiple WIDL files
WIDL-NAN support multiple files, you can just list all the needed files in the command line like this:
```
widl-nan [widl-file-1] [widl-file-2] ...
```
But if one single symbol has been defined multiple times in these WIDL files, the latest input will be applies.


## Outputs
All generated files lay in a new folder called ```gen``` in current directory.
NAN wrappers locate directly in the ```gen``` folder, while the C++ implementations locate in a subfolder called ```dont-build```.
```
circle-addon
  |- nan__circle.cpp    // NAN wrapper implmentation for Circle
  |- nan__circle.h      // NAN wrapper header file for Circle
  |- nan__point.cpp     // NAN wrapper implementation file for Point
  |- nan__point.h       // NAN wrapper header file for Point
  |- generator_helper.h // Just a helper header, you can ignore it.
  |- dont-build         // Holding on the C++ implementation, it expected to be modified by the developer.
       |- addon.cpp     // The entry file of this addon.
       |- binding.gyp   // The build file
       |- circle.cpp    // Template C++ implementation of Circle, you can fill you own logic here.
       |- circle.h      // Template C++ header file for Circle.
       |- point.cpp     // Template C++ implementation of Point, you can fill you own logic here.
       |- point.h       // Template C++ implementation of Point.
```

Addon developers of cause can work on the C++ implementations from scratch, but files in ```dont-build``` folder generated according to the defined interfaces are good basis of counterpart classes' and members' definition to the NAN interfaces. They can help you a lot, and we recommend to start work based on them.

## Leverage the C++ implementaion
We've got a command-line option ```-i``` helping to put all C++ implementations, the entry file ```addon.cpp``` and the build file ```binding.gyp``` to the right place to make it a template Node.js addon project. 

```
./node_modules/.bin/widl-nan -i
```
At this time, all the files in ```dont-build``` folder will be copied directly to the project folder under ```circle-addon```.

## Build the addon
Given WIDL files, after running commands mentioned above, you can got a buildable Node.js addon project. The project can be build by following instruction.

```
node-gyp rebuild
```
Now with the excutable addon, you can test it and all the defined interfaces should show up. With this basic project, you can modify files to add your own logics.

[Note] The tool can generate WIDL files to NAN wrappers and C++ implementations, but it has no ability to identify the code you have modified or added. So if WIDL files changed, and you ran steps above again in the same directory, all the files with same path and name will be replaced.

## Error
#### Syntax error
Again, we leverage [webidl2.js](https://www.npmjs.com/package/webidl2) to parse Web IDL files, so if syntax error encounterred, [webidl2.js format error](https://www.npmjs.com/package/webidl2/#errors) will be print out in the terminal.
#### Build Error
If you encounterred building errors, please reference to [Node.js addon developing documents](https://nodejs.org/api/addons.html)
