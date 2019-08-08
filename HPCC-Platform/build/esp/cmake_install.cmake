# Install script for directory: /home/sathvik/hpcc/HPCC-Platform/esp

# Set the install prefix
if(NOT DEFINED CMAKE_INSTALL_PREFIX)
  set(CMAKE_INSTALL_PREFIX "/opt/HPCCSystems")
endif()
string(REGEX REPLACE "/$" "" CMAKE_INSTALL_PREFIX "${CMAKE_INSTALL_PREFIX}")

# Set the install configuration name.
if(NOT DEFINED CMAKE_INSTALL_CONFIG_NAME)
  if(BUILD_TYPE)
    string(REGEX REPLACE "^[^A-Za-z0-9_]+" ""
           CMAKE_INSTALL_CONFIG_NAME "${BUILD_TYPE}")
  else()
    set(CMAKE_INSTALL_CONFIG_NAME "Debug")
  endif()
  message(STATUS "Install configuration: \"${CMAKE_INSTALL_CONFIG_NAME}\"")
endif()

# Set the component getting installed.
if(NOT CMAKE_INSTALL_COMPONENT)
  if(COMPONENT)
    message(STATUS "Install component: \"${COMPONENT}\"")
    set(CMAKE_INSTALL_COMPONENT "${COMPONENT}")
  else()
    set(CMAKE_INSTALL_COMPONENT)
  endif()
endif()

# Install shared libraries without execute permission?
if(NOT DEFINED CMAKE_INSTALL_SO_NO_EXE)
  set(CMAKE_INSTALL_SO_NO_EXE "1")
endif()

# Is this installation the result of a crosscompile?
if(NOT DEFINED CMAKE_CROSSCOMPILING)
  set(CMAKE_CROSSCOMPILING "FALSE")
endif()

if(NOT CMAKE_INSTALL_LOCAL_ONLY)
  # Include the install script for each subdirectory.
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/bindings/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/clients/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/eclwatch/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/files/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/src/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/platform/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/protocols/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/scm/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/services/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/smc/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/test/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/tools/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/xslt/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/esdllib/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/logging/cmake_install.cmake")

endif()

