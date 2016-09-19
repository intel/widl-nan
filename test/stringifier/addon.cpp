// Add your copyright and license header

#include "gen/nan__student.h"

#include "gen/nan__student2.h"

#include "gen/nan__student3.h"

#include "gen/nan__student4.h"

void initModule(v8::Local<v8::Object> exports) {
  NanStudent::Init(exports);

  NanStudent2::Init(exports);

  NanStudent3::Init(exports);

  NanStudent4::Init(exports);
}

NODE_MODULE(testAttributes, initModule);
