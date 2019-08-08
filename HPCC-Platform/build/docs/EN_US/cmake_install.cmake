# Install script for directory: /home/sathvik/hpcc/HPCC-Platform/docs/EN_US

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
  include("/home/sathvik/hpcc/HPCC-Platform/build/docs/EN_US/DynamicESDL/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/docs/EN_US/ECLLanguageReference/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/docs/EN_US/ECLProgrammersGuide/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/docs/EN_US/ECLStandardLibraryReference/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/docs/EN_US/ECLReference/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/docs/EN_US/EclipseHelp/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/docs/EN_US/HTMLHelp/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/docs/EN_US/ECLPlayground/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/docs/EN_US/HPCCClientTools/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/docs/EN_US/HPCCCertify/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/docs/EN_US/HPCCDataHandling/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/docs/EN_US/HPCCDataTutorial/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/docs/EN_US/HPCCMonitoring/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/docs/EN_US/HPCCSystemAdmin/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/docs/EN_US/HPCCSpark/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/docs/EN_US/IMDB/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/docs/EN_US/InstantCloud/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/docs/EN_US/Installing_and_RunningTheHPCCPlatform/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/docs/EN_US/RoxieReference/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/docs/EN_US/RunningHPCCinaVirtualMachine/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/docs/EN_US/ECLScheduler/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/docs/EN_US/ECLWatch/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/docs/EN_US/VisualizingECL/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/docs/EN_US/WsSQLUG/cmake_install.cmake")
  include("/home/sathvik/hpcc/HPCC-Platform/build/docs/EN_US/PortalHTML/cmake_install.cmake")

endif()

