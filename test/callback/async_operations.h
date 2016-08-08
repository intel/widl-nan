// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#ifndef _ASYNCOPERATIONS_H_
#define _ASYNCOPERATIONS_H_

#include <node.h>
#include <v8.h>

#include <memory>
#include <string>

#include "gen/generator_helper.h"

class AsyncOperationCallbackHelper : public CallbackHelperBase {
 public:
  AsyncOperationCallbackHelper() {
  }

  virtual ~AsyncOperationCallbackHelper() {
  }

  void CallJavaScriptFunction(const std::string& status) {
    Nan::HandleScope scope;
    auto js_func = Nan::New<v8::Function>(v8_function_);
    auto js_this = Nan::New<v8::Object>(v8_this_);
    const int argc = 1;
    v8::Local<v8::Value> argv[argc] = {
      Nan::New(status).ToLocalChecked()
    };
    auto ret_value = js_func->Call(js_this, argc, argv);
    if (ret_value->IsString()) {
      v8::String::Utf8Value value(ret_value);
      std::string str(*value);
      printf("String came from JavaScript: %s\n", str.c_str());
    }
  }
};

class AnotherOperationCallbackHelper : public CallbackHelperBase {
 public:
  AnotherOperationCallbackHelper() {
  }

  virtual ~AnotherOperationCallbackHelper() {
  }

  void CallJavaScriptFunction(const std::string& type, const double& value) {
    Nan::HandleScope scope;
    auto js_func = Nan::New<v8::Function>(v8_function_);
    auto js_this = Nan::New<v8::Object>(v8_this_);
    const int argc = 2;
    v8::Local<v8::Value> argv[argc] = {
      Nan::New(type).ToLocalChecked(),
      Nan::New(value)
    };
    auto ret_value = js_func->Call(js_this, argc, argv);
    if (ret_value->IsString()) {
      v8::String::Utf8Value value(ret_value);
      std::string str(*value);
      printf("String came from JavaScript: %s\n", str.c_str());
    }
  }
};

class AsyncOperations {
 public:
  AsyncOperations();
  ~AsyncOperations();

 public:
  void performOperation(AsyncOperationCallbackHelper* whenFinished);
  void performAnotherOperation(AnotherOperationCallbackHelper* whenStarted);

 private:
  typedef std::shared_ptr<AsyncOperationCallbackHelper> AsyncHelperPtr;
  typedef std::shared_ptr<AnotherOperationCallbackHelper> AnotherHelperPtr;
  // TODO(Kenny): use a collection if you want to hold multiple callbacks
  // at the same time
  AsyncHelperPtr async_operation_callback_helper_;

  void CallAsyncOperationCallbackHelper(const std::string& status) {
    // TODO(Kenny): use a collection if you want to hold multiple callbacks
    // at the same time
    async_operation_callback_helper_->CallJavaScriptFunction(status);
  }

  // TODO(Kenny): use a collection if you want to hold multiple callbacks
  // at the same time
  AnotherHelperPtr another_operation_callback_helper_;

  void CallAnotherOperationCallbackHelper(
      const std::string& type, const double& value) {
    // TODO(Kenny): use a collection if you want to hold multiple callbacks
    // at the same time
    another_operation_callback_helper_->CallJavaScriptFunction(type, value);
  }
};

#endif  // _ASYNCOPERATIONS_H_
