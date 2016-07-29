// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#include "b.h"

B::B() {
}

B::~B() {
}

std::string B::f(const std::string& w) {
  return "method1";
}

std::string B::f(const long& w, const float& x) {
  return "method2";
}

std::string B::f(const float& w, const std::string& y) {
  return "method3";
}
