# Install script for directory: /home/sathvik/hpcc/HPCC-Platform

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

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/." TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/LICENSE.txt")
endif()

if(NOT CMAKE_INSTALL_LOCAL_ONLY)
  # Include the install script for each subdirectory.
  include("/home/sathvik/hpcc/HPCC-Platform/build/system/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/initfiles/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/tools/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/common/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/dali/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/deploy/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/deployment/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/ecl/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/ecllibrary/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/fs/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/roxie/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/rtl/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/services/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/thorlcr/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/testing/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/configuration/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/docs/cmake_install.cmake")

endif()

if(CMAKE_INSTALL_COMPONENT)
  set(CMAKE_INSTALL_MANIFEST "install_manifest_${CMAKE_INSTALL_COMPONENT}.txt")
else()
  set(CMAKE_INSTALL_MANIFEST "install_manifest.txt")
endif()

string(REPLACE ";" "\n" CMAKE_INSTALL_MANIFEST_CONTENT
       "${CMAKE_INSTALL_MANIFEST_FILES}")
file(WRITE "/home/sathvik/hpcc/HPCC-Platform/build/${CMAKE_INSTALL_MANIFEST}"
     "${CMAKE_INSTALL_MANIFEST_CONTENT}")
