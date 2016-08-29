// Add your copyright and license header

#include "gen/nan__point.h"

#include "gen/nan__line.h"

void initModule(v8::Local<v8::Object> exports) {
  NanPoint::Init(exports);

  NanLine::Init(exports);

}

NODE_MODULE(testAttributes, initModule);
