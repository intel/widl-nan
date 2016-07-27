

#ifndef _POINT_H_
#define _POINT_H_
#include <string>
#include <node.h>
#include <v8.h>
#include "generator_helper.h"

class Point {
 public:

  explicit Point();

  ~Point ();

 public:

  float get_x() const {
    return this->x_;
  }

  void set_x(const float& new_value) {
    this->x_ = new_value;
  }

  float get_y() const {
    return this->y_;
  }

  void set_y(const float& new_value) {
    this->y_ = new_value;
  }

 private:

  float x_;

  float y_;

};

#endif // _POINT_H_
