#!/bin/bash

 

HPCC_CODE_DIR=$1

 

if [ -z "${HPCC_CODE_DIR}" ];then

    echo "Usage: $0 <HPCC-Platform-Dir>"

    exit

fi

 

if [ ! -d "${HPCC_CODE_DIR}" ];then

    echo "${HPCC_CODE_DIR} does not exist"

    exit

fi

 

g++ -c -std=c++11 -fPIC \

    -I${HPCC_CODE_DIR}/system/include \

    -I${HPCC_CODE_DIR}/system/jlib \

    -I${HPCC_CODE_DIR}/rtl/eclrtl \

    -I${HPCC_CODE_DIR}/rtl/include \

    -I${HPCC_CODE_DIR}/common/deftype \

    -I${HPCC_CODE_DIR}/roxie/roxiemem \

    -I${HPCC_CODE_DIR}/rtl/nbcd \

    -o octaveplugin.o \

    octaveembed.cpp

 

g++ -shared octaveplugin.o -L/usr/local/lib/octave/5.1.0 -loctave -Wl,-rpath /usr/local/lib/octave/5.1.0 -loctinterp -o liboctaveplugin.so