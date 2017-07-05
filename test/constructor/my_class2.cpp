// To add your copyright and license header

#include "my_class2.h"

MyClass2::MyClass2(const int32_t& val) {
    value_ = val;
}

MyClass2::MyClass2(const MyClass2& rhs) {
  // TODO(widl-nan): copy from rhs if you want this behavior
  // Or mark ctor = delete in my_class2.h
}

MyClass2::~MyClass2() {
  // TODO(widl-nan): do cleanup if necessary
}

MyClass2& MyClass2::operator = (const MyClass2& rhs) {
  if (&rhs != this) {
    // TODO(widl-nan): copy members from rhs
  }
  return *this;
}

