// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.
//
// TODO: This file can be generated automatically.

#include <node.h>
#include <nan.h>

#include <sstream>
#include <iostream>
#include <iomanip>
#include <thread>
#include <algorithm>
#include <chrono>
#include <tuple>

#include "nan__meal.h"

void initModule(v8::Local<v8::Object> exports) {
  NanMeal::Init(exports);
}

NODE_MODULE(testerAddon, initModule);
