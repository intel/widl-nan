// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.
//
// This file can be generated automatically.

#include "gen/nan__buffer.h"

void initModule(v8::Local<v8::Object> exports) {
  NanBuffer::Init(exports);
}

NODE_MODULE(testerAddon, initModule);
