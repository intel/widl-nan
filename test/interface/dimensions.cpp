// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#include "dimensions.h"

Dimensions::Dimensions() {
}

Dimensions::~Dimensions() {
}

Dimensions& Dimensions::operator = (const Dimensions& rhs) {
  if (&rhs != this) {
    this->width_ = rhs.width_;
    this->height_ = rhs.height_;
  }
  return *this;
}
