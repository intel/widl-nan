// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#ifndef __PAINTER_H_
#define __PAINTER_H_

#include <node.h>
#include <v8.h>

#include <string>

#include "gen/generator_helper.h"
#include "gen/paint_options.h"

class Painter {
 public:
  Painter();

  ~Painter();

  Painter& operator = (const Painter& rhs);

 public:
  PaintOptions get_options() const;

  void set_options(const PaintOptions& new_value);

  void drawText(const std::string& text, const PaintOptions& options);

  PaintOptions getFactoryOptions();

  void SetJavaScriptThis(v8::Local<v8::Object> obj) {
    // Ignore this if you don't need it
    // Typical usage: emit an event on `obj`
  }

 private:
  Point options_pt_;
  std::string options_color_;
  std::string options_subscript_;
  int16_t options_flags_;
};

#endif  // __PAINTER_H_
