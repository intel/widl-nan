// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#ifndef _BUFFER_H_
#define _BUFFER_H_

#include <node.h>
#include <v8.h>

#include <string>

#include "gen/generator_helper.h"

class Buffer {
 public:
  Buffer();
  ~Buffer();

 public:
  ArrayBuffer getArrayBuffer();
};

#endif  // _BUFFER_H_
