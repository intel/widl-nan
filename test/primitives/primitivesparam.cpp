// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#include "primitivesparam.h"

PrimitivesParam::PrimitivesParam() {
}

PrimitivesParam::~PrimitivesParam() {
}

PrimitivesParam& PrimitivesParam::operator =
(const PrimitivesParam& rhs) {
}

int8_t PrimitivesParam::addByte(const int8_t& a, const int8_t& b) {
  return a + b;
}

uint8_t PrimitivesParam::addOctet(const uint8_t& a, const uint8_t& b) {
  return a + b;
}

int16_t PrimitivesParam::addShort(const int16_t& a, const int16_t& b) {
  return a + b;
}

uint16_t PrimitivesParam::addUnsignedShort(
    const uint16_t& a, const uint16_t& b) {
  return a + b;
}

int32_t PrimitivesParam::addLong(
    const int32_t& a, const int32_t& b) {
  return a + b;
}

uint32_t PrimitivesParam::addUnsignedLong(
    const uint32_t& a, const uint32_t& b) {
  return a + b;
}

std::string PrimitivesParam::show(const std::string& str) {
  return str;
}

void PrimitivesParam::setvalue(const bool& flag, const double& f,
const double& d, const double& uf, const double& ud) {
    vBoolean_ = flag;
    vFloat_ = f;
    vDouble_ = d;
    vUnrestrictFloat_ = uf;
    vUnrestrictDouble_ = ud;
}

