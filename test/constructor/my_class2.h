// To add your copyright and license header

#ifndef _MY_CLASS2_H_
#define _MY_CLASS2_H_

#include <node.h>
#include <v8.h>

#include <string>

#include "gen/generator_helper.h"
#include "gen/array_helper.h"

class MyClass2 {
 public:
  explicit MyClass2(const int32_t& val);

  MyClass2(const MyClass2& rhs);

  ~MyClass2();

  MyClass2& operator = (const MyClass2& rhs);

 public:
  int32_t get_value() const {
    return this->value_;
  }

  void SetJavaScriptThis(v8::Local<v8::Object> obj) {
    // Ignore this if you don't need it
    // Typical usage: emit an event on `obj`
  }

 private:
  int32_t value_;
};

#endif  // _MY_CLASS2_H_
