// To add your copyright and license header

#include "student.h"

Student::Student() {
  // TODO(widl-nan): init your members
}

Student::~Student() {
  // TODO(widl-nan): do cleanup if necessary
}

Student& Student::operator = (const Student& rhs) {
  if (&rhs != this) {
    // TODO(widl-nan): copy members from rhs
  }
  return *this;
}

  // Note: stringifier will use get_name() function

