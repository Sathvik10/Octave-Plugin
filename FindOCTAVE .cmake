IF (NOT OCTAVE_FOUND)
	IF (WIN32)
		
	ELSE
		SET(octave_lib "liboctave")
		SET (octave_lib_interp "liboctinterp")
	ENDIF()
	
	FIND_LIBRARY (OCTAVE_LIBRARIES NAMES ${octave_lib} PATHS "usr/local/lib" PATH_SUFFIXES "octave/5.1.0")	
	FIND_LIBRARY (OCTAVE_LIBRARIES NAMES ${octave_lib_interp} PATHS "usr/local/lib" PATH_SUFFIXES "octave/5.1.0")	

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
