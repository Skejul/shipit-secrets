const utils = require("shipit-utils");

module.exports = function (gruntOrShipit, shipit, secretsConfig) {
  utils.registerTask(gruntOrShipit, "secrets:finish", () => {
    shipit.emit("secrets:done");
  });
};
