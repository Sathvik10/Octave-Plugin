#!/bin/bash

while getopts ":c:" opts; do
    case "${opts}" in
        c)
            instanceName="${OPTARG}"
            ;;
        *)
            help
            ;;
    esac
done
shift $((OPTIND - 1))
action=$1

exec 2>/var/log/HPCCSystems/${instanceName}/thorslaves-launch.debug
set -x

[[ -z "${instanceName}" || -z "${action}" ]] && exit 1

cwd=$(pwd)
if [[ "${cwd}" != "/var/lib/HPCCSystems/${instanceName}" ]]; then
    [[ ! -d "/var/lib/HPCCSystems/${instanceName}" ]] && exit 1
    cd /var/lib/HPCCSystems/${instanceName}
fi

source ${instanceName}.cfg

slaveIps=($(/opt/HPCCSystems/bin/daliadmin server=$DALISERVER clusternodes ${THORNAME} slaves timeout=2 1>/dev/null 2>&1; uniq slaves))
if [[ -z $slaveIps ]]; then
	slaveIps=($(uniq slaves 2>&1))
fi
[[ -z $slaveIps ]] && exit 1

numOfNodes=${#slaveIps[@]}

for ((i=0;i<${#slaveIps[@]};i++)); do
    for ((c=0;c<${slavespernode};c++)); do
        __slavePort=$((${THORSLAVEPORT} + (${c} * ${localthorportinc}))) 
        __slaveNum=$((${i} + 1 + (${c} * ${#slaveIps[@]})))
        ssh -o LogLevel=QUIET -o StrictHostKeyChecking=no -o BatchMode=yes -i ${SSHidentityfile} ${SSHusername}@${slaveIps[$i]} "/bin/bash -c '/opt/HPCCSystems/sbin/thorslaves-exec.sh ${action} thorslave_${instanceName}_${__slaveNum} ${__slavePort} ${__slaveNum} ${THORNAME} ${THORMASTER} ${THORMASTERPORT}'"
    done
done

exit 0
