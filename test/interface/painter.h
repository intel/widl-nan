// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#ifndef _PAINTER_H_
#define _PAINTER_H_

#include <node.h>
#include <v8.h>

#include <string>

#include "point.h"

class Painter {
 public:
  Painter();
  ~Painter();

 public:
  void drawText(const float& x, const float& y, const std::string& text);
  void drawText(const Point& point, const std::string& text);
};

#endif  // _PAINTER_H_
