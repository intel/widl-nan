// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.
//
// This file is originally copied from gen/dont-build, developer can make
// any change based on it.
//
// Note, if the .widl changed, developer need adapt change manually OR
// redo the copy-and-modify steps. Otherwise, gyp-build will complain with
// compiler errors.

#ifndef _PRIMITIVESRETURN_H_
#define _PRIMITIVESRETURN_H_

#include <node.h>
#include <v8.h>

#include <string>

#include "gen/generator_helper.h"

class PrimitivesReturn {
 public:
  PrimitivesReturn();

  ~PrimitivesReturn();

  PrimitivesReturn& operator = (const PrimitivesReturn& rhs);

 public:
  bool get_vBoolean() const {
    return this->vBoolean_;
  }

  void set_vBoolean(const bool& new_value) {
    this->vBoolean_ = new_value;
  }

  double get_vFloat() const {
    return this->vFloat_;
  }

  void set_vFloat(const double& new_value) {
    this->vFloat_ = new_value;
  }

  double get_vUnrestrictFloat() const {
    return this->vUnrestrictFloat_;
  }

  void set_vUnrestrictFloat(const double& new_value) {
    this->vUnrestrictFloat_ = new_value;
  }

  double get_vDouble() const {
    return this->vDouble_;
  }

  void set_vDouble(const double& new_value) {
    this->vDouble_ = new_value;
  }

  double get_vUnrestrictDouble() const {
    return this->vUnrestrictDouble_;
  }

  void set_vUnrestrictDouble(const double& new_value) {
    this->vUnrestrictDouble_ = new_value;
  }

  int8_t showByte();

  uint8_t showOctet();

  int16_t showShort();

  uint16_t showUnsignedShort();

  int32_t showLong();

  uint32_t showUnsignedLong();

  std::string showDOMString();

  bool showBoolean();

  double showFloat();

  double showDouble();

  double showUnrestrictFloat();

  double showUnrestrictDouble();

 private:
  bool vBoolean_;

  double vFloat_;

  double vUnrestrictFloat_;

  double vDouble_;

  double vUnrestrictDouble_;
};

#endif  // _PRIMITIVESRETURN_H_
