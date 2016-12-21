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

  Int16ArrayHelper get_shortArray() const {
    return this->shortArray_;
  }

  void set_shortArray(const Int16ArrayHelper& new_value) {
    DeepCopyFromTypedArrayHelper(new_value,
        shortArray_store_, 512);
    shortArray_.Set(shortArray_store_, 0, new_value.GetLength());
  }

  Int32ArrayHelper get_longArray() const {
    return this->longArray_;
  }

  void set_longArray(const Int32ArrayHelper& new_value) {
    DeepCopyFromTypedArrayHelper(new_value,
        longArray_store_, 256);
    longArray_.Set(longArray_store_, 0, new_value.GetLength());
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

  void setInt8Array(const Int8ArrayHelper& array);

  void setUint8Array(const Uint8ArrayHelper& array);

  void setUint8ClampedArray(const Uint8ClampedArrayHelper& array);

  void setInt16Array(const Int16ArrayHelper& array);

  void setUint16Array(const Uint16ArrayHelper& array);

  void setInt32Array(const Int32ArrayHelper& array);

  void setUint32Array(const Uint32ArrayHelper& array);

  void setFloat32Array(const Float32ArrayHelper& array);

  void setFloat64Array(const Float64ArrayHelper& array);

  void SetJavaScriptThis(v8::Local<v8::Object> obj) {
    // Ignore this if you don't need it
    // Typical usage: emit an event on `obj`
  }

 private:
  void Setup();
  void InitBuffer();
  void CopyFrom(const FakeImage& rhs);

 private:
  Uint8ArrayHelper rawBuffer_;

  uint32_t length_;
  char* data_;

  Int16ArrayHelper shortArray_;
  int16_t shortArray_store_[512];

  Int32ArrayHelper longArray_;
  int32_t longArray_store_[256];
};

#endif  // _FAKE_IMAGE_H_
