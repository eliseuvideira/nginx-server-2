const path = require("path");
const fs = require("fs-extra");
const { CERTBOT_CONFIG_DIR } = require("../utils/constants");
const { spawn } = require("@ev-fns/spawn");

exports.createDummyCert = async (domain) => {
  const cert_path = path.join(CERTBOT_CONFIG_DIR, "live", domain);

  await fs.mkdirp(cert_path);

  await spawn(`
    openssl req \\
      -x509 \\
      -nodes \\
      -newkey \\
      rsa:4096 \\
      -days 1 \\
      -keyout '${cert_path}/privkey.pem' \\
      -out '${cert_path}/fullchain.pem' \\
      -subj '/CN=localhost'
  `);
};
