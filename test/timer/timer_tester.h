// To add your copyright and license header

#ifndef _TIMER_TESTER_H_
#define _TIMER_TESTER_H_

#include <node.h>
#include <v8.h>

#include <string>

#include "gen/generator_helper.h"
#include "gen/array_helper.h"

class TimerTester {
 public:
  TimerTester();

  TimerTester(const TimerTester& rhs);

  ~TimerTester();

  TimerTester& operator = (const TimerTester& rhs);

 public:
  int32_t get_taskCounter() const {
    return this->taskCounter_;
  }

  void set_taskCounter(const int32_t& new_value) {
    this->taskCounter_ = new_value;
  }

  v8::Handle<v8::Promise> startDelayedTask(const int32_t& timeout);

  void startRegularTask(const int32_t& timeout, const int32_t& repeatTimes);

  void SetJavaScriptThis(v8::Local<v8::Object> obj) {
    // Ignore this if you don't need it
    // Typical usage: emit an event on `obj`
  }

 private:
  int32_t taskCounter_;
};

#endif  // _TIMER_TESTER_H_
