

#ifndef _PAINTER_H_
#define _PAINTER_H_
#include <string>
#include <node.h>
#include <v8.h>
#include "generator_helper.h"

#include "point.h"

class Painter {
 public:

  explicit Painter();

  ~Painter ();

 public:

  void drawText(const float& x, const float& y, const std::string& text);

  void drawText(const Point& point, const std::string& text);

 private:

};

#endif // _PAINTER_H_
