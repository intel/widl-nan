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
#include <string>
#include <node.h>
#include <v8.h>

class Animal {
 public:

  explicit Animal();

  explicit Animal(const std::string& name);

  explicit Animal(const std::string& name, const short& age);

  ~Animal ();

 public:

  const std::string get_name() const {
    return this->name_;
  }

  const short get_age() const {
    return this->age_;
  }

  void set_age(const short& new_value) {
    this->age_ = new_value;
  }

 private:

  std::string name_;

  short age_;

};

#endif // _ANIMAL_H_
