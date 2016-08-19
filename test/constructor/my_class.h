// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#ifndef __MY_CLASS_H_
#define __MY_CLASS_H_

#include <node.h>
#include <v8.h>

#include <string>

#include "gen/generator_helper.h"

class MyClass {
 public:
  MyClass();

  explicit MyClass(const int32_t& radius);

  explicit MyClass(const std::string& url, const int32_t& radius);

  ~MyClass();

  MyClass& operator = (const MyClass& rhs);

 public:
  int32_t get_radius() const {
    return this->radius_;
  }

  void set_radius(const int32_t& new_value) {
    this->radius_ = new_value;
  }

  std::string get_url() const {
    return this->url_;
  }

  void set_url(const std::string& new_value) {
    this->url_ = new_value;
  }

  void SetJavaScriptThis(v8::Local<v8::Object> obj) {
    // Ignore this if you don't need it
    // Typical usage: emit an event on `obj`
  }

 private:
  int32_t radius_;

  std::string url_;
};

#endif  // __MY_CLASS_H_
