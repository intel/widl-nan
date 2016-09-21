// To add your copyright and license header

#include "point.h"

Point::Point() {
  // TODO(widl-nan): init your members
  x_ = 0;
  y_ = 0;
}

Point::~Point() {
  // TODO(widl-nan): do cleanup if necessary
}

Point& Point::operator = (const Point& rhs) {
  if (&rhs != this) {
    // TODO(widl-nan): copy members from rhs
  }
  return *this;
}

