// Copyright (c) 2016 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

#ifndef _B_H_
#define _B_H_

#include <node.h>
#include <v8.h>

#include <string>

class B {
 public:
  B();
  ~B();

 public:
  std::string f(const std::string& w);

  std::string f(const long& w, const float& x);

  std::string f(const float& w, const std::string& y);
};

#endif  // _B_H_
