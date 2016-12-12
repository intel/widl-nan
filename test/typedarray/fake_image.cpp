// To add your copyright and license header

#include "fake_image.h"

FakeImage::FakeImage() {
  length_ = 1024;
  data_ = new char[length_];
  for (int i = 0 ; i < length_ ; ++i) {
    data_[i] = 0;
  }

  rawBuffer_.Set(data_, 0, 1024);
}

FakeImage::FakeImage(const FakeImage& rhs) {
}

FakeImage::~FakeImage() {
  delete data_;
}

FakeImage& FakeImage::operator = (const FakeImage& rhs) {
  // if (&rhs != this) {
  // }
  return *this;
}

void FakeImage::setData(const uint32_t& offset, const uint8_t& data) {
  if (offset < length_) {
    data_[offset] = data;
  }
}

int8_t FakeImage::getData(const uint32_t& offset) {
  if (offset < length_) {
    return data_[offset];
  }
}

Int8ArrayHelper FakeImage::asInt8Array() {
  return Int8ArrayHelper(data_, 0, length_);
}

Uint8ArrayHelper FakeImage::asUint8Array() {
  return Uint8ArrayHelper(data_, 0, length_);
}

Uint8ClampedArrayHelper FakeImage::asUint8ClampedArray() {
  return Uint8ClampedArrayHelper(data_, 0, length_);
}

Int16ArrayHelper FakeImage::asInt16Array() {
  return Int16ArrayHelper(data_, 0, length_ / 2);
}

Uint16ArrayHelper FakeImage::asUint16Array() {
  return Uint16ArrayHelper(data_, 0, length_ / 2);
}

Int32ArrayHelper FakeImage::asInt32Array() {
  return Int32ArrayHelper(data_, 0, length_ / 4);
}

Uint32ArrayHelper FakeImage::asUint32Array() {
  return Uint32ArrayHelper(data_, 0, length_ / 4);
}

Float32ArrayHelper FakeImage::asFloat32Array() {
  return Float32ArrayHelper(data_, 0, length_ / 4);
}

Float64ArrayHelper FakeImage::asFloat64Array() {
  return Float64ArrayHelper(data_, 0, length_ / 8);
}

Float32ArrayHelper FakeImage::getStaticArray() {
  return Float32ArrayHelper(nullptr, 0, 0);
}
