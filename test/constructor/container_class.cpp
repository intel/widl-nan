// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#include "container_class.h"

ContainerClass::ContainerClass() {
  diameter_ = 0.0;
}

ContainerClass::ContainerClass(const MyClass& obj) : embedded_(obj) {
  diameter_ = 0.0;
}

ContainerClass::ContainerClass(const double& diameter, const MyClass& obj) {
  embedded_ = obj;
  diameter_ = diameter_;
}

ContainerClass::~ContainerClass() {
  // TODO(widl-nan): do cleanup if necessary
}

ContainerClass& ContainerClass::operator = (const ContainerClass& rhs) {
  if (&rhs != this) {
    this->embedded_ = rhs.embedded_;
    this->diameter_ = rhs.diameter_;
  }
  return *this;
}
