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
include dali/datest/CMakeFiles/dfuwutest.dir/depend.make

# Include the progress variables for this target.
include dali/datest/CMakeFiles/dfuwutest.dir/progress.make

# Include the compile flags for this target's objects.
include dali/datest/CMakeFiles/dfuwutest.dir/flags.make

dali/datest/CMakeFiles/dfuwutest.dir/__/dfu/dfuutil.cpp.o: dali/datest/CMakeFiles/dfuwutest.dir/flags.make
dali/datest/CMakeFiles/dfuwutest.dir/__/dfu/dfuutil.cpp.o: ../dali/dfu/dfuutil.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/sathvik/hpcc/HPCC-Platform/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object dali/datest/CMakeFiles/dfuwutest.dir/__/dfu/dfuutil.cpp.o"
	cd /home/sathvik/hpcc/HPCC-Platform/build/dali/datest && /usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/dfuwutest.dir/__/dfu/dfuutil.cpp.o -c /home/sathvik/hpcc/HPCC-Platform/dali/dfu/dfuutil.cpp

dali/datest/CMakeFiles/dfuwutest.dir/__/dfu/dfuutil.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/dfuwutest.dir/__/dfu/dfuutil.cpp.i"
	cd /home/sathvik/hpcc/HPCC-Platform/build/dali/datest && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/sathvik/hpcc/HPCC-Platform/dali/dfu/dfuutil.cpp > CMakeFiles/dfuwutest.dir/__/dfu/dfuutil.cpp.i

dali/datest/CMakeFiles/dfuwutest.dir/__/dfu/dfuutil.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/dfuwutest.dir/__/dfu/dfuutil.cpp.s"
	cd /home/sathvik/hpcc/HPCC-Platform/build/dali/datest && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/sathvik/hpcc/HPCC-Platform/dali/dfu/dfuutil.cpp -o CMakeFiles/dfuwutest.dir/__/dfu/dfuutil.cpp.s

dali/datest/CMakeFiles/dfuwutest.dir/dfuwutest.cpp.o: dali/datest/CMakeFiles/dfuwutest.dir/flags.make
dali/datest/CMakeFiles/dfuwutest.dir/dfuwutest.cpp.o: ../dali/datest/dfuwutest.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/sathvik/hpcc/HPCC-Platform/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Building CXX object dali/datest/CMakeFiles/dfuwutest.dir/dfuwutest.cpp.o"
	cd /home/sathvik/hpcc/HPCC-Platform/build/dali/datest && /usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/dfuwutest.dir/dfuwutest.cpp.o -c /home/sathvik/hpcc/HPCC-Platform/dali/datest/dfuwutest.cpp

dali/datest/CMakeFiles/dfuwutest.dir/dfuwutest.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/dfuwutest.dir/dfuwutest.cpp.i"
	cd /home/sathvik/hpcc/HPCC-Platform/build/dali/datest && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/sathvik/hpcc/HPCC-Platform/dali/datest/dfuwutest.cpp > CMakeFiles/dfuwutest.dir/dfuwutest.cpp.i

dali/datest/CMakeFiles/dfuwutest.dir/dfuwutest.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/dfuwutest.dir/dfuwutest.cpp.s"
	cd /home/sathvik/hpcc/HPCC-Platform/build/dali/datest && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/sathvik/hpcc/HPCC-Platform/dali/datest/dfuwutest.cpp -o CMakeFiles/dfuwutest.dir/dfuwutest.cpp.s

# Object files for target dfuwutest
dfuwutest_OBJECTS = \
"CMakeFiles/dfuwutest.dir/__/dfu/dfuutil.cpp.o" \
"CMakeFiles/dfuwutest.dir/dfuwutest.cpp.o"

# External object files for target dfuwutest
dfuwutest_EXTERNAL_OBJECTS =

