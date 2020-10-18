const PRIMITIVES = {
  //basic primitives
  int8: {name: "i8"},
  int16: {name: "i16"},
  int32: {name: "i32"},
  uint8: {name: "u8"},
  uint16: {name: "u16"},
  uint32: {name: "u32"},
  float: {name: "f32"},

  //primitive aliases
  Angle: {name: "Angle: f32"},
  Fraction: {name: "Fraction: f32"},
  Index: {name: "Index: u16"},
  Pointer: {name: "Pointer: u32"},
  TagClassInt: {name: "TagEngineID: char[4]"},
  TagString: {name: "char[32]"},

  //composite types
  ColorARGB: {fields: [
    {name: "alpha", type: "f32"},
    {name: "red", type: "f32"},
    {name: "green", type: "f32"},
    {name: "blue", type: "f32"},
  ]},
  ColorARGBInt: {fields: [
    {name: "alpha", type: "u8"},
    {name: "red", type: "u8"},
    {name: "green", type: "u8"},
    {name: "blue", type: "u8"},
  ]},
  ColorRGB: {fields: [
    {name: "red", type: "f32"},
    {name: "green", type: "f32"},
    {name: "blue", type: "f32"},
  ]},
  Euler2D: {fields: [
    {name: "yaw", type: "f32"},
    {name: "pitch", type: "f32"},
  ]},
  Euler3D: {fields: [
    {name: "yaw", type: "f32"},
    {name: "pitch", type: "f32"},
    {name: "roll", type: "f32"},
  ]},
  Matrix: {name: "Matrix3x3", fields: [
    {name: "elements (9)", type: "f32"},
  ]},
  Plane2D: {fields: [
    {name: "i", type: "f32"},
    {name: "j", type: "f32"},
    {name: "d", type: "f32"},
  ]},
  Plane3D: {fields: [
    {name: "i", type: "f32"},
    {name: "j", type: "f32"},
    {name: "k", type: "f32"},
    {name: "d", type: "f32"},
  ]},
  Point2D: {fields: [
    {name: "x", type: "f32"},
    {name: "y", type: "f32"},
  ]},
  Point2DInt: {fields: [
    {name: "x", type: "i16"},
    {name: "y", type: "i16"},
  ]},
  Point3D: {fields: [
    {name: "x", type: "f32"},
    {name: "y", type: "f32"},
    {name: "z", type: "f32"},
  ]},
  Quaternion: {fields: [
    {name: "i", type: "f32"},
    {name: "j", type: "f32"},
    {name: "k", type: "f32"},
    {name: "w", type: "f32"},
  ]},
  Rectangle2D: {fields: [
    {name: "top", type: "i16"},
    {name: "left", type: "i16"},
    {name: "bottom", type: "i16"},
    {name: "right", type: "i16"},
  ]},
  TagDataOffset: {fields: [
    {name: "size", type: "u32"},
    {name: "external", type: "u32"},
    {name: "file offset", type: "u32"},
    {name: "pointer", type: "u64"},
  ]},
  TagID: {name: "TagID: union", fields: [
    {name: "id", type: "u32"},
    {name: "index", type: "u16"},
  ]},
  Vector2D: {fields: [
    {name: "i", type: "f32"},
    {name: "j", type: "f32"},
  ]},
  Vector3D: {fields: [
    {name: "i", type: "f32"},
    {name: "j", type: "f32"},
    {name: "k", type: "f32"},
  ]},
};

//use invader primitive type names to lookup new name and composite fields if available
module.exports = (invaderTypeName) => {
  const extraInfo = PRIMITIVES[invaderTypeName];
  if (extraInfo) {
    const newTypeName = extraInfo.name || invaderTypeName;
    return {typeName: newTypeName, compositeFields: extraInfo.fields};
  }
  return {typeName: invaderTypeName};
};
