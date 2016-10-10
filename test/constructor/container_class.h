// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#ifndef __CONTAINER_CLASS_H_
#define __CONTAINER_CLASS_H_

#include <node.h>
#include <v8.h>

#include <string>

#include "gen/generator_helper.h"

#include "my_class.h"

#include "no_constructor_class.h"

class ContainerClass {
 public:
  ContainerClass();

  explicit ContainerClass(const MyClass& obj);

  explicit ContainerClass(const double& diameter, const MyClass& obj);

  ~ContainerClass();

  ContainerClass& operator = (const ContainerClass& rhs);

 public:
  MyClass* get_embedded() const {
    return &this->embedded_;
  }

  double get_diameter() const {
    return this->diameter_;
  }

  NoConstructorClass* createNoConstructorClassObject();

  void SetJavaScriptThis(v8::Local<v8::Object> obj) {
    // Ignore this if you don't need it
    // Typical usage: emit an event on `obj`
  }

 private:
  mutable MyClass embedded_;

  double diameter_;
};

#endif  // __CONTAINER_CLASS_H_
