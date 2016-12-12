// Add your copyright and license header

#include "gen/nan__fake_image.h"

void initModule(v8::Local<v8::Object> exports) {
  NanFakeImage::Init(exports);
}

NODE_MODULE(testAttributes, initModule);
