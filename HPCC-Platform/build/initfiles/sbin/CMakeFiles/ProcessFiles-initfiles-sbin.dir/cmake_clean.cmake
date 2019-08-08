file(REMOVE_RECURSE
  "CMakeFiles/ProcessFiles-initfiles-sbin"
  "hpcc_setenv"
  "complete-uninstall.sh"
  "keygen.sh"
  "add_conf_settings.sh"
  "rm_conf_settings.sh"
  "configmgr"
  "config2mgr"
  "install-cluster.sh"
  "hpcc-push.sh"
  "hpcc-run.sh"
  "remote-install-engine.sh"
  "deploy-java-files.sh"
  "check-component-exists.sh"
  "prerm"
)

# Per-language clean rules from dependency scanning.
foreach(lang )
  include(CMakeFiles/ProcessFiles-initfiles-sbin.dir/cmake_clean_${lang}.cmake OPTIONAL)
endforeach()
