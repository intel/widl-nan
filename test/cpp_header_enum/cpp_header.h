#ifndef _CPP_HEADER_H_
#define _CPP_HEADER_H_

namespace dummy {

  enum class ordinal : int32_t
    first = 1,   // Line comment
    second = 2,  /* Block comment */
    third = 3,   // Line comment with expression: use 'third == 3' to ...
    fourth,
    last = 10
  };

  enum number {
    one = 1,
    two,
    three,
    four,
    hundred = 100,
    thousand = 1000
  };

  typedef enum {
    one = 1,
    two,
    three,
    four,
    hundred = 100,
    thousand = 1000
  } another_number;

  typedef enum _yet_another_number {
    one = 1,
    two,
    three,
    four,
    hundred = 100,
    thousand = 1000
  } yet_another_number;

};

#endif // _CPP_HEADER_H_
