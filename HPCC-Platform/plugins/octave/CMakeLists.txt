project(octaveembed)
message ("OCTAVE PLUGIN")
if(OCTAVEEMBED)
    message ("Octave Plugin development")
    ADD_PLUGIN(octaveembed PACKAGES OCTAVE)
    if(MAKE_OCTAVEEMBED)
        set(
            SRCS
            octaveembed.cpp)

        include_directories(
            ./../../system/include
            ./../../rtl/eclrtl
            ./../../roxie/roxiemem
            ./../../rtl/include
            ./../../rtl/nbcd
            ./../../common/deftype
            ./../../system/jlib
            ${OCTAVE_INCLUDE_DIR})

        add_definitions(-D_USRDLL -DOCTAVEEMBED_EXPORTS)

        HPCC_ADD_LIBRARY(octaveembed SHARED ${SRCS})
        if(${CMAKE_VERSION} VERSION_LESS "2.8.9")
            message(WARNING "Cannot set NO_SONAME. shlibdeps will give warnings when package is installed")
        elseif(NOT APPLE)
            set_target_properties(octaveembed PROPERTIES NO_SONAME 1)
        endif()

        install(
            TARGETS octaveembed
            DESTINATION plugins )
        target_link_libraries(
            octaveembed
            ${OCTAVE_LIBRARIES}
            eclrtl
            roxiemem
            jlib)
    endif()
endif()

if(PLATFORM OR CLIENTTOOLS_ONLY)
    install(
        FILES ${CMAKE_CURRENT_SOURCE_DIR}/octave.ecllib
        DESTINATION plugins
        COMPONENT Runtime)
endif()
