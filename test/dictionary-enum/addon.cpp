// Add your copyright and license header

#include "gen/nan__computing_device_network.h"

void initModule(v8::Local<v8::Object> exports) {
  NanComputingDeviceNetwork::Init(exports);
}

NODE_MODULE(testAttributes, initModule);
