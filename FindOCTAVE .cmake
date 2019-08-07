IF (NOT OCTAVE_FOUND)
	FIND_LIBRARY (OCTAVE_LIBRARIES NAMES octave PATHS "/usr/local/lib/octave/5.1.0" NO_DEFAULT_PATH)
	FIND_LIBRARY (OCTAVE_LIBRARIES2 NAMES octinterp PATHS "/usr/local/lib/octave/5.1.0" NO_DEFAULT_PATH)

	if (USE_NATIVE_LIBRARIES)
    		FIND_LIBRARY (OCTAVE_LIBRARIES NAMES ${octave_lib} PATH_SUFFIXES "octave")
    		FIND_LIBRARY (OCTAVE_LIBRARIES NAMES ${octave_lib_interp} PATH_SUFFIXES "octave")
  	endif()

	include(FindPackageHandleStandardArgs)
  	find_package_handle_standard_args(MYSQL DEFAULT_MSG
    	OCTAVE_LIBRARIES 
  	)

  	MARK_AS_ADVANCED(OCTAVE_LIBRARIES)
ENDIF()
