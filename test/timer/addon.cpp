// Add your copyright and license header

#include "gen/nan__timer_tester.h"

void initModule(v8::Local<v8::Object> exports) {
  NanTimerTester::Init(exports);
}

NODE_MODULE(testAttributes, initModule);
