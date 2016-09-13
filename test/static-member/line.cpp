// To add your copyright and license header

#include "line.h"

int32_t Line::pointsInALine_ = 2;

// std::string Line::createdBy_ = "";

Point Line::whateverPoint_;

Line::Line() {
  // TODO(widl-nan): init your members
}

Line::Line(const Point& pt1, const Point& pt2) {
  // TODO(widl-nan): init your members
  startPt_ = pt1;
  endPt_ = pt2;
}

Line::Line(const int32_t& x1, const int32_t& y1,
    const int32_t& x2, const int32_t& y2) {
  // TODO(widl-nan): init your members
}

Line::~Line() {
  // TODO(widl-nan): do cleanup if necessary
}

Line& Line::operator = (const Line& rhs) {
  if (&rhs != this) {
    // TODO(widl-nan): copy members from rhs
  }
  return *this;
}

Point* Line::intersectionPoint(const Line& lineA, const Line& lineB) {
  return new Point(120, 0);
}

void Line::offset(const Point& pt) {
}

