// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#ifndef _MEAL_H_
#define _MEAL_H_

#include <node.h>
#include <nan.h>

#include <string>

#include "thread-event-helper.h"

class CookHelper : public ThreadEventHelper {
 public:
  CookHelper();
  virtual ~CookHelper();

 protected:
  // Running in worker thread, to set up the pipeline
  bool ThreadStarter() override;
  // Running in worker thread, to deal with the pipeline loop
  // Return true to continue loop
  bool ThreadWorker(long long numOfLoops) override; //NOLINT
  // Running in worker thread, to clean things up
  void ThreadCleaner() override;
  // Running in main thread
  void OnSingleLoopFinished(const EventEmitter& emitter) override;

 private:
  std::string state_;
};

class Meal {
 public:
  Meal();
  ~Meal();

 public:
  bool get_isRawMeal() const {
    return this->is_raw_meal_;
  }

  void initialize();

  v8::Handle<v8::Promise> cook(const std::string& chefName);

  v8::Handle<v8::Promise> stop();

  void SetJavaScriptThis(v8::Local<v8::Object> JavaScriptThis) {
    helper_->SetJavaScriptThis(JavaScriptThis);
  }

 private:
  bool is_raw_meal_;
  CookHelper* helper_;
};

#endif  // _MEAL_H_
