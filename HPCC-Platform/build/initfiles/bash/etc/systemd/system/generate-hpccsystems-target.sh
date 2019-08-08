#!/bin/bash

want=($(/opt/HPCCSystems/sbin/configgen -env /etc/HPCCSystems/environment.xml -list | awk 'BEGIN {FS="=|;";} !/dafilesrv/ && !/ftslave/ {printf "%s@%s.service ", $2, $1;}'))
require=($(/opt/HPCCSystems/sbin/configgen -env /etc/HPCCSystems/environment.xml -t dafilesrv -list | awk 'BEGIN {FS="=|;";} /dafilesrv/ {printf "%s@%s.service", $2, $1;}'))
all=(${want[@]} ${require[@]})
want_string="${want[@]}"
require_string="${require[@]}"

if [[ -e /etc/systemd/system/hpccsystems-platform.target ]]; then
    rm -f /etc/systemd/system/hpccsystems-platform.target
fi

rm -f /etc/systemd/system/hpccsystems-platform.target
for instance in "${all[@]}"; do
	echo "removing /etc/systemd/system/${instance}"
	rm -f /etc/systemd/system/${instance}
done

echo "generating hpccsystems platform target from environment.xml"
mkdir -p /opt/HPCCSystems/etc/systemd/system/gen
cd /etc/systemd/system
cat << EOT >> /opt/HPCCSystems/etc/systemd/system/gen/hpccsystems-platform.target
[Unit]
Description=hpccsystems-platform components
Requires=${require_string}
Wants=${want_string}
EOT
ln -sf /opt/HPCCSystems/etc/systemd/system/gen/hpccsystems-platform.target hpccsystems-platform.target
for ((i=0; i<${#all[@]}; i++)); do
	component="$(echo "${all[$i]}" | awk 'BEGIN {FS="[.@]";} {print $1;}')"
	instance="$(echo "${all[$i]}" | awk 'BEGIN {FS="[.@]";} {print $2;}')"
	sedcmd="sed 's/\[Unit\]/\[Unit\]\nPartOf=hpccsystems-platform.target/g; s/dafilesrv\.service/${require_string}/g; s/%i/${instance}/g' /opt/HPCCSystems/etc/systemd/system/${component}@.service > /opt/HPCCSystems/etc/systemd/system/gen/${all[$i]}"
    eval "$sedcmd"
	ln -sf /opt/HPCCSystems/etc/systemd/system/gen/${all[$i]} ${all[$i]}
done
systemctl daemon-reload
