// To add your copyright and license header

#include "student3.h"

Student3::Student3() {
  // TODO(widl-nan): init your members
}

Student3::~Student3() {
  // TODO(widl-nan): do cleanup if necessary
}

Student3& Student3::operator = (const Student3& rhs) {
  if (&rhs != this) {
    // TODO(widl-nan): copy members from rhs
  }
  return *this;
}

std::string Student3::ToString() const {
  return "C++ std::string value from Student2::ToString()";
}

