// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.
//
// TODO: This file can be generated automatically.

#include "nan__b.h"

void initModule(v8::Local<v8::Object> exports) {
  NanB::Init(exports);
}

NODE_MODULE(testerAddon, initModule);
