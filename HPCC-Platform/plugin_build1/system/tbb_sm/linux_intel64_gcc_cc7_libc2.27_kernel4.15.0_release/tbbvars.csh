#!/bin/csh
setenv TBBROOT "/home/sathvik/hpcc/HPCC-Platform/system/tbb_sm/tbb" #
setenv tbb_bin "/home/sathvik/hpcc/HPCC-Platform/plugin_build1/system/tbb_sm/linux_intel64_gcc_cc7_libc2.27_kernel4.15.0_release" #
if (! $?CPATH) then #
    setenv CPATH "${TBBROOT}/include" #
else #
    setenv CPATH "${TBBROOT}/include:$CPATH" #
endif #
if (! $?LIBRARY_PATH) then #
    setenv LIBRARY_PATH "${tbb_bin}" #
else #
    setenv LIBRARY_PATH "${tbb_bin}:$LIBRARY_PATH" #
endif #
if (! $?LD_LIBRARY_PATH) then #
    setenv LD_LIBRARY_PATH "${tbb_bin}" #
else #
    setenv LD_LIBRARY_PATH "${tbb_bin}:$LD_LIBRARY_PATH" #
endif #
 #
