const fs = require("fs-extra");
const path = require("path");
const rimraf = require("rimraf");
const { CERTBOT_CONFIG_DIR } = require("../utils/constants");

exports.deleteDummyCert = (domain) => {
  const paths = [
    path.join(CERTBOT_CONFIG_DIR, "live", domain),
    path.join(CERTBOT_CONFIG_DIR, "archive", domain),
    path.join(CERTBOT_CONFIG_DIR, "renewal", domain + ".conf"),
  ];

  for (const item of paths) {
    rimraf.sync(item);
  }
};