Debug/bin/dfuwutest: dali/datest/CMakeFiles/dfuwutest.dir/__/dfu/dfuutil.cpp.o
Debug/bin/dfuwutest: dali/datest/CMakeFiles/dfuwutest.dir/dfuwutest.cpp.o
Debug/bin/dfuwutest: dali/datest/CMakeFiles/dfuwutest.dir/build.make
Debug/bin/dfuwutest: Debug/libs/libhrpc.a
Debug/bin/dfuwutest: Debug/libs/libdfuwu.so
Debug/bin/dfuwutest: Debug/libs/libworkunit.so
Debug/bin/dfuwutest: Debug/libs/libdllserver.so
Debug/bin/dfuwutest: Debug/libs/libenvironment.so
Debug/bin/dfuwutest: Debug/libs/libdalibase.so
Debug/bin/dfuwutest: Debug/libs/libhrpc.a
Debug/bin/dfuwutest: Debug/libs/libdafsclient.so
Debug/bin/dfuwutest: Debug/libs/libremote.so
Debug/bin/dfuwutest: Debug/libs/libmp.so
Debug/bin/dfuwutest: Debug/libs/libjhtree.so
Debug/bin/dfuwutest: Debug/libs/libhql.so
Debug/bin/dfuwutest: Debug/libs/libdeftype.so
Debug/bin/dfuwutest: Debug/libs/libeclrtl.so
Debug/bin/dfuwutest: Debug/libs/libnbcd.so
Debug/bin/dfuwutest: /usr/lib/x86_64-linux-gnu/libboost_regex.so
Debug/bin/dfuwutest: Debug/libs/libroxiemem.so
Debug/bin/dfuwutest: system/tbb_sm/linux_intel64_gcc_cc7_libc2.27_kernel4.15.0_release/libtbb.so.2
Debug/bin/dfuwutest: /usr/lib/x86_64-linux-gnu/libicui18n.so
Debug/bin/dfuwutest: /usr/lib/x86_64-linux-gnu/libicuuc.so
Debug/bin/dfuwutest: /usr/lib/x86_64-linux-gnu/libicudata.so
Debug/bin/dfuwutest: Debug/libs/libzcrypt.so
Debug/bin/dfuwutest: /usr/lib/x86_64-linux-gnu/libz.so
Debug/bin/dfuwutest: Debug/libs/libsecuresocket.so
Debug/bin/dfuwutest: Debug/libs/libjlib.so
Debug/bin/dfuwutest: Debug/libs/liblzma.a
Debug/bin/dfuwutest: Debug/libs/liblz4.a
Debug/bin/dfuwutest: Debug/libs/liblibbase58.a
Debug/bin/dfuwutest: /usr/lib/x86_64-linux-gnu/libssl.so
Debug/bin/dfuwutest: /usr/lib/x86_64-linux-gnu/libcrypto.so
Debug/bin/dfuwutest: dali/datest/CMakeFiles/dfuwutest.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/sathvik/hpcc/HPCC-Platform/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_3) "Linking CXX executable ../../Debug/bin/dfuwutest"
	cd /home/sathvik/hpcc/HPCC-Platform/build/dali/datest && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/dfuwutest.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
dali/datest/CMakeFiles/dfuwutest.dir/build: Debug/bin/dfuwutest

.PHONY : dali/datest/CMakeFiles/dfuwutest.dir/build

dali/datest/CMakeFiles/dfuwutest.dir/clean:
	cd /home/sathvik/hpcc/HPCC-Platform/build/dali/datest && $(CMAKE_COMMAND) -P CMakeFiles/dfuwutest.dir/cmake_clean.cmake
.PHONY : dali/datest/CMakeFiles/dfuwutest.dir/clean

dali/datest/CMakeFiles/dfuwutest.dir/depend:
	cd /home/sathvik/hpcc/HPCC-Platform/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/sathvik/hpcc/HPCC-Platform /home/sathvik/hpcc/HPCC-Platform/dali/datest /home/sathvik/hpcc/HPCC-Platform/build /home/sathvik/hpcc/HPCC-Platform/build/dali/datest /home/sathvik/hpcc/HPCC-Platform/build/dali/datest/CMakeFiles/dfuwutest.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : dali/datest/CMakeFiles/dfuwutest.dir/depend

