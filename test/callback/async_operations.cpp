// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#include "async_operations.h"

AsyncOperations::AsyncOperations() {
}

AsyncOperations::~AsyncOperations() {
}

void AsyncOperations::performOperation(
    AsyncOperationCallbackHelper* whenFinished) {
  // TODO(Kenny): use a collection if you want to hold multiple callbacks
  // at the same time
  this->async_operation_callback_helper_.reset(whenFinished);
  // TODO(Kenny): use this->CallAsyncOperationCallbackHelper()
  // to call JavaScript callback function in the future (Do NOT do it a thread)

  // TODO(Kenny): fill your code here
  CallAsyncOperationCallbackHelper("pending");
}

void AsyncOperations::performAnotherOperation(
    AnotherOperationCallbackHelper* whenStarted) {
  // TODO(Kenny): use a collection if you want to hold multiple callbacks
  // at the same time
  this->another_operation_callback_helper_.reset(whenStarted);
  // TODO(Kenny): use this->CallAsyncOperationCallbackHelper()
  // to call JavaScript callback function in the future (Do NOT do it a thread)

  // TODO(Kenny): fill your code here
  CallAnotherOperationCallbackHelper("working", 0.56);
}
