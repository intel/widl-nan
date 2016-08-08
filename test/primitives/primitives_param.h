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

#ifndef _PRIMITIVESPARAM_H_
#define _PRIMITIVESPARAM_H_

#include <node.h>
#include <v8.h>

#include <string>

#include "gen/generator_helper.h"

class PrimitivesParam {
 public:
  PrimitivesParam();

  ~PrimitivesParam();

  PrimitivesParam& operator = (const PrimitivesParam& rhs);

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

  int8_t addByte(const int8_t& a, const int8_t& b);

  uint8_t addOctet(const uint8_t& a, const uint8_t& b);

  int16_t addShort(const int16_t& a, const int16_t& b);

  uint16_t addUnsignedShort(const uint16_t& a, const uint16_t& b);

  int32_t addLong(const int32_t& a, const int32_t& b);

  uint32_t addUnsignedLong(const uint32_t& a, const uint32_t& b);

  std::string show(const std::string& str);

  void setvalue(const bool& flag, const double& f, const double& d,
  const double& uf, const double& ud);

 private:
  bool vBoolean_;

  double vFloat_;

  double vUnrestrictFloat_;

  double vDouble_;

  double vUnrestrictDouble_;
};

#endif  // _PRIMITIVESPARAM_H_
