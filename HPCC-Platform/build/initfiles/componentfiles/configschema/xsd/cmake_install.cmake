# Install script for directory: /home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configschema/xsd

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
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/backupnode.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/dafilesrv.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/dali.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/daliplugin.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/dfuserver.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/directories.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/dropzone.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/eclagent.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/eclccserver.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/eclscheduler.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/environment.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/envsettings.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/esp.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/esp_service_desdl.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/esp_service_smc.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/esp_service_wsecl.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/esp_service_wslogging.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/esp_service_wssql.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/ftslave_linux.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/hardware.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/ldapserver.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/logging_agent_cassandra.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/logging_agent_esp.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/logging_manager.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/mysqlserver.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/roxie.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/sasha.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/secmgr_singleuser.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/sparkthor.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/thor.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/topology.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configschema/xsd" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configschema/xsd/types.xsd")
endif()

