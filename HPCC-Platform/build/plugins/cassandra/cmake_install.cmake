# Install script for directory: /home/sathvik/hpcc/HPCC-Platform/plugins/cassandra

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

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  set(ENV{LD_LIBRARY_PATH} "$ENV{LD_LIBRARY_PATH}:/home/sathvik/hpcc/HPCC-Platform/build/plugins/cassandra:/home/sathvik/hpcc/HPCC-Platform/build/plugins/cassandra/.libs:/home/sathvik/hpcc/HPCC-Platform/build/plugins/cassandra/cassandra")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib" TYPE FILE PERMISSIONS OWNER_WRITE OWNER_READ OWNER_EXECUTE GROUP_READ GROUP_EXECUTE WORLD_READ WORLD_EXECUTE FILES
    "/home/sathvik/hpcc/HPCC-Platform/build/plugins/cassandra/.libs/libuv.so"
    "/home/sathvik/hpcc/HPCC-Platform/build/plugins/cassandra/.libs/libuv.so.1"
    "/home/sathvik/hpcc/HPCC-Platform/build/plugins/cassandra/.libs/libuv.so.1.0.0"
    )
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  if(EXISTS "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/plugins/libcassandraembed.so" AND
     NOT IS_SYMLINK "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/plugins/libcassandraembed.so")
    file(RPATH_CHECK
         FILE "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/plugins/libcassandraembed.so"
         RPATH "/opt/HPCCSystems/lib:/opt/HPCCSystems/plugins:/opt/HPCCSystems/lib/external")
  endif()
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/plugins" TYPE SHARED_LIBRARY FILES "/home/sathvik/hpcc/HPCC-Platform/build/Debug/libs/libcassandraembed.so")
  if(EXISTS "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/plugins/libcassandraembed.so" AND
     NOT IS_SYMLINK "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/plugins/libcassandraembed.so")
    file(RPATH_CHANGE
         FILE "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/plugins/libcassandraembed.so"
         OLD_RPATH "/home/sathvik/hpcc/HPCC-Platform/build/plugins/cassandra/cassandra:/home/sathvik/hpcc/HPCC-Platform/build/Debug/libs:/home/sathvik/hpcc/HPCC-Platform/build/plugins/cassandra/.libs:/home/sathvik/hpcc/HPCC-Platform/build/system/tbb_sm/linux_intel64_gcc_cc7_libc2.27_kernel4.15.0_release:"
         NEW_RPATH "/opt/HPCCSystems/lib:/opt/HPCCSystems/plugins:/opt/HPCCSystems/lib/external")
    if(CMAKE_INSTALL_DO_STRIP)
      execute_process(COMMAND "/usr/bin/strip" "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/plugins/libcassandraembed.so")
    endif()
  endif()
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  if(EXISTS "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/libcassandraembed.so" AND
     NOT IS_SYMLINK "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/libcassandraembed.so")
    file(RPATH_CHECK
         FILE "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/libcassandraembed.so"
         RPATH "/opt/HPCCSystems/lib:/opt/HPCCSystems/plugins:/opt/HPCCSystems/lib/external")
  endif()
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib" TYPE SHARED_LIBRARY FILES "/home/sathvik/hpcc/HPCC-Platform/build/Debug/libs/libcassandraembed.so")
  if(EXISTS "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/libcassandraembed.so" AND
     NOT IS_SYMLINK "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/libcassandraembed.so")
    file(RPATH_CHANGE
         FILE "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/libcassandraembed.so"
         OLD_RPATH "/home/sathvik/hpcc/HPCC-Platform/build/plugins/cassandra/cassandra:/home/sathvik/hpcc/HPCC-Platform/build/Debug/libs:/home/sathvik/hpcc/HPCC-Platform/build/plugins/cassandra/.libs:/home/sathvik/hpcc/HPCC-Platform/build/system/tbb_sm/linux_intel64_gcc_cc7_libc2.27_kernel4.15.0_release:"
         NEW_RPATH "/opt/HPCCSystems/lib:/opt/HPCCSystems/plugins:/opt/HPCCSystems/lib/external")
    if(CMAKE_INSTALL_DO_STRIP)
      execute_process(COMMAND "/usr/bin/strip" "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/libcassandraembed.so")
    endif()
  endif()
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/plugins" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/plugins/cassandra/cassandra.ecllib")
endif()

if(NOT CMAKE_INSTALL_LOCAL_ONLY)
  # Include the install script for each subdirectory.
  include("/home/sathvik/hpcc/HPCC-Platform/build/plugins/cassandra/cassandra/cmake_install.cmake")

endif()

