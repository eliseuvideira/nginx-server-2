const { execSync } = require("child_process");

/**
 * @param {string} cmd
 */
exports.exec = (cmd) => {
  execSync(cmd, { stdio: "inherit" });
};
