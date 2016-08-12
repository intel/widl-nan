// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#include "meal.h"

Meal::Meal() {
  isRawMeal_ = true;
}

Meal::~Meal() {
}

void Meal::initialize() {
  isRawMeal_ = true;
}

v8::Handle<v8::Promise> Meal::cook(const std::string& chefName) {
  // TODO(widl-nan): fill your code here
  using ResolverPersistent = Nan::Persistent<v8::Promise::Resolver>;

  auto period = 3000; // In ms
  auto resolver = v8::Promise::Resolver::New(v8::Isolate::GetCurrent());
  auto persistent = new ResolverPersistent(resolver);

  struct MealData {
    Meal* myself;
    ResolverPersistent* persistent;
  };

  uv_timer_t* handle = new uv_timer_t;
  handle->data = new MealData{this, persistent};
  uv_timer_init(uv_default_loop(), handle);

  // use capture-less lambda for c-callback
  auto timercb = [](uv_timer_t* handle) -> void {
    Nan::HandleScope scope;

    auto persistent = static_cast<MealData*>(handle->data)->persistent;
    auto myself = static_cast<MealData*>(handle->data)->myself;
    delete static_cast<MealData*>(handle->data);

    uv_timer_stop(handle);
    uv_close(reinterpret_cast<uv_handle_t*>(handle),
             [](uv_handle_t* handle) -> void {delete handle;});

    myself->isRawMeal_ = false;
  
    auto resolver = Nan::New(*persistent);
    resolver->Resolve(Nan::New("Microwave Ding").ToLocalChecked());

    persistent->Reset();
    delete persistent;
  };
  uv_timer_start(handle, timercb, period, 0);

  return resolver->GetPromise();
}
