# Copyright (c) 2016 Intel Corporation. All rights reserved.
# Use of this source code is governed by a MIT-style license that can be
# found in the LICENSE file.
#
# TODO: This file can be generated automatically.
{
  "targets": [
    {
      "target_name": "testerAddon",
      "sources": [
        "addon.cpp",
        "button.cpp",
        "circle.cpp",
        "dimensions.cpp",
        "gen/nan__dimensions.cpp",
        "gen/nan__button.cpp",
        "gen/nan__point.cpp",
        "gen/nan__circle.cpp",
        "gen/nan__painter.cpp",
        "point.cpp",
        "painter.cpp",
      ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")",
        "."
      ],
      "cflags!": [
        "-fno-exceptions"
      ],
      "cflags": [
        "-std=c++11"
      ],
      "cflags_cc!": [
        "-fno-exceptions"
      ],
      "libraries": [
      ],
      "xcode_settings": {
        "OTHER_CFLAGS": [
          "-std=c++11"
        ]
      },
      "conditions": [
        [
          "OS!=\"win\"",
          {
            "cflags+": [
              "-std=c++11"
            ],
            "cflags_c+": [
              "-std=c++11"
            ],
            "cflags_cc+": [
              "-std=c++11"
            ]
          }
        ],
        [
          "OS==\"mac\"",
          {
            "xcode_settings": {
              "OTHER_CPLUSPLUSFLAGS": [
                "-std=c++11",
                "-stdlib=libc++"
              ],
              "OTHER_LDFLAGS": [
                "-stdlib=libc++"
              ],
              "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
              "MACOSX_DEPLOYMENT_TARGET": "10.8"
            }
          }
        ]
      ]
    }
  ]
}
