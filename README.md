# Purpose #
We're developing a node module for node-addon developers, providing the following features:

 - Read & parse Web IDL definition (*.widl)
 - Extract `enum` definition from C++ header (*.h) and then expose them in JavaScript; Acceptable `enum` definition formats:
   - `enum class XXX : YYY {...}`
   - `enum XXX {...}`
   - `typedef enum {...} XXX`
   - `typedef enum _XXX {...} XXX`
 - Generate C++ NAN wrapper source code to provide JavaScript calling interface
 - Generate skeleton C++ impl source code to be used by developers

# Getting Started #

An example is always a good way to get started, please find it at [https://github.com/kenny-y/wn-example](https://github.com/kenny-y/wn-example)


# List of Supported Features #

 - `interface`
   - `attributes` -- mapping to `NAN` `Getter` and/or `Setter` (depend on whether it's `readonly`), and also relevant C++ member variables + getter/setter
   - method -- mapping to `NAN_METHOD` and C++ member functions.
     (Note: Web IDL method overload is now supported)
   - `partial interface`: no plan yet
   - `[constructor]`: TODO
   - Complete support of all data types: TODO
 - `exception` -- TODO
 - `enum` -- TODO
