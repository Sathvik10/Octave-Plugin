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
include thorlcr/mfilemanager/CMakeFiles/mfilemanager_lcr.dir/depend.make

# Include the progress variables for this target.
include thorlcr/mfilemanager/CMakeFiles/mfilemanager_lcr.dir/progress.make

# Include the compile flags for this target's objects.
include thorlcr/mfilemanager/CMakeFiles/mfilemanager_lcr.dir/flags.make

thorlcr/mfilemanager/CMakeFiles/mfilemanager_lcr.dir/thmfilemanager.cpp.o: thorlcr/mfilemanager/CMakeFiles/mfilemanager_lcr.dir/flags.make
thorlcr/mfilemanager/CMakeFiles/mfilemanager_lcr.dir/thmfilemanager.cpp.o: ../thorlcr/mfilemanager/thmfilemanager.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/sathvik/hpcc/HPCC-Platform/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object thorlcr/mfilemanager/CMakeFiles/mfilemanager_lcr.dir/thmfilemanager.cpp.o"
	cd /home/sathvik/hpcc/HPCC-Platform/build/thorlcr/mfilemanager && /usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/mfilemanager_lcr.dir/thmfilemanager.cpp.o -c /home/sathvik/hpcc/HPCC-Platform/thorlcr/mfilemanager/thmfilemanager.cpp

thorlcr/mfilemanager/CMakeFiles/mfilemanager_lcr.dir/thmfilemanager.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/mfilemanager_lcr.dir/thmfilemanager.cpp.i"
	cd /home/sathvik/hpcc/HPCC-Platform/build/thorlcr/mfilemanager && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/sathvik/hpcc/HPCC-Platform/thorlcr/mfilemanager/thmfilemanager.cpp > CMakeFiles/mfilemanager_lcr.dir/thmfilemanager.cpp.i

thorlcr/mfilemanager/CMakeFiles/mfilemanager_lcr.dir/thmfilemanager.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/mfilemanager_lcr.dir/thmfilemanager.cpp.s"
	cd /home/sathvik/hpcc/HPCC-Platform/build/thorlcr/mfilemanager && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/sathvik/hpcc/HPCC-Platform/thorlcr/mfilemanager/thmfilemanager.cpp -o CMakeFiles/mfilemanager_lcr.dir/thmfilemanager.cpp.s

# Object files for target mfilemanager_lcr
mfilemanager_lcr_OBJECTS = \
"CMakeFiles/mfilemanager_lcr.dir/thmfilemanager.cpp.o"

# External object files for target mfilemanager_lcr
mfilemanager_lcr_EXTERNAL_OBJECTS =

