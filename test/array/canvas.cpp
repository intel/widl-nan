// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#include "canvas.h"

Canvas::Canvas() {
  ArrayHelper helper;
  const char* array[] = {"jpg", "png", "tif", "gif"};
  helper.FromStringArray(array, array + 4);
  codecs_.FromArrayHelper(helper);
}

Canvas::~Canvas() {
  // TODO(widl-nan): do cleanup if necessary
}

Canvas& Canvas::operator = (const Canvas& rhs) {
  if (&rhs != this) {
    // TODO(widl-nan): copy members from rhs
  }
  return *this;
}

ArrayHelper Canvas::getSupportedImageCodecs() {
  ArrayHelper helper;

  helper.Set(0, "jpg");
  helper.Set(1, "png");
  helper.Set(2, "tif");
  helper.Set(3, "gif");

  return helper;
}

void Canvas::drawPolygon(const ArrayHelper& coordinates) {
  array_.resize(coordinates.Length());
  coordinates.ToDoubleArray(array_.begin(), array_.end());
}

ArrayHelper Canvas::getLastDrawnPolygon() {
  ArrayHelper helper;
  helper.FromArrayT(array_.begin(), array_.end());
  return helper;
}

