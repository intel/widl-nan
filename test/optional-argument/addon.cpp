// Add your copyright and license header

#include "gen/nan__color_creator.h"

void initModule(v8::Local<v8::Object> exports) {
  NanColorCreator::Init(exports);

}

NODE_MODULE(testAttributes, initModule);
