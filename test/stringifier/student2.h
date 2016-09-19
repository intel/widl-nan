// To add your copyright and license header

#ifndef _STUDENT2_H_
#define _STUDENT2_H_

#include <node.h>
#include <v8.h>

#include <string>

#include "gen/generator_helper.h"
#include "gen/array_helper.h"

class Student2 {
 public:
  Student2();

  ~Student2();

  Student2& operator = (const Student2& rhs);

 public:
  std::string ToString() const;

  uint32_t get_id() const {
    return this->id_;
  }

  void set_id(const uint32_t& new_value) {
    this->id_ = new_value;
  }

  std::string get_familyName() const {
    return this->familyName_;
  }

  void set_familyName(const std::string& new_value) {
    this->familyName_ = new_value;
  }

  std::string get_givenName() const {
    return this->givenName_;
  }

  void set_givenName(const std::string& new_value) {
    this->givenName_ = new_value;
  }

  void SetJavaScriptThis(v8::Local<v8::Object> obj) {
    // Ignore this if you don't need it
    // Typical usage: emit an event on `obj`
  }

 private:
  uint32_t id_;

  std::string familyName_;

  std::string givenName_;
};

#endif  // _STUDENT2_H_
