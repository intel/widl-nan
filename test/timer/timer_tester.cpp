// To add your copyright and license header

#include "timer_tester.h"

TimerTester::TimerTester() {
  // TODO(widl-nan): init your members
}

TimerTester::TimerTester(const TimerTester& rhs) {
  // TODO(widl-nan): copy from rhs if you want this behavior
  // Or mark ctor = delete in timer_tester.h
}

TimerTester::~TimerTester() {
  // TODO(widl-nan): do cleanup if necessary
}

TimerTester& TimerTester::operator = (const TimerTester& rhs) {
  if (&rhs != this) {
    // TODO(widl-nan): copy members from rhs
  }
  return *this;
}

class DelayedTaskTimer : public WIDLNANPromiseTimer {
 public:
  explicit DelayedTaskTimer(TimerTester* parent) {
    parent_ = parent;
  }
  virtual ~DelayedTaskTimer() {
    parent_ = nullptr;
  }

  virtual bool PromiseTimerCallback() {
    parent_->set_taskCounter(0);
    return true;
  }

 private:
  TimerTester* parent_;
};

class RegularTaskTimer : public WIDLNANTimer {
 public:
  explicit RegularTaskTimer(TimerTester* parent, uint64_t repeatTimes) {
    parent_ = parent;
    repeat_times_ = repeatTimes;
  }

  virtual ~RegularTaskTimer() {
    parent_ = nullptr;
  }

  virtual bool TimerCallback(uint64_t counter) {
    parent_->set_taskCounter(counter);

    if (counter >= repeat_times_) {
      // Don't delete this, parent class will do it
      return false;  // Return false to stop timer from working
    }
    return true;  // Return true to continue working
  }

 private:
  TimerTester* parent_;
  uint64_t repeat_times_;
};

v8::Handle<v8::Promise> TimerTester::startDelayedTask(const int32_t& timeout) {
  auto t = new DelayedTaskTimer(this);
  return t->SetTimeout(timeout);
}

void TimerTester::startRegularTask(const int32_t& timeout,
    const int32_t& repeatTimes) {
  auto t = new RegularTaskTimer(this, repeatTimes);
  t->SetInterval(timeout, timeout);
}

