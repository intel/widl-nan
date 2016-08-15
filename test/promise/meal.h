// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#ifndef _MEAL_H_
#define _MEAL_H_

#include <node.h>
#include <v8.h>
#include <nan.h>

#include <string>

class Meal {
 public:
  Meal();
  ~Meal();

 public:
  bool get_isRawMeal() const {
    return this->isRawMeal_;
  }

  void initialize();

  void SetJavaScriptThis(v8::Local<v8::Object> obj) {
    // Ignore this if you don't need it
    // Typical usage: emit an event on `obj`
  }

  v8::Handle<v8::Promise> cook(const std::string& chefName);

 private:
  bool isRawMeal_;
};

#endif  // _MEAL_H_
