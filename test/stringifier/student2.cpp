// To add your copyright and license header

#include "student2.h"

Student2::Student2() {
  // TODO(widl-nan): init your members
}

Student2::~Student2() {
  // TODO(widl-nan): do cleanup if necessary
}

Student2& Student2::operator = (const Student2& rhs) {
  if (&rhs != this) {
    // TODO(widl-nan): copy members from rhs
  }
  return *this;
}

std::string Student2::ToString() const {
  return "C++ std::string value from Student2::ToString()";
}

