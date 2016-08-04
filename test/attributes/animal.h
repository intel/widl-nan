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

#ifndef _ANIMAL_H_
#define _ANIMAL_H_

#include <node.h>
#include <v8.h>

#include <string>

class Animal {
 public:
  Animal();
  explicit Animal(const std::string& name);
  explicit Animal(const std::string& name, const uint16_t& age);

  ~Animal();

 public:
  std::string get_name() const {
    return this->name_;
  }

  uint16_t get_age() const {
    return this->age_;
  }

  void set_age(const uint16_t& new_value) {
    this->age_ = new_value;
  }

 private:
  std::string name_;

  uint16_t age_;
};

#endif  // _ANIMAL_H_
