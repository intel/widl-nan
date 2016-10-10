// To add your copyright and license header

#ifndef _NO_CONSTRUCTOR_CLASS_H_
#define _NO_CONSTRUCTOR_CLASS_H_

#include <node.h>
#include <v8.h>

#include <string>

#include "gen/generator_helper.h"
#include "gen/array_helper.h"

class NoConstructorClass {
 public:
  NoConstructorClass();

  NoConstructorClass(const NoConstructorClass& rhs);

  ~NoConstructorClass();

  NoConstructorClass& operator = (const NoConstructorClass& rhs);

 public:
  int32_t get_counter() const {
    return this->counter_;
  }

  void set_counter(const int32_t& new_value) {
    this->counter_ = new_value;
  }

  void SetJavaScriptThis(v8::Local<v8::Object> obj) {
    // Ignore this if you don't need it
    // Typical usage: emit an event on `obj`
  }

 private:
  int32_t counter_;
};

#endif  // _NO_CONSTRUCTOR_CLASS_H_
