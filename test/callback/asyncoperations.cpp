

#include "asyncoperations.h"

AsyncOperations::AsyncOperations() {
  // TODO: init your members
}

AsyncOperations::~AsyncOperations() {
  // TODO: do cleanup if necessary

}

void AsyncOperations::performOperation(AsyncOperationCallbackHelper* whenFinished) {
  // TODO: use a collection if you want to hold multiple callbacks at the same time
  this->asyncoperationcallbackhelper_.reset(whenFinished);
  // TODO: use this->CallAsyncOperationCallbackHelper()
  //       to call JavaScript callback function in the future (Do NOT do it a thread)

  // TODO: fill your code here
  CallAsyncOperationCallbackHelper("pending");
}

void AsyncOperations::performAnotherOperation(AnotherOperationCallbackHelper* whenStarted) {
  // TODO: use a collection if you want to hold multiple callbacks at the same time
  this->anotheroperationcallbackhelper_.reset(whenStarted);
  // TODO: use this->CallAnotherOperationCallbackHelper()
  //       to call JavaScript callback function in the future (Do NOT do it a thread)

  // TODO: fill your code here
  CallAnotherOperationCallbackHelper("working", 0.56);
}
