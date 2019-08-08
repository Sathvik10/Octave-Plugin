#!/bin/bash

[[ $# -ne 7 ]] && exit 1

ACTION=$1
INSTANCENAME=$2
SLAVEPORT=$3
SLAVENUM=$4
THORNAME=$5
THORMASTER=$6
THORMASTERPORT=$7

[[ ! -d /var/log/HPCCSystems/${THORNAME} ]] && mkdir -p /var/log/HPCCSystems/${THORNAME}
[[ ! -d /var/lock/HPCCSystems/${THORNAME} ]] && mkdir -p /var/lock/HPCCSystems/${THORNAME}
[[ ! -d /var/run/HPCCSystems ]] && mkdir -p /var/run/HPCCSystems
[[ ! -d /var/lib/HPCCSystems/tmp ]] && mkdir -p /var/lib/HPCCSystems/thorslaves
cd /var/lib/HPCCSystems/thorslaves

echo "THORNAME=${THORNAME}" > ${INSTANCENAME}.cfg
echo "THORMASTER=${THORMASTER}" >> ${INSTANCENAME}.cfg
echo "THORMASTERPORT=${THORMASTERPORT}" >> ${INSTANCENAME}.cfg
echo "SLAVEPORT=${SLAVEPORT}" >> ${INSTANCENAME}.cfg
echo "SLAVENUM=${SLAVENUM}" >> ${INSTANCENAME}.cfg

sudo systemctl ${ACTION} thorslave@${INSTANCENAME}.service
