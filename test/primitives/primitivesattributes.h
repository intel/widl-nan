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

#ifndef _PRIMITIVESATTRIBUTES_H_
#define _PRIMITIVESATTRIBUTES_H_

#include <node.h>
#include <v8.h>

#include <string>

#include "gen/generator_helper.h"

class PrimitivesAttributes {
 public:
  PrimitivesAttributes();

  ~PrimitivesAttributes();

  PrimitivesAttributes& operator = (const PrimitivesAttributes& rhs);

 public:
  int8_t get_vByte() const {
    return this->vByte_;
  }

  void set_vByte(const int8_t& new_value) {
    this->vByte_ = new_value;
  }

  uint8_t get_vOctet() const {
    return this->vOctet_;
  }

  void set_vOctet(const uint8_t& new_value) {
    this->vOctet_ = new_value;
  }

  int16_t get_vShort() const {
    return this->vShort_;
  }

  void set_vShort(const int16_t& new_value) {
    this->vShort_ = new_value;
  }

  uint16_t get_vUnsignedShort() const {
    return this->vUnsignedShort_;
  }

  void set_vUnsignedShort(const uint16_t& new_value) {
    this->vUnsignedShort_ = new_value;
  }

  int32_t get_vLong() const {
    return this->vLong_;
  }

  void set_vLong(const int32_t& new_value) {
    this->vLong_ = new_value;
  }

  uint32_t get_vUnsignedLong() const {
    return this->vUnsignedLong_;
  }

  void set_vUnsignedLong(const uint32_t& new_value) {
    this->vUnsignedLong_ = new_value;
  }

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

 private:
  int8_t vByte_;

  uint8_t vOctet_;

  int16_t vShort_;

  uint16_t vUnsignedShort_;

  int32_t vLong_;

  uint32_t vUnsignedLong_;

  bool vBoolean_;

  double vFloat_;

  double vUnrestrictFloat_;

  double vDouble_;

  double vUnrestrictDouble_;
};

#endif  // _PRIMITIVESATTRIBUTES_H_
