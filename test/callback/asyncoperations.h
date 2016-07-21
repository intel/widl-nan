

#ifndef _ASYNCOPERATIONS_H_
#define _ASYNCOPERATIONS_H_
#include <string>
#include <node.h>
#include <v8.h>
#include "generator_helper.h"

class AsyncOperationCallbackHelper
    : public CallbackHelperBase {
 public:
  AsyncOperationCallbackHelper() {
  }

  virtual ~ AsyncOperationCallbackHelper() {
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

class AnotherOperationCallbackHelper
    : public CallbackHelperBase {
 public:
  AnotherOperationCallbackHelper() {
  }

  virtual ~ AnotherOperationCallbackHelper() {
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

  explicit AsyncOperations();

  ~AsyncOperations ();

 public:

  void performOperation(AsyncOperationCallbackHelper* whenFinished);

  void performAnotherOperation(AnotherOperationCallbackHelper* whenStarted);

 private:

  // TODO: use a collection if you want to hold multiple callbacks at the same time
  std::unique_ptr<AsyncOperationCallbackHelper> asyncoperationcallbackhelper_;

  void CallAsyncOperationCallbackHelper(const std::string& status) {
    // TODO: use a collection if you want to hold multiple callbacks at the same time
    asyncoperationcallbackhelper_->CallJavaScriptFunction(status);
  }

  // TODO: use a collection if you want to hold multiple callbacks at the same time
  std::unique_ptr<AnotherOperationCallbackHelper> anotheroperationcallbackhelper_;

  void CallAnotherOperationCallbackHelper(const std::string& type, const double& value) {
    // TODO: use a collection if you want to hold multiple callbacks at the same time
    anotheroperationcallbackhelper_->CallJavaScriptFunction(type, value);
  }

};

#endif // _ASYNCOPERATIONS_H_
