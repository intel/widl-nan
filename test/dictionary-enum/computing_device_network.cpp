// To add your copyright and license header

#include "computing_device_network.h"

ComputingDeviceNetwork::ComputingDeviceNetwork() {
  // TODO(widl-nan): init your members
}

ComputingDeviceNetwork::~ComputingDeviceNetwork() {
  // TODO(widl-nan): do cleanup if necessary
}

ComputingDeviceNetwork& ComputingDeviceNetwork::operator = (
    const ComputingDeviceNetwork& rhs) {
  if (&rhs != this) {
    // TODO(widl-nan): copy members from rhs
  }
  return *this;
}

void ComputingDeviceNetwork::addNode(const NodeAttr& node) {
  // TODO(widl-nan): fill your code here
  name_ = node.get_name();
  quantity_ = node.get_quantity();
  type_ = node.get_type();
}

NodeAttr ComputingDeviceNetwork::getLastNode() {
  // TODO(widl-nan): fill your code here
  NodeAttr attr;
  attr.set_name(name_);
  attr.set_quantity(quantity_);
  attr.set_type(type_);
  return attr;
}
