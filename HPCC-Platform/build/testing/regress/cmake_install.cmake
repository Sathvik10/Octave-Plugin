# Install script for directory: /home/sathvik/hpcc/HPCC-Platform/testing/regress

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
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/./testing/regress" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/testing/regress/environment.xml")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/./testing/regress" TYPE DIRECTORY FILES
    "/home/sathvik/hpcc/HPCC-Platform/testing/regress/download"
    "/home/sathvik/hpcc/HPCC-Platform/testing/regress/hpcc"
    "/home/sathvik/hpcc/HPCC-Platform/testing/regress/ecl"
    USE_SOURCE_PERMISSIONS FILES_MATCHING REGEX "/hpcc\\/\\_\\_init\\_\\_\\.py$" REGEX "/download\\/0drvb10\\.txt$" REGEX "/download\\/donQuixote\\.txt$" REGEX "/download\\/pge0112\\.txt$" REGEX "/download\\/spray\\_test\\.txt$" REGEX "/ecl\\/[^/]*\\.ecl$" REGEX "/ecl\\/[^/]*\\.xml$" REGEX "/ecl\\/[^/]*\\.queryxml$")
endif()

if(NOT CMAKE_INSTALL_LOCAL_ONLY)
  # Include the install script for each subdirectory.
  include("/home/sathvik/hpcc/HPCC-Platform/build/testing/regress/hpcc/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/testing/regress/ecl/cmake_install.cmake")

endif()

