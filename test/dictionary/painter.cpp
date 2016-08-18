// To add your copyright and license header

#include "painter.h"

Painter::Painter() {
  // TODO(widl-nan): init your members
}

Painter::~Painter() {
  // TODO(widl-nan): do cleanup if necessary
}

Painter& Painter::operator = (const Painter& rhs) {
  if (&rhs != this) {
    // TODO(widl-nan): copy members from rhs
  }
  return *this;
}

PaintOptions Painter::get_options() const {
  PaintOptions tmp;
  tmp.set_offset(options_pt_);
  tmp.set_color(options_color_);
  tmp.set_subscript(options_subscript_);
  tmp.set_flags(options_flags_);
  return tmp;
}

void Painter::set_options(const PaintOptions& new_value) {
}

void Painter::drawText(const std::string& text, const PaintOptions& options) {
  options_pt_ = options.get_offset();
  options_color_ = options.get_color();
  options_subscript_ = options.get_subscript();
  options_flags_ = options.get_flags();
}

PaintOptions Painter::getFactoryOptions() {
  // Temp: just reusing options property
  return get_options();
}
