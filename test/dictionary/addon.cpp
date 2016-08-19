// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#include "gen/nan__painter.h"
#include "gen/nan__point.h"

void initModule(v8::Local<v8::Object> exports) {
  NanPoint::Init(exports);

  NanPainter::Init(exports);
}

NODE_MODULE(testAttributes, initModule);
