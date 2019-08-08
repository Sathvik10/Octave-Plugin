# Install script for directory: /home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml

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
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configxml/buildset.xml")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configxml/dropzone.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configxml/eclagent_config.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configxml/esp.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configxml/espsmcservice.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configxml/ftslave_linux.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configxml/roxie.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configxml/RoxieTopology.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configxml/thor.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configxml/thor.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/setvars_linux.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/custom_plugin.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/dafilesrv.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/dali.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/dfuplus.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/dfuserver.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/DhcpServer.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/directories.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/eclplus.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/eclcc.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/eclccserver.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/eclscheduler.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configxml/environment.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/esp_service_account.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/esp_service_wsecl.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/esp_service_wsecl2.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/esp_service_wssql.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/esp_service_wsstore.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/GABConfig.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/generic.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/installset.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/ldapserver.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/ldapserver.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/mysqlserver.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/plugin.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/regress.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/sasha.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configxml/SiteCertificate.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/soapplus.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/topology.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/WsDeploy.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configxml/cgencomplist_linux.xml")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configxml/cgencomplist_win.xml")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/esp.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/dali.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/dfuplus.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/dfuserver.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/agentexec.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/eclscheduler.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/eclccserver.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/eclplus.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/slaves.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/roxievars_linux.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/sasha.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/eclcc.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/validateAll.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/esdlsvcengine.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/loggingmanager.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/esploggingagent.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/wslogging.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/cassandraloggingagent.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/daliplugin.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/backupnode.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/backupnode_vars.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/initfiles/componentfiles/configxml/sparkThor.xsd")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configxml/sparkThor.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/configxml" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configxml/spark-defaults.xsl")
endif()

if(NOT CMAKE_INSTALL_LOCAL_ONLY)
  # Include the install script for each subdirectory.
  include("/home/sathvik/hpcc/HPCC-Platform/build/initfiles/componentfiles/configxml/@temp/cmake_install.cmake")

endif()

