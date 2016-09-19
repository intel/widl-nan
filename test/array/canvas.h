// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#ifndef __CANVAS_H_
#define __CANVAS_H_

#include <node.h>
#include <v8.h>

#include <string>
#include <vector>

#include "gen/generator_helper.h"
#include "gen/array_helper.h"

#include "point.h"

class Canvas {
 public:
  Canvas();
  Canvas(const Canvas& rhs);

  ~Canvas();

  Canvas& operator = (const Canvas& rhs);

 public:
  ArrayHelper get_coordinates() const {
    return this->coordinates_;
  }

  void set_coordinates(const ArrayHelper& new_value) {
    this->coordinates_ = new_value;
  }

  ArrayHelper get_codecs() const {
    return this->codecs_;
  }

  void set_codecs(const ArrayHelper& new_value) {
    this->codecs_ = new_value;
  }

  ArrayHelper get_points() const {
    return this->points_;
  }

  void set_points(const ArrayHelper& new_value) {
    this->points_ = new_value;
  }

  ArrayHelper getSupportedImageCodecs();

  void drawPolygon(const ArrayHelper& coordinates);

  ArrayHelper getLastDrawnPolygon();

  void SetJavaScriptThis(v8::Local<v8::Object> obj) {
    // Ignore this if you don't need it
    // Typical usage: emit an event on `obj`
  }

 private:
  ArrayHelperStorage coordinates_;
  ArrayHelperStorage codecs_;
  mutable ArrayHelperStorage points_;
  std::vector<double> array_;
};

#endif  // __CANVAS_H_
