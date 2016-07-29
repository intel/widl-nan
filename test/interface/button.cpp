// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#include "button.h"

Button::Button() {
}

Button::~Button() {
}

bool Button::isMouseOver() {
  return false;
}

void Button::setDimensions(const Dimensions& size) {
  dimensions_.set_width(size.get_width());
  dimensions_.set_height(size.get_height());
}

void Button::setDimensions(const uint32_t& width, const uint32_t& height) {
  dimensions_.set_width(width);
  dimensions_.set_height(height);
}
