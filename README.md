# Purpose

This toolchain transcompiles [W3C Web IDL](https://www.w3.org/TR/WebIDL/) and [Version 2](https://heycam.github.io/webidl/) to the [NAN](https://github.com/nodejs/nan) C++ code. This tool improve efficiency of [Node.js Addon](https://nodejs.org/api/addons.html) developing, allows developers focus on spec definition and actual implementation codes.

This bindings code is highly repetitive, primarily passing values (arguments and return values) between V8 and native and doing various conversions and checks (e.g., type checking), hence it is mostly machine-generated.

# Getting started

Any folder under test can be example of how to use this toolchain. To be added.

# Contribution
We're welcome any kind of contribution for this tool, reporting bugs/features, pull requests, etc.

## Bug tracking system

We're using [JIRA](https://crosswalk-project.org/jira) instead of github issues for tracking. Please report related bug and feature request under component **Node RealSense** with **[widl]** prefix. To avoid duplication, please check the exsiting bugs (filter https://crosswalk-project.org/jira/issues/?filter=14420) before reporting.

## Coding style guideline

We're following [Chromium coding style](https://chromium.googlesource.com/chromium/src/+/master/styleguide/styleguide.md) for different languages: [C++](https://chromium.googlesource.com/chromium/src/+/master/styleguide/c++/c++.md), [Python](https://google.github.io/styleguide/pyguide.html) and [JavaScript](https://google.github.io/styleguide/javascriptguide.xml). Please run style checker `python ./tools/lint.py` before submitting your code. [depot_tools](https://www.chromium.org/developers/how-tos/install-depot-tools) need to be installed and added to `PATH` env.

## Commit message guideline
A comprehensive commit message will help reviewer to understand what your PR is trying to resolve. There are lots of article to share experience how to write a good commit message, please Google them or check any commit message on mature projects. For eg: https://cs.chromium.org/

To close a related Jira issue, add a line with the format **BUG=XWALK-N** or **BUG=https://path/to/issue/XWALK-N**. Doing this will resolve the corresponding issue in Jira when the PR is merged.

If a PR doesn't completely fix an issue, do not use the "BUG=" prefix, as the JIRA ticket would then be wrongly closed. A different prefix, such as **Related to: XWALK-N**, is fine and preferred over just stating the ticket number.

If a PR fixes multiple issues, reference them on separate lines of the description, starting each with "BUG=".

Note that although the prefix is "BUG=", this mechanism applies to features and tasks as well.
