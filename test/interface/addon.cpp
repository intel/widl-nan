// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.
//
// This file can be generated automatically.

#include "gen/nan__button.h"
#include "gen/nan__circle.h"
#include "gen/nan__dimensions.h"
#include "gen/nan__painter.h"
#include "gen/nan__point.h"

void initModule(v8::Local<v8::Object> exports) {
  NanDimensions::Init(exports);
  NanButton::Init(exports);
  NanPoint::Init(exports);
  NanCircle::Init(exports);
  NanPainter::Init(exports);
}

NODE_MODULE(testerAddon, initModule);
