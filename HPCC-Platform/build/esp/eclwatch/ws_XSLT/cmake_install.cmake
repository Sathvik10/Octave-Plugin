# Install script for directory: /home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT

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
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/exceptions.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/BoolResponse.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/BoolResponse.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/GvcGraph.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/RoxieGVCGraph.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/RoxieGraph.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/action.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/addto_superfile.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/atts.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/batchjobdispatch.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/batchworkunits.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/batchwuid.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/batchwuid_search.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/bdefault.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/cluster_info.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/date-time.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/def_def_file.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/default.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/dfu.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/dfu_file.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/dfu_file_space.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/dfu_filelist.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/dfu_fileview.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/dfu_getdatacolumns.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/dfu_progress.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/dfu_search.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/dfu_searchdata.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/dfu_superedit.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/dfu_superresult.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/dfu_viewdata.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/dfu_workunits.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/dfu_wuid.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/dfusearchresult.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/dfuwu_search.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/dfuwuaction_results.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/dim_graph.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/exceptions.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/exceptions_svg.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/fs_desprayCopyForm.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/fs_sprayForm.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/fs_renameForm.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/graph.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/graphStats.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/graph_gvc.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/graph_gvc_common.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/graphupdate_gvc.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/html.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/index.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/indexdisplayinfo.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/jobs_search.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/lib.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/listroxiequery.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/machines.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/oldgraph.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/queryfiledetails.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/queryfilelist.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/queryfilelistdone.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/QueriesUsingFile.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/result.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/result_lib.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/result_lib1.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/result_lib2.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/resultxls.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/roxieclusters.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/roxiefile_search.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/roxieindexes.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/roxieoriginalfiles.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/roxiequery.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/roxiequery_search.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/roxiequery_stat_detail.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/roxiequery_stat_exception.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/roxiequery_stat_exception_detail.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/roxiequery_stat_query.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/roxiequery_stat_report.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/roxiequery_stat_search.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/roxiequerydetails.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/roxiequerygraph.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/roxiequerygvcgraph.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/run_ecl.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/scheduledwus.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/services.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/clusterprocesses.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/targetclusters.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/showresult.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/table.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/thor_status.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/topology.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/tplog.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/tplogdisplay.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/workunits.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/wuaction_results.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/wuid.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/wuid_jobs.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/wuid_jobs_sasha.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/wuid_search.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/wuidcommon.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/wuiddetails.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/xml_def_file.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/xref_build.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/xref_directories.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/xref_errwarn.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/xref_found.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/xref_lost.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/xref_main.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/xref_orphan.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/opensave.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/filerelationsearch.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/filerelationlist.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/WUQuerysets.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/WUQuerysetQueries.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/WUQueryDetails.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/dropzonefile.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/hpccresourcelist.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/dropzonefilelist.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/WUZAPInfoForm.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/WUCopyLogicalFiles.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/WUDeployWorkunit.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_accountpermissions.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_adduser.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_basedns.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_clearpermissionscache.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_enablescopescans.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_disablescopescans.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_filepermission.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_groupadd.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_groupdelete.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_groupedit.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_groupmemberedit.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_groupmembereditinput.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_groups.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_permissionaddinput.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_permissionchange.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_permissionresetinput.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_permissions.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_permissionsreset.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_posix.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_posixinput.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_resetpass.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_resetpassinput.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_resourceadd.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_resourceaddinput.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_resourcedelete.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_resources.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_sudoers.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_sudoersinput.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_useraction.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_useredit.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_usergroupedit.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_usergroupeditinput.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_userinfoedit.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_userinfoeditinput.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/access_users.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/account.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/account_input.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/account_myaccount.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/wsecl/wsecl" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/atts.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/wsecl/wsecl" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/result_lib.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/wsecl/wsecl" TYPE FILE FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/lib.xslt")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/componentfiles/smc_xslt" TYPE DIRECTORY FILES "/home/sathvik/hpcc/HPCC-Platform/esp/eclwatch/ws_XSLT/nls" USE_SOURCE_PERMISSIONS REGEX "/\\.svn$" EXCLUDE)
endif()

