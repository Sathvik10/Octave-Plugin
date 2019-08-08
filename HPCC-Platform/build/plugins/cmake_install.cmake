# Install script for directory: /home/sathvik/hpcc/HPCC-Platform/plugins

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
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/auditlib/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/debugservices/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/dmetaphone/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/eclblas/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/fileservices/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/h3/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/logging/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/parselib/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/stringlib/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/timelib/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/unicodelib/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/workunitservices/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/proxies/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/sqlite3/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/mysql/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/v8embed/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/py3embed/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/pyembed/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/javaembed/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/Rembed/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/cassandra/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/memcached/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/redis/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/kafka/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/exampleplugin/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/couchbase/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/sqs/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/spark/cmake_install.cmake")

endif()

