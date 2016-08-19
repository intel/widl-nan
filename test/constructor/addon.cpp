// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#include "gen/nan__container_class.h"
#include "gen/nan__my_class.h"
#include "gen/nan__no_constructor_class.h"

void initModule(v8::Local<v8::Object> exports) {
  NanMyClass::Init(exports);

  NanNoConstructorClass::Init(exports);

  NanContainerClass::Init(exports);
}

NODE_MODULE(testAttributes, initModule);
