# Install script for directory: /home/sathvik/hpcc/HPCC-Platform/esp/xslt

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
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/ui_configmgr.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/appframe.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/dict_sort.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/env2jstree.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/esdl_method.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/espheader.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/esxdl2req.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/gen_form.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/multistatus.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/nav.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/navigation.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/soap_page.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/sso_create_session.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/ui_overrides.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/yuitree.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/xmlformatter.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/wsecl3_form.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/wsecl3_boxform.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/wsecl3_links.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/wsecl3_url.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/wsecl3_tabview.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/wsecl3_xmltest.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/wsecl3_jsontest.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/wsecl3_result.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/passwordupdate.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/esdl2ecl.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/esdl2monitor.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/esxdl2xsd.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/esdl2java_srvbase.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/esdl2java_srvdummy.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/esdl2cpp_srvbasehpp.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/esdl2cpp_srvbasecpp.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/esdl2cpp_srvhpp.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/esdl2cpp_srvcpp.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/esdl2cpp_cmake.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/esdl2cpp_types.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/roxie_page.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/files" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/wsecl2_form.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/files" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/wsecl_tabview.xsl")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/files" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/xslt/wsecl_tree.xsl")
endif()

