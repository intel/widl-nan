// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#include "circle.h"

Circle::Circle() {
}

Circle::~Circle() {
}

Point* Circle::triangulate(const Circle& c1,
                           const Circle& c2,
                           const Circle& c3) {
  auto pt = new Point();
  // Mock value: I don't want to do the real calculation here :)
  pt->set_x(5.5);
  pt->set_y(18.75);
  return pt;
}

Point* Circle::emptyReturn() {
  return nullptr;
}
