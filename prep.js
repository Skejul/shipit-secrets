const utils = require("shipit-utils");
const chalk = require("chalk");

module.exports = function (gruntOrShipit, shipit, secretsConfig) {
  utils.registerTask(gruntOrShipit, "secrets:prep", () => Promise.all(_(secretsConfig.files).map(removeFile).toArray()).then(() => {
    shipit.log(chalk.green("Secrets prepped."));
    return shipit.emit("secrets:prepped");
  }));

  function removeFile(source, target) {
    return shipit.remote(`rm -f ${target}`);
  }
};
