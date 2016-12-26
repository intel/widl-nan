// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

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
  PaintOptions options;
  OtherOptions others;
  others.set_switch(switch_);
  options.set_offset(options_pt_);
  options.set_color(options_color_);
  options.set_subscript(options_subscript_);
  options.set_flags(options_flags_);
  options.set_others(others);
  return options;
}

void Painter::set_options(const PaintOptions& new_value) {
}

void Painter::drawText(const std::string& text, const PaintOptions& options) {
  options_pt_ = options.get_offset();
  options_color_ = options.get_color();
  options_subscript_ = options.get_subscript();
  options_flags_ = options.get_flags();
  switch_ = options.get_others().get_switch();
}

PaintOptions Painter::getFactoryOptions() {
  // Temp: just reusing options property
  return get_options();
}

void Painter::drawPolygon(const PolygonDrawOption& polygon) {
  // Do this to cover more functions in test
  DictionaryPolygonDrawOption t;
  t.ImportFrom(polygon);
  polygon_draw_option_ = t;
}

PolygonDrawOption Painter::getLastPolygonDrawOption() {
  return polygon_draw_option_.Exported();
}
