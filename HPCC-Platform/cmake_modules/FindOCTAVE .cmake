IF (NOT OCTAVE_FOUND)
	FIND_PATH (OCTAVE_INCLUDE_DIR NAMES interpreter.h PATHS "/usr/local/include/octave-5.1.0/octave")
	FIND_LIBRARY (OCTAVE_LIBRARIES_1 NAMES octave PATHS "/usr/local/lib/octave/5.1.0" NO_DEFAULT_PATH)
	FIND_LIBRARY (OCTAVE_LIBRARIES_2 NAMES octinterp PATHS "/usr/local/lib/octave/5.1.0" NO_DEFAULT_PATH)
	set (OCTAVE_LIBRARIES ${OCTAVE_LIBRARIES_1} ${OCTAVE_LIBRARIES_2})

	include(FindPackageHandleStandardArgs)
  	find_package_handle_standard_args(OCTAVE DEFAULT_MSG
    	OCTAVE_LIBRARIES 
  	)

  	MARK_AS_ADVANCED(OCTAVE_LIBRARIES)
ENDIF()
