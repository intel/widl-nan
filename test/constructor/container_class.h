// To add your copyright and license header

#ifndef __CONTAINER_CLASS_H_
#define __CONTAINER_CLASS_H_

#include <node.h>
#include <v8.h>

#include <string>

#include "gen/generator_helper.h"

#include "my_class.h"

class ContainerClass {
 public:
  ContainerClass();

  explicit ContainerClass(const MyClass& obj);

  explicit ContainerClass(const double& diameter, const MyClass& obj);

  ~ContainerClass();

  ContainerClass& operator = (const ContainerClass& rhs);

 public:
  MyClass get_embedded() const {
    return this->embedded_;
  }

  double get_diameter() const {
    return this->diameter_;
  }

  void SetJavaScriptThis(v8::Local<v8::Object> obj) {
    // Ignore this if you don't need it
    // Typical usage: emit an event on `obj`
  }

 private:
  MyClass embedded_;

  double diameter_;
};

#endif  // __CONTAINER_CLASS_H_
