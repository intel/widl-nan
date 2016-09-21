// To add your copyright and license header

#ifndef _POINT_H_
#define _POINT_H_

#include <node.h>
#include <v8.h>

#include <string>

#include "gen/generator_helper.h"
#include "gen/array_helper.h"

class Point {
 public:
  Point();

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
  friend class Canvas;
};

#endif  // _POINT_H_
