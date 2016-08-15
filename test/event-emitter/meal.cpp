// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#include "meal.h"

#include <sstream>

CookHelper::CookHelper() {
}

CookHelper::~CookHelper() {
}

// Running in worker thread, to set up the pipeline
bool CookHelper::ThreadStarter() {
  state_ = "started";
  return true;
}

// Running in worker thread, to deal with the pipeline loop
bool CookHelper::ThreadWorker(long long numOfLoops) {
  std::stringstream ss;
  ss << "loop: #" << numOfLoops;
  state_ = ss.str();

  return false;  // Only one single loop and then exit the thread
}

// Running in worker thread, to clean things up
void CookHelper::ThreadCleaner() {
}

// Running in main thread
void CookHelper::OnSingleLoopFinished(const EventEmitter& emitter) {
  v8::Local<v8::Value> argv[2] = {
    Nan::New("microwaveding").ToLocalChecked(),
    Nan::New(state_.c_str()).ToLocalChecked()
  };

  emitter.Emit(2, argv);
}

Meal::Meal() {
  is_raw_meal_ = true;
  helper_ = new CookHelper();
}

Meal::~Meal() {
  delete helper_;
}

void Meal::initialize() {
  is_raw_meal_ = true;
}

v8::Handle<v8::Promise> Meal::cook(const std::string& chefName) {
  return helper_->StartThread();
}
