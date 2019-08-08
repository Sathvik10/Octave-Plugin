# Install script for directory: /home/sathvik/hpcc/HPCC-Platform/esp/scm

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
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/esdl_files" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/generated/common.xml")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/esdl_files" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/generated/ecl.xml")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/esdl_files" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/generated/ecllib.xml")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/esdl_files" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/generated/esp.xml")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/esdl_files" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/generated/ws_access.xml")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/esdl_files" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/generated/soapesp.xml")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/esdl_files" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/generated/ws_ecl_client.xml")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/esdl_files" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/generated/ws_fs.xml")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/esdl_files" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/generated/ws_machine.xml")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/esdl_files" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/generated/ws_smc.xml")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/esdl_files" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/generated/ws_topology.xml")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/esdl_files" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/generated/ws_workunits.xml")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/esdl_files" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/generated/ws_packageprocess.xml")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/esdl_files" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/generated/ws_esdlconfig.xml")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/esdl_files" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/generated/ws_loggingservice.xml")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/esdl_files" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/generated/ws_espcontrol.xml")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/esdl_files" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/generated/ws_configmgr.xml")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/esdl_files" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/generated/ws_elk.xml")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/esdl_files" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/generated/ws_store.xml")
endif()

