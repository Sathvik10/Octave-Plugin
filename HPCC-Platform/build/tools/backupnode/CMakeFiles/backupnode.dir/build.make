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
include tools/backupnode/CMakeFiles/backupnode.dir/depend.make

# Include the progress variables for this target.
include tools/backupnode/CMakeFiles/backupnode.dir/progress.make

# Include the compile flags for this target's objects.
include tools/backupnode/CMakeFiles/backupnode.dir/flags.make

tools/backupnode/CMakeFiles/backupnode.dir/backupnode.cpp.o: tools/backupnode/CMakeFiles/backupnode.dir/flags.make
tools/backupnode/CMakeFiles/backupnode.dir/backupnode.cpp.o: ../tools/backupnode/backupnode.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/sathvik/hpcc/HPCC-Platform/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object tools/backupnode/CMakeFiles/backupnode.dir/backupnode.cpp.o"
	cd /home/sathvik/hpcc/HPCC-Platform/build/tools/backupnode && /usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/backupnode.dir/backupnode.cpp.o -c /home/sathvik/hpcc/HPCC-Platform/tools/backupnode/backupnode.cpp

tools/backupnode/CMakeFiles/backupnode.dir/backupnode.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/backupnode.dir/backupnode.cpp.i"
	cd /home/sathvik/hpcc/HPCC-Platform/build/tools/backupnode && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/sathvik/hpcc/HPCC-Platform/tools/backupnode/backupnode.cpp > CMakeFiles/backupnode.dir/backupnode.cpp.i

tools/backupnode/CMakeFiles/backupnode.dir/backupnode.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/backupnode.dir/backupnode.cpp.s"
	cd /home/sathvik/hpcc/HPCC-Platform/build/tools/backupnode && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/sathvik/hpcc/HPCC-Platform/tools/backupnode/backupnode.cpp -o CMakeFiles/backupnode.dir/backupnode.cpp.s

tools/backupnode/CMakeFiles/backupnode.dir/backupnode2.cpp.o: tools/backupnode/CMakeFiles/backupnode.dir/flags.make
tools/backupnode/CMakeFiles/backupnode.dir/backupnode2.cpp.o: ../tools/backupnode/backupnode2.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/sathvik/hpcc/HPCC-Platform/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Building CXX object tools/backupnode/CMakeFiles/backupnode.dir/backupnode2.cpp.o"
	cd /home/sathvik/hpcc/HPCC-Platform/build/tools/backupnode && /usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/backupnode.dir/backupnode2.cpp.o -c /home/sathvik/hpcc/HPCC-Platform/tools/backupnode/backupnode2.cpp

tools/backupnode/CMakeFiles/backupnode.dir/backupnode2.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/backupnode.dir/backupnode2.cpp.i"
	cd /home/sathvik/hpcc/HPCC-Platform/build/tools/backupnode && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/sathvik/hpcc/HPCC-Platform/tools/backupnode/backupnode2.cpp > CMakeFiles/backupnode.dir/backupnode2.cpp.i

tools/backupnode/CMakeFiles/backupnode.dir/backupnode2.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/backupnode.dir/backupnode2.cpp.s"
	cd /home/sathvik/hpcc/HPCC-Platform/build/tools/backupnode && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/sathvik/hpcc/HPCC-Platform/tools/backupnode/backupnode2.cpp -o CMakeFiles/backupnode.dir/backupnode2.cpp.s

# Object files for target backupnode
backupnode_OBJECTS = \
"CMakeFiles/backupnode.dir/backupnode.cpp.o" \
"CMakeFiles/backupnode.dir/backupnode2.cpp.o"

# External object files for target backupnode
backupnode_EXTERNAL_OBJECTS =

Debug/bin/backupnode: tools/backupnode/CMakeFiles/backupnode.dir/backupnode.cpp.o
Debug/bin/backupnode: tools/backupnode/CMakeFiles/backupnode.dir/backupnode2.cpp.o
Debug/bin/backupnode: tools/backupnode/CMakeFiles/backupnode.dir/build.make
Debug/bin/backupnode: Debug/libs/libdalibase.so
Debug/bin/backupnode: Debug/libs/libdafsclient.so
Debug/bin/backupnode: Debug/libs/libremote.so
Debug/bin/backupnode: Debug/libs/libjhtree.so
Debug/bin/backupnode: Debug/libs/libhql.so
Debug/bin/backupnode: Debug/libs/libdeftype.so
Debug/bin/backupnode: Debug/libs/libeclrtl.so
Debug/bin/backupnode: /usr/lib/x86_64-linux-gnu/libboost_regex.so
Debug/bin/backupnode: Debug/libs/libroxiemem.so
Debug/bin/backupnode: system/tbb_sm/linux_intel64_gcc_cc7_libc2.27_kernel4.15.0_release/libtbb.so.2
Debug/bin/backupnode: /usr/lib/x86_64-linux-gnu/libicui18n.so
Debug/bin/backupnode: /usr/lib/x86_64-linux-gnu/libicuuc.so
Debug/bin/backupnode: /usr/lib/x86_64-linux-gnu/libicudata.so
Debug/bin/backupnode: Debug/libs/libnbcd.so
Debug/bin/backupnode: Debug/libs/libzcrypt.so
Debug/bin/backupnode: /usr/lib/x86_64-linux-gnu/libz.so
Debug/bin/backupnode: Debug/libs/libsecuresocket.so
Debug/bin/backupnode: Debug/libs/libmp.so
Debug/bin/backupnode: Debug/libs/libjlib.so
Debug/bin/backupnode: Debug/libs/liblzma.a
Debug/bin/backupnode: Debug/libs/liblz4.a
Debug/bin/backupnode: Debug/libs/liblibbase58.a
Debug/bin/backupnode: /usr/lib/x86_64-linux-gnu/libssl.so
Debug/bin/backupnode: /usr/lib/x86_64-linux-gnu/libcrypto.so
Debug/bin/backupnode: Debug/libs/libhrpc.a
Debug/bin/backupnode: tools/backupnode/CMakeFiles/backupnode.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/sathvik/hpcc/HPCC-Platform/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_3) "Linking CXX executable ../../Debug/bin/backupnode"
	cd /home/sathvik/hpcc/HPCC-Platform/build/tools/backupnode && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/backupnode.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
tools/backupnode/CMakeFiles/backupnode.dir/build: Debug/bin/backupnode

.PHONY : tools/backupnode/CMakeFiles/backupnode.dir/build

tools/backupnode/CMakeFiles/backupnode.dir/clean:
	cd /home/sathvik/hpcc/HPCC-Platform/build/tools/backupnode && $(CMAKE_COMMAND) -P CMakeFiles/backupnode.dir/cmake_clean.cmake
.PHONY : tools/backupnode/CMakeFiles/backupnode.dir/clean

tools/backupnode/CMakeFiles/backupnode.dir/depend:
	cd /home/sathvik/hpcc/HPCC-Platform/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/sathvik/hpcc/HPCC-Platform /home/sathvik/hpcc/HPCC-Platform/tools/backupnode /home/sathvik/hpcc/HPCC-Platform/build /home/sathvik/hpcc/HPCC-Platform/build/tools/backupnode /home/sathvik/hpcc/HPCC-Platform/build/tools/backupnode/CMakeFiles/backupnode.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : tools/backupnode/CMakeFiles/backupnode.dir/depend

