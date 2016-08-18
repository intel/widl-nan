// To add your copyright and license header

#include "point.h"

Point::Point() {
  x_ = y_ = 0;
}

Point::Point(const int32_t& x, const int32_t& y) {
  x_ = x;
  y_ = y;
}

Point::~Point() {
}

Point& Point::operator = (const Point& rhs) {
  if (&rhs != this) {
    this->x_ = rhs.x_;
    this->y_ = rhs.y_;
  }
  return *this;
}
