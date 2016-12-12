// To add your copyright and license header

#ifndef _FAKE_IMAGE_H_
#define _FAKE_IMAGE_H_

#include <node.h>
#include <v8.h>

#include <string>

#include "gen/generator_helper.h"
#include "gen/array_helper.h"

class FakeImage {
 public:
  FakeImage();

  FakeImage(const FakeImage& rhs);

  ~FakeImage();

  FakeImage& operator = (const FakeImage& rhs);

 public:
  Uint8ArrayHelper get_rawBuffer() const {
    return this->rawBuffer_;
  }

  uint32_t get_length() const {
    return this->length_;
  }

  void setData(const uint32_t& offset, const uint8_t& data);

  int8_t getData(const uint32_t& offset);

  Int8ArrayHelper asInt8Array();

  Uint8ArrayHelper asUint8Array();

  Uint8ClampedArrayHelper asUint8ClampedArray();

  Int16ArrayHelper asInt16Array();

  Uint16ArrayHelper asUint16Array();

  Int32ArrayHelper asInt32Array();

  Uint32ArrayHelper asUint32Array();

  Float32ArrayHelper asFloat32Array();

  Float64ArrayHelper asFloat64Array();

  static Float32ArrayHelper getStaticArray();

  void SetJavaScriptThis(v8::Local<v8::Object> obj) {
    // Ignore this if you don't need it
    // Typical usage: emit an event on `obj`
  }

 private:
  Uint8ArrayHelper rawBuffer_;

  uint32_t length_;
  char* data_;
};

#endif  // _FAKE_IMAGE_H_
