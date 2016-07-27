

#ifndef _DIMENSIONS_H_
#define _DIMENSIONS_H_
#include <string>
#include <node.h>
#include <v8.h>
#include "generator_helper.h"

class Dimensions {
 public:

  explicit Dimensions();

  ~Dimensions ();

  Dimensions& operator = (const Dimensions& rhs);

 public:

  uint32_t get_width() const {
    return this->width_;
  }

  void set_width(const uint32_t& new_value) {
    this->width_ = new_value;
  }

  uint32_t get_height() const {
    return this->height_;
  }

  void set_height(const uint32_t& new_value) {
    this->height_ = new_value;
  }

 private:

  uint32_t width_;

  uint32_t height_;

};

#endif // _DIMENSIONS_H_
