// To add your copyright and license header

#include "color_creator.h"
#include <string>
#include <sstream>
#include <cmath>

ColorCreator::ColorCreator() {
  // TODO(widl-nan): init your members
}

ColorCreator::~ColorCreator() {
  // TODO(widl-nan): do cleanup if necessary
}

ColorCreator& ColorCreator::operator = (const ColorCreator& rhs) {
  if (&rhs != this) {
    // TODO(widl-nan): copy members from rhs
  }
  return *this;
}

std::string ColorCreator::createColor(const double& r,
    const double& g, const double& b, const double& alpha) {
  // TODO(widl-nan): fill your code here
  std::stringstream ss;
  ss << r << "," << g << "," << b << ",";
  if (std::isnan(alpha)) {
    ss << "Undefined";
  } else {
    ss << alpha;
  }
  return ss.str();
}

std::string ColorCreator::createColor2(const double& r,
    const double& g, const double& b, const double& alpha) {
  // TODO(widl-nan): fill your code here
  std::stringstream ss;
  ss << r << "," << g << "," << b << ",";
  if (std::isnan(alpha)) {
    ss << "Undefined";
  } else {
    ss << alpha;
  }
  return ss.str();
}

std::string ColorCreator::primitiveTypeCoverage1(const double& r,
    const double& g, const double& b, const double& alpha) {
  // TODO(widl-nan): fill your code here
  std::stringstream ss;
  ss << r << "," << g << "," << b << ",";
  ss << alpha;
  return ss.str();
}

std::string ColorCreator::primitiveTypeCoverage2(const double& r,
    const double& g, const double& b, const double& alpha) {
  // TODO(widl-nan): fill your code here
  std::stringstream ss;
  ss << r << "," << g << "," << b << ",";
  ss << alpha;
  return ss.str();
}

std::string ColorCreator::primitiveTypeCoverage3(const double& r,
    const double& g, const double& b, const double& alpha) {
  // TODO(widl-nan): fill your code here
  std::stringstream ss;
  ss << r << "," << g << "," << b << ",";
  ss << alpha;
  return ss.str();
}

std::string ColorCreator::primitiveTypeCoverage4(const double& r,
    const double& g, const double& b, const int8_t& alpha) {
  // TODO(widl-nan): fill your code here
  std::stringstream ss;
  ss << r << "," << g << "," << b << ",";
  ss << static_cast<int16_t>(alpha);
  return ss.str();
}

std::string ColorCreator::primitiveTypeCoverage5(const double& r,
    const double& g, const double& b, const uint8_t& alpha) {
  // TODO(widl-nan): fill your code here
  std::stringstream ss;
  ss << r << "," << g << "," << b << ",";
  ss << static_cast<uint16_t>(alpha);
  return ss.str();
}

std::string ColorCreator::primitiveTypeCoverage6(const double& r,
    const double& g, const double& b, const int16_t& alpha) {
  // TODO(widl-nan): fill your code here
  std::stringstream ss;
  ss << r << "," << g << "," << b << ",";
  ss << alpha;
  return ss.str();
}

std::string ColorCreator::primitiveTypeCoverage7(const double& r,
    const double& g, const double& b, const uint16_t& alpha) {
  // TODO(widl-nan): fill your code here
  std::stringstream ss;
  ss << r << "," << g << "," << b << ",";
  ss << alpha;
  return ss.str();
}

std::string ColorCreator::primitiveTypeCoverage8(const double& r,
    const double& g, const double& b, const int32_t& alpha) {
  // TODO(widl-nan): fill your code here
  std::stringstream ss;
  ss << r << "," << g << "," << b << ",";
  ss << alpha;
  return ss.str();
}

std::string ColorCreator::primitiveTypeCoverage9(const double& r,
    const double& g, const double& b, const uint32_t& alpha) {
  // TODO(widl-nan): fill your code here
  std::stringstream ss;
  ss << r << "," << g << "," << b << ",";
  ss << alpha;
  return ss.str();
}

std::string ColorCreator::primitiveTypeCoverage10(const double& r,
    const double& g, const double& b, const int64_t& alpha) {
  // TODO(widl-nan): fill your code here
  std::stringstream ss;
  ss << r << "," << g << "," << b << ",";
  ss << alpha;
  return ss.str();
}

std::string ColorCreator::primitiveTypeCoverage11(const double& r,
    const double& g, const double& b, const uint64_t& alpha) {
  // TODO(widl-nan): fill your code here
  std::stringstream ss;
  ss << r << "," << g << "," << b << ",";
  ss << alpha;
  return ss.str();
}

std::string ColorCreator::primitiveTypeCoverage12(const double& r,
    const double& g, const double& b, const std::string& alpha) {
  // TODO(widl-nan): fill your code here
  std::stringstream ss;
  ss << r << "," << g << "," << b << ",";
  ss << alpha;
  return ss.str();
}

std::string ColorCreator::primitiveTypeCoverage13(const double& r,
    const double& g, const double& b, const bool& alpha) {
  // TODO(widl-nan): fill your code here
  std::stringstream ss;
  ss << r << "," << g << "," << b << ",";
  if (alpha == true) {
    ss << "true";
  } else if (alpha == false) {
    ss << "false";
  } else {
    ss << "INVALID_BOOL_VALUE";
  }
  return ss.str();
}
