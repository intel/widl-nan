// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#include "buffer.h"

#include <string.h>

Buffer::Buffer() {
  data_ = "hello world!";
}

Buffer::~Buffer() {
}

ArrayBufferHelper Buffer::getArrayBuffer() const {
  char* text = "hello world!";
  return ArrayBufferHelper(text, strlen(text));
}

ArrayBufferHelper Buffer::getCommonData() {
  static char* raw_buf = "static buffer test data";
  return ArrayBufferHelper(raw_buf, strlen(raw_buf));
}
