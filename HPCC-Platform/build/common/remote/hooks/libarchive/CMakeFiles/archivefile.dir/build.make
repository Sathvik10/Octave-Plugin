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
include common/remote/hooks/libarchive/CMakeFiles/archivefile.dir/depend.make

# Include the progress variables for this target.
include common/remote/hooks/libarchive/CMakeFiles/archivefile.dir/progress.make

# Include the compile flags for this target's objects.
include common/remote/hooks/libarchive/CMakeFiles/archivefile.dir/flags.make

common/remote/hooks/libarchive/CMakeFiles/archivefile.dir/archive.cpp.o: common/remote/hooks/libarchive/CMakeFiles/archivefile.dir/flags.make
common/remote/hooks/libarchive/CMakeFiles/archivefile.dir/archive.cpp.o: ../common/remote/hooks/libarchive/archive.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/sathvik/hpcc/HPCC-Platform/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object common/remote/hooks/libarchive/CMakeFiles/archivefile.dir/archive.cpp.o"
	cd /home/sathvik/hpcc/HPCC-Platform/build/common/remote/hooks/libarchive && /usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/archivefile.dir/archive.cpp.o -c /home/sathvik/hpcc/HPCC-Platform/common/remote/hooks/libarchive/archive.cpp

common/remote/hooks/libarchive/CMakeFiles/archivefile.dir/archive.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/archivefile.dir/archive.cpp.i"
	cd /home/sathvik/hpcc/HPCC-Platform/build/common/remote/hooks/libarchive && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/sathvik/hpcc/HPCC-Platform/common/remote/hooks/libarchive/archive.cpp > CMakeFiles/archivefile.dir/archive.cpp.i

common/remote/hooks/libarchive/CMakeFiles/archivefile.dir/archive.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/archivefile.dir/archive.cpp.s"
	cd /home/sathvik/hpcc/HPCC-Platform/build/common/remote/hooks/libarchive && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/sathvik/hpcc/HPCC-Platform/common/remote/hooks/libarchive/archive.cpp -o CMakeFiles/archivefile.dir/archive.cpp.s

# Object files for target archivefile
archivefile_OBJECTS = \
"CMakeFiles/archivefile.dir/archive.cpp.o"

# External object files for target archivefile
archivefile_EXTERNAL_OBJECTS =

Debug/libs/libarchivefile.so: common/remote/hooks/libarchive/CMakeFiles/archivefile.dir/archive.cpp.o
Debug/libs/libarchivefile.so: common/remote/hooks/libarchive/CMakeFiles/archivefile.dir/build.make
Debug/libs/libarchivefile.so: Debug/libs/libjlib.so
Debug/libs/libarchivefile.so: /usr/lib/x86_64-linux-gnu/libarchive.so
Debug/libs/libarchivefile.so: Debug/libs/liblzma.a
Debug/libs/libarchivefile.so: Debug/libs/liblz4.a
Debug/libs/libarchivefile.so: Debug/libs/liblibbase58.a
Debug/libs/libarchivefile.so: /usr/lib/x86_64-linux-gnu/libssl.so
Debug/libs/libarchivefile.so: /usr/lib/x86_64-linux-gnu/libcrypto.so
Debug/libs/libarchivefile.so: common/remote/hooks/libarchive/CMakeFiles/archivefile.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/sathvik/hpcc/HPCC-Platform/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX shared library ../../../../Debug/libs/libarchivefile.so"
	cd /home/sathvik/hpcc/HPCC-Platform/build/common/remote/hooks/libarchive && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/archivefile.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
common/remote/hooks/libarchive/CMakeFiles/archivefile.dir/build: Debug/libs/libarchivefile.so

.PHONY : common/remote/hooks/libarchive/CMakeFiles/archivefile.dir/build

common/remote/hooks/libarchive/CMakeFiles/archivefile.dir/clean:
	cd /home/sathvik/hpcc/HPCC-Platform/build/common/remote/hooks/libarchive && $(CMAKE_COMMAND) -P CMakeFiles/archivefile.dir/cmake_clean.cmake
.PHONY : common/remote/hooks/libarchive/CMakeFiles/archivefile.dir/clean

common/remote/hooks/libarchive/CMakeFiles/archivefile.dir/depend:
	cd /home/sathvik/hpcc/HPCC-Platform/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/sathvik/hpcc/HPCC-Platform /home/sathvik/hpcc/HPCC-Platform/common/remote/hooks/libarchive /home/sathvik/hpcc/HPCC-Platform/build /home/sathvik/hpcc/HPCC-Platform/build/common/remote/hooks/libarchive /home/sathvik/hpcc/HPCC-Platform/build/common/remote/hooks/libarchive/CMakeFiles/archivefile.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : common/remote/hooks/libarchive/CMakeFiles/archivefile.dir/depend

