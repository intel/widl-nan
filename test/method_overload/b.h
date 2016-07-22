

#ifndef _B_H_
#define _B_H_
#include <string>
#include <node.h>
#include <v8.h>
#include "generator_helper.h"

class B {
 public:

  B ();

  ~B ();

 public:

  std::string f(const std::string& w);

  std::string f(const long& w, const float& x);

  std::string f(const float& w, const std::string& y);

 private:

};

#endif // _B_H_
