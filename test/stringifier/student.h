// To add your copyright and license header

#ifndef _STUDENT_H_
#define _STUDENT_H_

#include <node.h>
#include <v8.h>

#include <string>

#include "gen/generator_helper.h"
#include "gen/array_helper.h"

class Student {
 public:
  Student();

  ~Student();

  Student& operator = (const Student& rhs);

 public:
  // Note: stringifier will use get_name() function

  uint32_t get_id() const {
    return this->id_;
  }

  void set_id(const uint32_t& new_value) {
    this->id_ = new_value;
  }

  std::string get_name() const {
    return this->name_;
  }

  void set_name(const std::string& new_value) {
    this->name_ = new_value;
  }

  void SetJavaScriptThis(v8::Local<v8::Object> obj) {
    // Ignore this if you don't need it
    // Typical usage: emit an event on `obj`
  }

 private:
  uint32_t id_;

  std::string name_;
};

#endif  // _STUDENT_H_
