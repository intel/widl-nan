

#include "circle.h"

Circle::Circle() {
  // TODO: init your members
}

Circle::~Circle() {
  // TODO: do cleanup if necessary

}

Point* Circle::triangulate(const Circle& c1, const Circle& c2, const Circle& c3) {
  

  // TODO: fill your code here
  auto pt = new Point();
  pt->set_x(5.5);   // Mock value: I don't want to do the real calculation here :)
  pt->set_y(18.75); // Mock value
  return pt;
}

