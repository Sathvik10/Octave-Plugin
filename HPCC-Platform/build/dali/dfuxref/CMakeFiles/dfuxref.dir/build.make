# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.14

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:


#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:


# Remove some rules from gmake that .SUFFIXES does not remove.
SUFFIXES =

.SUFFIXES: .hpux_make_needs_suffix_list


# Suppress display of executed commands.
$(VERBOSE).SILENT:


# A target that is always out of date.
cmake_force:

.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/local/bin/cmake

# The command to remove a file.
RM = /usr/local/bin/cmake -E remove -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/sathvik/hpcc/HPCC-Platform

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/sathvik/hpcc/HPCC-Platform/build

# Include any dependencies generated for this target.
include dali/dfuxref/CMakeFiles/dfuxref.dir/depend.make

# Include the progress variables for this target.
include dali/dfuxref/CMakeFiles/dfuxref.dir/progress.make

# Include the compile flags for this target's objects.
include dali/dfuxref/CMakeFiles/dfuxref.dir/flags.make

dali/dfuxref/CMakeFiles/dfuxref.dir/dfuxrefmain.cpp.o: dali/dfuxref/CMakeFiles/dfuxref.dir/flags.make
dali/dfuxref/CMakeFiles/dfuxref.dir/dfuxrefmain.cpp.o: ../dali/dfuxref/dfuxrefmain.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/sathvik/hpcc/HPCC-Platform/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object dali/dfuxref/CMakeFiles/dfuxref.dir/dfuxrefmain.cpp.o"
	cd /home/sathvik/hpcc/HPCC-Platform/build/dali/dfuxref && /usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/dfuxref.dir/dfuxrefmain.cpp.o -c /home/sathvik/hpcc/HPCC-Platform/dali/dfuxref/dfuxrefmain.cpp

dali/dfuxref/CMakeFiles/dfuxref.dir/dfuxrefmain.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/dfuxref.dir/dfuxrefmain.cpp.i"
	cd /home/sathvik/hpcc/HPCC-Platform/build/dali/dfuxref && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/sathvik/hpcc/HPCC-Platform/dali/dfuxref/dfuxrefmain.cpp > CMakeFiles/dfuxref.dir/dfuxrefmain.cpp.i

dali/dfuxref/CMakeFiles/dfuxref.dir/dfuxrefmain.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/dfuxref.dir/dfuxrefmain.cpp.s"
	cd /home/sathvik/hpcc/HPCC-Platform/build/dali/dfuxref && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/sathvik/hpcc/HPCC-Platform/dali/dfuxref/dfuxrefmain.cpp -o CMakeFiles/dfuxref.dir/dfuxrefmain.cpp.s

# Object files for target dfuxref
dfuxref_OBJECTS = \
"CMakeFiles/dfuxref.dir/dfuxrefmain.cpp.o"

# External object files for target dfuxref
dfuxref_EXTERNAL_OBJECTS =

Debug/bin/dfuxref: dali/dfuxref/CMakeFiles/dfuxref.dir/dfuxrefmain.cpp.o
Debug/bin/dfuxref: dali/dfuxref/CMakeFiles/dfuxref.dir/build.make
Debug/bin/dfuxref: Debug/libs/libhrpc.a
Debug/bin/dfuxref: Debug/libs/libdfuXRefLib.so
Debug/bin/dfuxref: Debug/libs/libenvironment.so
Debug/bin/dfuxref: Debug/libs/libdalibase.so
Debug/bin/dfuxref: Debug/libs/libhrpc.a
Debug/bin/dfuxref: Debug/libs/libdafsclient.so
Debug/bin/dfuxref: Debug/libs/libremote.so
Debug/bin/dfuxref: Debug/libs/libmp.so
Debug/bin/dfuxref: Debug/libs/libjhtree.so
Debug/bin/dfuxref: Debug/libs/libhql.so
Debug/bin/dfuxref: Debug/libs/libdeftype.so
Debug/bin/dfuxref: Debug/libs/libzcrypt.so
Debug/bin/dfuxref: /usr/lib/x86_64-linux-gnu/libz.so
Debug/bin/dfuxref: Debug/libs/libsecuresocket.so
Debug/bin/dfuxref: Debug/libs/libeclrtl.so
Debug/bin/dfuxref: Debug/libs/libnbcd.so
Debug/bin/dfuxref: /usr/lib/x86_64-linux-gnu/libboost_regex.so
Debug/bin/dfuxref: Debug/libs/libroxiemem.so
Debug/bin/dfuxref: Debug/libs/libjlib.so
Debug/bin/dfuxref: Debug/libs/liblzma.a
Debug/bin/dfuxref: Debug/libs/liblz4.a
Debug/bin/dfuxref: Debug/libs/liblibbase58.a
Debug/bin/dfuxref: /usr/lib/x86_64-linux-gnu/libssl.so
Debug/bin/dfuxref: /usr/lib/x86_64-linux-gnu/libcrypto.so
Debug/bin/dfuxref: system/tbb_sm/linux_intel64_gcc_cc7_libc2.27_kernel4.15.0_release/libtbb.so.2
Debug/bin/dfuxref: /usr/lib/x86_64-linux-gnu/libicui18n.so
Debug/bin/dfuxref: /usr/lib/x86_64-linux-gnu/libicuuc.so
Debug/bin/dfuxref: /usr/lib/x86_64-linux-gnu/libicudata.so
Debug/bin/dfuxref: dali/dfuxref/CMakeFiles/dfuxref.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/sathvik/hpcc/HPCC-Platform/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX executable ../../Debug/bin/dfuxref"
	cd /home/sathvik/hpcc/HPCC-Platform/build/dali/dfuxref && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/dfuxref.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
dali/dfuxref/CMakeFiles/dfuxref.dir/build: Debug/bin/dfuxref

.PHONY : dali/dfuxref/CMakeFiles/dfuxref.dir/build

dali/dfuxref/CMakeFiles/dfuxref.dir/clean:
	cd /home/sathvik/hpcc/HPCC-Platform/build/dali/dfuxref && $(CMAKE_COMMAND) -P CMakeFiles/dfuxref.dir/cmake_clean.cmake
.PHONY : dali/dfuxref/CMakeFiles/dfuxref.dir/clean

dali/dfuxref/CMakeFiles/dfuxref.dir/depend:
	cd /home/sathvik/hpcc/HPCC-Platform/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/sathvik/hpcc/HPCC-Platform /home/sathvik/hpcc/HPCC-Platform/dali/dfuxref /home/sathvik/hpcc/HPCC-Platform/build /home/sathvik/hpcc/HPCC-Platform/build/dali/dfuxref /home/sathvik/hpcc/HPCC-Platform/build/dali/dfuxref/CMakeFiles/dfuxref.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : dali/dfuxref/CMakeFiles/dfuxref.dir/depend

