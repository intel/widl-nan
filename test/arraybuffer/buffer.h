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
  ArrayBufferHelper getArrayBuffer() const;

  ArrayBufferHelper get_data() const {
    return ArrayBufferHelper((void*)data_.c_str(), data_.length());
  }

  void set_data(const ArrayBufferHelper& buffer) {
    data_ = std::string((const char*)buffer.GetData(),
      buffer.GetLength());
  }

  std::string buffer2String(const ArrayBufferHelper& arrayBuffer) {
    return std::string((const char*)arrayBuffer.GetData(),
      arrayBuffer.GetLength());
  }

  static ArrayBufferHelper getCommonData();

 private:
  std::string data_;
};

#endif  // _BUFFER_H_