Debug/libs/libmfilemanager_lcr.so: thorlcr/mfilemanager/CMakeFiles/mfilemanager_lcr.dir/thmfilemanager.cpp.o
Debug/libs/libmfilemanager_lcr.so: thorlcr/mfilemanager/CMakeFiles/mfilemanager_lcr.dir/build.make
Debug/libs/libmfilemanager_lcr.so: Debug/libs/libdalift.so
Debug/libs/libmfilemanager_lcr.so: Debug/libs/libgraph_lcr.so
Debug/libs/libmfilemanager_lcr.so: Debug/libs/libworkunit.so
Debug/libs/libmfilemanager_lcr.so: Debug/libs/libdllserver.so
Debug/libs/libmfilemanager_lcr.so: Debug/libs/libenvironment.so
Debug/libs/libmfilemanager_lcr.so: Debug/libs/libthorhelper.so
Debug/libs/libmfilemanager_lcr.so: Debug/libs/libdalibase.so
Debug/libs/libmfilemanager_lcr.so: Debug/libs/libhrpc.a
Debug/libs/libmfilemanager_lcr.so: Debug/libs/libdafsclient.so
Debug/libs/libmfilemanager_lcr.so: Debug/libs/libremote.so
Debug/libs/libmfilemanager_lcr.so: Debug/libs/libjhtree.so
Debug/libs/libmfilemanager_lcr.so: Debug/libs/libmp.so
Debug/libs/libmfilemanager_lcr.so: Debug/libs/libhql.so
Debug/libs/libmfilemanager_lcr.so: Debug/libs/libdeftype.so
Debug/libs/libmfilemanager_lcr.so: Debug/libs/libeclrtl.so
Debug/libs/libmfilemanager_lcr.so: Debug/libs/libnbcd.so
Debug/libs/libmfilemanager_lcr.so: /usr/lib/x86_64-linux-gnu/libboost_regex.so
Debug/libs/libmfilemanager_lcr.so: /usr/lib/x86_64-linux-gnu/libicui18n.so
Debug/libs/libmfilemanager_lcr.so: /usr/lib/x86_64-linux-gnu/libicuuc.so
Debug/libs/libmfilemanager_lcr.so: /usr/lib/x86_64-linux-gnu/libicudata.so
Debug/libs/libmfilemanager_lcr.so: Debug/libs/libsecuresocket.so
Debug/libs/libmfilemanager_lcr.so: Debug/libs/libroxiemem.so
Debug/libs/libmfilemanager_lcr.so: Debug/libs/libzcrypt.so
Debug/libs/libmfilemanager_lcr.so: Debug/libs/libjlib.so
Debug/libs/libmfilemanager_lcr.so: Debug/libs/liblzma.a
Debug/libs/libmfilemanager_lcr.so: Debug/libs/liblz4.a
Debug/libs/libmfilemanager_lcr.so: Debug/libs/liblibbase58.a
Debug/libs/libmfilemanager_lcr.so: /usr/lib/x86_64-linux-gnu/libssl.so
Debug/libs/libmfilemanager_lcr.so: /usr/lib/x86_64-linux-gnu/libcrypto.so
Debug/libs/libmfilemanager_lcr.so: system/tbb_sm/linux_intel64_gcc_cc7_libc2.27_kernel4.15.0_release/libtbb.so.2
Debug/libs/libmfilemanager_lcr.so: /usr/lib/x86_64-linux-gnu/libz.so
Debug/libs/libmfilemanager_lcr.so: thorlcr/mfilemanager/CMakeFiles/mfilemanager_lcr.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/sathvik/hpcc/HPCC-Platform/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX shared library ../../Debug/libs/libmfilemanager_lcr.so"
	cd /home/sathvik/hpcc/HPCC-Platform/build/thorlcr/mfilemanager && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/mfilemanager_lcr.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
thorlcr/mfilemanager/CMakeFiles/mfilemanager_lcr.dir/build: Debug/libs/libmfilemanager_lcr.so

.PHONY : thorlcr/mfilemanager/CMakeFiles/mfilemanager_lcr.dir/build

thorlcr/mfilemanager/CMakeFiles/mfilemanager_lcr.dir/clean:
	cd /home/sathvik/hpcc/HPCC-Platform/build/thorlcr/mfilemanager && $(CMAKE_COMMAND) -P CMakeFiles/mfilemanager_lcr.dir/cmake_clean.cmake
.PHONY : thorlcr/mfilemanager/CMakeFiles/mfilemanager_lcr.dir/clean

thorlcr/mfilemanager/CMakeFiles/mfilemanager_lcr.dir/depend:
	cd /home/sathvik/hpcc/HPCC-Platform/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/sathvik/hpcc/HPCC-Platform /home/sathvik/hpcc/HPCC-Platform/thorlcr/mfilemanager /home/sathvik/hpcc/HPCC-Platform/build /home/sathvik/hpcc/HPCC-Platform/build/thorlcr/mfilemanager /home/sathvik/hpcc/HPCC-Platform/build/thorlcr/mfilemanager/CMakeFiles/mfilemanager_lcr.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : thorlcr/mfilemanager/CMakeFiles/mfilemanager_lcr.dir/depend

