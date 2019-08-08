# Install script for directory: /home/sathvik/hpcc/HPCC-Platform/esp/services

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
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/services/common/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/services/ws_access/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/services/ws_account/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/services/ws_config/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/services/ws_configmgr/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/services/ws_dfu/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/services/ws_ecl/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/services/ws_fileio/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/services/ws_fs/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/services/ws_machine/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/services/ws_smc/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/services/ws_topology/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/services/ws_workunits/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/services/WsDeploy/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/services/ws_packageprocess/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/services/ws_esdlconfig/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/services/esdl_svc_engine/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/services/ws_sql/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/services/ws_loggingservice/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/services/espcontrol/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/services/ws_elk/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/esp/services/ws_store/cmake_install.cmake")

endif()

