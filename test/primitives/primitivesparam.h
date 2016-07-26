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

class PrimitivesParam {
 public:
  PrimitivesParam();

  ~PrimitivesParam();

 public:
  int8_t addByte(const int8_t& a, const int8_t& b);

  uint8_t addOctet(const uint8_t& a, const uint8_t& b);

  int16_t addShort(const int16_t& a, const int16_t& b);

  uint16_t addUnsignedShort(const uint16_t& a, const uint16_t& b);

  int32_t addLong(const int32_t& a, const int32_t& b);

  uint32_t addUnsignedLong(const uint32_t& a, const uint32_t& b);

  std::string show(const std::string& str);
};

#endif  // _PRIMITIVESPARAM_H_
