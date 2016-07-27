

#ifndef _BUTTON_H_
#define _BUTTON_H_
#include <string>
#include <node.h>
#include <v8.h>
#include "generator_helper.h"

#include "dimensions.h"

class Button {
 public:

  explicit Button();

  ~Button ();

 public:

  Dimensions get_dimensions() const {
    return this->dimensions_;
  }

  void set_dimensions(const Dimensions& new_value) {
    this->dimensions_ = new_value;
  }

  bool isMouseOver();

  void setDimensions(const Dimensions& size);

  void setDimensions(const uint32_t& width, const uint32_t& height);

 private:

  Dimensions dimensions_;

};

#endif // _BUTTON_H_
