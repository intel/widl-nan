// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#include "primitivesattributes.h"

PrimitivesAttributes::PrimitivesAttributes()
     : vByte_(-128),
       vOctet_(255),
       vShort_(-32768),
       vUnsignedShort_(65535),
       vLong_(-200000),
       vUnsignedLong_(200000) {
}

PrimitivesAttributes::~PrimitivesAttributes() {
}

PrimitivesAttributes& PrimitivesAttributes::operator =
    (const PrimitivesAttributes& rhs) {
  if (&rhs != this) {
    // TODO(widl-nan): copy members from rhs
  }
  return *this;
}
