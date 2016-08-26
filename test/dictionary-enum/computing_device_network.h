// To add your copyright and license header

#ifndef _COMPUTING_DEVICE_NETWORK_H_
#define _COMPUTING_DEVICE_NETWORK_H_

#include <node.h>
#include <v8.h>

#include <string>

#include "gen/generator_helper.h"

#include "gen/node_attr.h"

class ComputingDeviceNetwork {
 public:
  ComputingDeviceNetwork();

  ~ComputingDeviceNetwork();

  ComputingDeviceNetwork& operator = (const ComputingDeviceNetwork& rhs);

 public:
  std::string get_name() const {
    return this->name_;
  }

  double get_quantity() const {
    return this->quantity_;
  }

  std::string get_type() const {
    return this->type_;
  }

  void addNode(const NodeAttr& node);

  NodeAttr getLastNode();

  void SetJavaScriptThis(v8::Local<v8::Object> obj) {
    // Ignore this if you don't need it
    // Typical usage: emit an event on `obj`
  }

 private:
  std::string name_;

  double quantity_;

  std::string type_;
};

#endif  // _COMPUTING_DEVICE_NETWORK_H_
