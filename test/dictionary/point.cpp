// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#include "point.h"

Point::Point()
    : x_(0), y_(0) {
}

Point::Point(const int32_t& x, const int32_t& y)
    : x_(x), y_(y) {
}

Point::~Point() {
}

Point& Point::operator = (const Point& rhs) {
  if (&rhs != this) {
    this->x_ = rhs.x_;
    this->y_ = rhs.y_;
  }
  return *this;
}
