// To add your copyright and license header

#ifndef _COLORCREATOR_H_
#define _COLORCREATOR_H_

#include <node.h>
#include <v8.h>

#include <string>

#include "gen/generator_helper.h"

class ColorCreator {
 public:
  ColorCreator();

  ~ColorCreator();

  ColorCreator& operator = (const ColorCreator& rhs);

 public:
  std::string createColor(const double& r, const double& g,
      const double& b, const double& alpha);

  std::string createColor2(const double& r, const double& g,
      const double& b, const double& alpha);

  std::string primitiveTypeCoverage1(const double& r, const double& g,
      const double& b, const double& alpha);

  std::string primitiveTypeCoverage2(const double& r, const double& g,
      const double& b, const double& alpha);

  std::string primitiveTypeCoverage3(const double& r, const double& g,
      const double& b, const double& alpha);

  std::string primitiveTypeCoverage4(const double& r, const double& g,
      const double& b, const int8_t& alpha);

  std::string primitiveTypeCoverage5(const double& r, const double& g,
      const double& b, const uint8_t& alpha);

  std::string primitiveTypeCoverage6(const double& r, const double& g,
      const double& b, const int16_t& alpha);

  std::string primitiveTypeCoverage7(const double& r, const double& g,
      const double& b, const uint16_t& alpha);

  std::string primitiveTypeCoverage8(const double& r, const double& g,
      const double& b, const int32_t& alpha);

  std::string primitiveTypeCoverage9(const double& r, const double& g,
      const double& b, const uint32_t& alpha);

  std::string primitiveTypeCoverage10(const double& r, const double& g,
      const double& b, const int64_t& alpha);

  std::string primitiveTypeCoverage11(const double& r, const double& g,
      const double& b, const uint64_t& alpha);

  std::string primitiveTypeCoverage12(const double& r, const double& g,
      const double& b, const std::string& alpha);

  std::string primitiveTypeCoverage13(const double& r, const double& g,
      const double& b, const bool& alpha);

 private:
};

#endif  // _COLORCREATOR_H_
