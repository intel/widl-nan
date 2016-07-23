// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#include "buffer.h"

#include <string.h>

Buffer::Buffer() {
}

Buffer::~Buffer() {
}

ArrayBuffer Buffer::getArrayBuffer() {
  const char* text = "hello world!";

  uint32_t size = strlen(text);
  // Use malloc to allocate memory for node array buffer.
  char* buf = (char*)malloc(size);
  memcpy(buf, text, size);

  ArrayBuffer arrayBuffer;
  arrayBuffer.data = buf;
  arrayBuffer.size = size;
  return arrayBuffer;
}
