// To add your copyright and license header

#include "no_constructor_class.h"

NoConstructorClass::NoConstructorClass() {
  counter_ = 0;
}

NoConstructorClass::NoConstructorClass(const NoConstructorClass& rhs) {
  counter_ = rhs.counter_;
}

NoConstructorClass::~NoConstructorClass() {
}

NoConstructorClass& NoConstructorClass::operator = (
    const NoConstructorClass& rhs) {
  if (&rhs != this) {
    counter_ = rhs.counter_;
  }
  return *this;
}

