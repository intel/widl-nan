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

class PrimitivesReturn {
 public:
  PrimitivesReturn();

  ~PrimitivesReturn();

 public:
  int8_t showByte();

  uint8_t showOctet();

  int16_t showShort();

  uint16_t showUnsignedShort();

  int32_t showLong();

  uint32_t showUnsignedLong();

  std::string showDOMString();
};

#endif  // _PRIMITIVESRETURN_H_
