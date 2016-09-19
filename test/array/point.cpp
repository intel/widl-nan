// To add your copyright and license header

#include "point.h"

point::point() {
  // TODO(widl-nan): init your members
  x_ = 0;
  y_ = 0;
}

point::~point() {
  // TODO(widl-nan): do cleanup if necessary
}

point& point::operator = (const point& rhs) {
  if (&rhs != this) {
    // TODO(widl-nan): copy members from rhs
  }
  return *this;
}

