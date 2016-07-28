// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#ifndef _POINT_H_
#define _POINT_H_

#include <node.h>
#include <v8.h>

#include <string>

class Point {
 public:
  Point();
  ~Point();

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

#endif  // _POINT_H_
