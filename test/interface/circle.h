// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#ifndef _CIRCLE_H_
#define _CIRCLE_H_

#include <node.h>
#include <v8.h>

#include <string>

#include "point.h"

class Circle {
 public:
  Circle();
  ~Circle();

 public:
  float get_cx() const {
    return this->cx_;
  }

  void set_cx(const float& new_value) {
    this->cx_ = new_value;
  }

  float get_cy() const {
    return this->cy_;
  }

  void set_cy(const float& new_value) {
    this->cy_ = new_value;
  }

  float get_radius() const {
    return this->radius_;
  }

  void set_radius(const float& new_value) {
    this->radius_ = new_value;
  }

  Point* triangulate(const Circle& c1, const Circle& c2, const Circle& c3);

  Point* emptyReturn();

 private:
  float cx_;
  float cy_;
  float radius_;
};

#endif  // _CIRCLE_H_
