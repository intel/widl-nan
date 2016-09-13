// To add your copyright and license header

#ifndef _BUTTON_H_
#define _BUTTON_H_

#include <node.h>
#include <v8.h>

#include <string>

#include "gen/generator_helper.h"
#include "gen/array_helper.h"

#include "dimensions.h"

class Button {
 public:
  Button();

  ~Button();

 public:
  Dimensions* get_dimensions() const {
    return &this->dimensions_;
  }

  void set_dimensions(const Dimensions& new_value) {
    this->dimensions_ = new_value;
  }

  bool isMouseOver();

  void setDimensions(const Dimensions& size);

  void setDimensions(const uint32_t& width, const uint32_t& height);

  void SetJavaScriptThis(v8::Local<v8::Object> obj) {
    // Ignore this if you don't need it
    // Typical usage: emit an event on `obj`
  }

 private:
  mutable Dimensions dimensions_;
};

#endif  // _BUTTON_H_
