

#include "button.h"

Button::Button() {
  // TODO: init your members
}

Button::~Button() {
  // TODO: do cleanup if necessary

}

bool Button::isMouseOver() {
  

  // TODO: fill your code here
  return false;
}

void Button::setDimensions(const Dimensions& size) {
  

  // TODO: fill your code here
  dimensions_.set_width(size.get_width());
  dimensions_.set_height(size.get_height());
}

void Button::setDimensions(const uint32_t& width, const uint32_t& height) {
  

  // TODO: fill your code here
  dimensions_.set_width(width);
  dimensions_.set_height(height);
}

