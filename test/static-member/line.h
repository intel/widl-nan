// To add your copyright and license header

#ifndef _LINE_H_
#define _LINE_H_

#include <node.h>
#include <v8.h>

#include <string>

#include "gen/generator_helper.h"

#include "point.h"

class Line {
 public:
  Line();

  explicit Line(const Point& pt1, const Point& pt2);

  explicit Line(const int32_t& x1, const int32_t& y1,
    const int32_t& x2, const int32_t& y2);

  ~Line();

  Line& operator = (const Line& rhs);

 public:
  Point get_startPt() const {
    return this->startPt_;
  }

  void set_startPt(const Point& new_value) {
    this->startPt_ = new_value;
  }

  Point get_endPt() const {
    return this->endPt_;
  }

  void set_endPt(const Point& new_value) {
    this->endPt_ = new_value;
  }

  Point get_centerPt() const {
    return this->centerPt_;
  }

  static int32_t get_pointsInALine() {
    return 2;
  }

  static std::string get_createdBy() {
    return "";
  }

  static void set_createdBy(const std::string& new_value) {
  }

  static Point* intersectionPoint(const Line& lineA, const Line& lineB);

  void offset(const Point& pt);

  void SetJavaScriptThis(v8::Local<v8::Object> obj) {
    // Ignore this if you don't need it
    // Typical usage: emit an event on `obj`
  }

 private:
  Point startPt_;

  Point endPt_;

  Point centerPt_;  // Should be calculated, ignore for now

  Point offset_;
};

#endif  // _LINE_H_
