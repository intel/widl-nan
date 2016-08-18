// To add your copyright and license header

#ifndef __POINT_H_
#define __POINT_H_

#include <node.h>
#include <v8.h>

#include <string>

#include "gen/generator_helper.h"

class Point {
 public:
  Point();

  explicit Point(const int32_t& x, const int32_t& y);

  ~Point();

  Point& operator = (const Point& rhs);

 public:
  int32_t get_x() const {
    return this->x_;
  }

  void set_x(const int32_t& new_value) {
    this->x_ = new_value;
  }

  int32_t get_y() const {
    return this->y_;
  }

  void set_y(const int32_t& new_value) {
    this->y_ = new_value;
  }

  void SetJavaScriptThis(v8::Local<v8::Object> obj) {
    // Ignore this if you don't need it
    // Typical usage: emit an event on `obj`
  }

 private:
  int32_t x_;

  int32_t y_;
};

#endif  // __POINT_H_
