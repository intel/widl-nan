// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.
//
// This file is originally copied from gen/dont-build, developer can make
// any change based on it.
//
// Note, if the .widl changed, developer need adapt change manually OR
// redo the copy-and-modify steps. Otherwise, gyp-build will complain with
// compiler errors.

#include "animal.h"

Animal::Animal()
    : name_(""),
      age_(0) {
}

Animal::Animal(const std::string& name)
    : name_(name),
      age_(0) {
}

Animal::Animal(const std::string& name, const uint16_t& age)
    : name_(name),
      age_(age) {
}

Animal::~Animal() {
}
