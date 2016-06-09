const utils = require("shipit-utils");
const _ = require("lodash");

module.exports = function (gruntOrShipit) {
  const shipit = init(utils.getShipit(gruntOrShipit));
  const config = shipit.config || {};
  const secretsConfig = Object.assign({}, shipit.config.secrets, {
    files: {},
    removeBefore: true,
    runAfter: "published",
    resolveSource: _.template("<%= shipit.config.deployTo %>/secrets/<%= source %>"),
    resolveTarget: _.template("<%= shipit.config.deployTo %>/current/<%= target %>")
  });


  const files = _.mapValues(_.mapKeys(files, (source, target) => {
    return resolveTarget({target, shipit})
  }), (source) => {
    return resolveSource({source, shipit})
  });

  require("./finish.js")(gruntOrShipit, files);
  require("./link.js")(gruntOrShipit, files);
  require("./prep.js")(gruntOrShipit, files);

  const task = ["secrets:prep", "secrets:link", "secrets:finish"]
  if (removeBefore !== true) {
    //remove the :prep task
    task.shift();
  }

  utils.registerTask(gruntOrShipit, "secrets", task);
  shipit.on(secretsConfig.runAfter, () => shipit.start("secrets"));
};

