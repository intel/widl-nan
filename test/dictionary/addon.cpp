// Add your copyright and license header

#include "gen/nan__point.h"

#include "gen/nan__painter.h"

void initModule(v8::Local<v8::Object> exports) {
  NanPoint::Init(exports);

  NanPainter::Init(exports);
}

NODE_MODULE(testAttributes, initModule);
