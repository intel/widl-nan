// To add your copyright and license header

#include "point.h"

Point::Point() {
  x_ = 0;
  y_ = 0;
}

Point::Point(const int32_t& x, const int32_t& y) {
  x_ = x;
  y_ = y;
}

Point::~Point() {
}

Point& Point::operator = (const Point& rhs) {
  if (&rhs != this) {
    x_ = rhs.x_;
    y_ = rhs.y_;
  }
  return *this;
}

