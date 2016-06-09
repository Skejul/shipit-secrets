const utils = require("shipit-utils");
const chalk = require("chalk");

module.exports = function (gruntOrShipit, files) {
  utils.registerTask(gruntOrShipit, "secrets:link", () => Promise.all(_(files).map(linkFile).toArray()).then(() => {
    shipit.log(chalk.green("Secrets linked."));
    return shipit.emit("secrets:copied");
  }));

  function linkFile(source, target) {
    return shipit.remote(`ln -s "${source}" "${target}"`);
  }
};

