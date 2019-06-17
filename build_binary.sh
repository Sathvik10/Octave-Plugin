#!/bin/bash

HPCC_CODE_DIR = $1

if [-z "${HPCC_CODE_DIR}"];then
    echo "Usage:$0<HPCC-Platform-Dir>"
    exit
fi

if [!-d "${HPCC_CODE_DIR}"];then
    echo "${HPCC_CODE_DIR} does not exist"
    exit
fi

g++ -c std=c++11 -fPIC \
    -l${HPCC_CODE_DIR}/system/include \
    -l${HPCC_CODE_DIR}/system/jlib \
    -l${HPCC_CODE_DIR}/rtl/eclrtl \
    -l${HPCC_CODE_DIR}/rtl/include \
    -l${HPCC_CODE_DIR}/common/deftype \
    -o octaveplugin.o \
    octavemebed.cpp

g++ -shared octaveplugin.o -L/usr/local/lib/octave/5.1.0 -loctave -L/usr/local/lib/octave/5.1.0 -loctinterp -o liboctaveplugin.so
 

