// To add your copyright and license header

#include "my_class.h"

MyClass::MyClass() {
  url_ = "";
  radius_ = 0;
}

MyClass::MyClass(const int32_t& radius) {
  url_ = "";
  radius_ = radius;
}

MyClass::MyClass(const std::string& url, const int32_t& radius) {
  url_ = url;
  radius_ = radius;
}

MyClass::~MyClass() {
}

MyClass& MyClass::operator = (const MyClass& rhs) {
  if (&rhs != this) {
    this->url_ = rhs.url_;
    this->radius_ = rhs.radius_;
  }
  return *this;
}

