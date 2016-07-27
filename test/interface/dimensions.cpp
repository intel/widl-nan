

#include "dimensions.h"

Dimensions::Dimensions() {
  // TODO: init your members
}

Dimensions::~Dimensions() {
  // TODO: do cleanup if necessary

}

Dimensions& Dimensions::operator = (const Dimensions& rhs) {
  if (&rhs != this) {
    this->width_ = rhs.width_;
    this->height_ = rhs.height_;
  }
  return *this;
}

