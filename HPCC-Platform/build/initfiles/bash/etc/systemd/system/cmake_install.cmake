# Install script for directory: /home/sathvik/hpcc/HPCC-Platform/initfiles/bash/etc/systemd/system

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

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/install" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/hpcc-conf-service.install")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/uninstall" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/hpcc-conf-service.uninstall")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/systemd/system" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/hpcc-conf@.service")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/install" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/thor-conf-service.install")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/uninstall" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/thor-conf-service.uninstall")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/systemd/system" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/thor-conf@.service")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/install" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/dafilesrv-service.install")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/uninstall" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/dafilesrv-service.uninstall")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/systemd/system" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/dafilesrv@.service")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/install" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/eclagent-service.install")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/uninstall" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/eclagent-service.uninstall")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/systemd/system" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/eclagent@.service")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/install" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/dali-service.install")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/uninstall" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/dali-service.uninstall")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/systemd/system" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/dali@.service")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/install" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/dfuserver-service.install")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/uninstall" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/dfuserver-service.uninstall")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/systemd/system" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/dfuserver@.service")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/install" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/eclccserver-service.install")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/uninstall" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/eclccserver-service.uninstall")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/systemd/system" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/eclccserver@.service")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/install" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/eclscheduler-service.install")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/uninstall" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/eclscheduler-service.uninstall")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/systemd/system" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/eclscheduler@.service")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/install" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/esp-service.install")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/uninstall" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/esp-service.uninstall")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/systemd/system" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/esp@.service")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/install" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/roxie-service.install")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/uninstall" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/roxie-service.uninstall")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/systemd/system" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/roxie@.service")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/install" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/sasha-service.install")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/uninstall" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/sasha-service.uninstall")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/systemd/system" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/sasha@.service")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/install" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/thor-service.install")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/uninstall" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/thor-service.uninstall")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/systemd/system" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/thor@.service")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/install" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/thorslave-service.install")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/uninstall" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/thorslave-service.uninstall")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/systemd/system" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/thorslave@.service")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/install" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/backupnode-service.install")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/uninstall" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/backupnode-service.uninstall")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/systemd/system" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/backupnode@.service")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/systemd/system" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/dropzone.service")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/install" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/dropzone-standalone-service.install")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/uninstall" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/dropzone-standalone-service.uninstall")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/systemd/system" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/configmgr.service")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/install" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/configmgr-standalone-service.install")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/uninstall" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/configmgr-standalone-service.uninstall")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/systemd/system" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/configmgr-conf.service")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/install" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/configmgr-conf-standalone-service.install")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/uninstall" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/configmgr-conf-standalone-service.uninstall")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/systemd/system" TYPE FILE FILES
    "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/hpcc-environment-monitor.service"
    "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/hpcc-environment-monitor.path"
    )
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/install" TYPE FILE FILES
    "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/hpcc-environment-monitor.install"
    "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/generate-hpccsystems-target.install"
    )
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/init.d/uninstall" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/hpcc-environment-monitor.uninstall")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xSystemdx" OR NOT CMAKE_INSTALL_COMPONENT)
  list(APPEND CMAKE_ABSOLUTE_DESTINATION_FILES
   "/opt/HPCCSystems/sbin/thorslaves-launch.sh;/opt/HPCCSystems/sbin/thorslaves-exec.sh;/opt/HPCCSystems/sbin/generate-hpccsystems-target.sh")
  if(CMAKE_WARN_ON_ABSOLUTE_INSTALL_DESTINATION)
    message(WARNING "ABSOLUTE path INSTALL DESTINATION : ${CMAKE_ABSOLUTE_DESTINATION_FILES}")
  endif()
  if(CMAKE_ERROR_ON_ABSOLUTE_INSTALL_DESTINATION)
    message(FATAL_ERROR "ABSOLUTE path INSTALL DESTINATION forbidden (by caller): ${CMAKE_ABSOLUTE_DESTINATION_FILES}")
  endif()
file(INSTALL DESTINATION "/opt/HPCCSystems/sbin" TYPE PROGRAM FILES
    "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/thorslaves-launch.sh"
    "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/thorslaves-exec.sh"
    "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/bash/etc/systemd/system/generate-hpccsystems-target.sh"
    )
endif()

