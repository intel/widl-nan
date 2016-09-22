// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#include "my_class.h"

MyClass::MyClass()
    : url_(""),
      radius_(0) {
}

MyClass::MyClass(const int32_t& radius)
    : url_(""),
      radius_(radius) {
}

MyClass::MyClass(const std::string& url, const int32_t& radius)
    : url_(url),
      radius_(radius) {
}

MyClass::MyClass(const MyClass& rhs) {
  // TODO(widl-nan): copy from rhs if you want this behavior
  url_ = rhs.url_;
  radius_ = rhs.radius_;
  // data_ = ...
}

MyClass::~MyClass() {
}

MyClass& MyClass::operator = (const MyClass& rhs) {
  if (&rhs != this) {
    this->url_ = rhs.url_;
    this->radius_ = rhs.radius_;
  }
  return *this;
}

