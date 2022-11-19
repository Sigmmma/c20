module.exports = {
  //primitives
  byte: {size: 1},
  bool: {size: 1},
  char: {size: 1},
  uint8: {size: 1},
  int8: {size: 1},
  uint16: {size: 2},
  int16: {size: 2},
  int32: {size: 4},
  uint32: {size: 4},
  int64: {size: 8},
  uint64: {size: 8},
  float: {size: 4},
  double: {size: 8},
  //variable-size types
  pad: {},
  "UTF-8": {},
  "UTF-16": {},
  //pointer types
  ptr32: {
    size: 4,
    args: ["T"],
  },
  ptr64: {
    size: 8,
    args: ["T"],
  },
};
