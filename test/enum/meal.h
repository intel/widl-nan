// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#ifndef _MEAL_H_
#define _MEAL_H_

#include <node.h>
#include <v8.h>

#include <string>

class Meal {
 public:
  Meal();
  ~Meal();

 public:
  const std::string get_type() const {
    return this->type_;
  }

  void set_type(const std::string& new_value) {
    this->type_ = new_value;
  }

  const float get_size() const {
    return this->size_;
  }

  void set_size(const float& new_value) {
    this->size_ = new_value;
  }

  void initialize(const std::string& type, const float& size);

 private:
  std::string type_;
  float size_;
};

#endif  // _MEAL_H_
