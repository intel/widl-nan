// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#include "meal.h"

Meal::Meal() {
}

Meal::~Meal() {
}

void Meal::initialize(const std::string& type, const float& size) {
  type_ = type;
  size_ = size;
}
