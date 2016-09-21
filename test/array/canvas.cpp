// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#include "canvas.h"
#include "gen/nan__point.h"

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

ArrayHelper Canvas::getInternalPoints() {
  ArrayHelper helper;
  std::vector<Point*> vec;
  vec.push_back(new Point);
  vec.push_back(new Point);
  vec[0]->x_ = 1;
  vec[0]->y_ = 1;
  vec[1]->x_ = 2;
  vec[1]->y_ = 2;
  helper.FromArrayOfImplT<NanPoint>(vec.begin(), vec.end());
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

