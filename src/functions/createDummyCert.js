const path = require("path");
const fs = require("fs-extra");
const { CERTBOT_CONFIG_DIR } = require("../utils/constants");
const { spawn } = require("@ev-fns/spawn");

exports.createDummyCert = async (domain) => {
  const certPath = path.join(CERTBOT_CONFIG_DIR, "live", domain);

  await fs.mkdirp(certPath);

  await spawn(`
    openssl req \\
      -x509 \\
      -nodes \\
      -newkey \\
      rsa:4096 \\
      -days 1 \\
      -keyout '${certPath}/privkey.pem' \\
      -out '${certPath}/fullchain.pem' \\
      -subj '/CN=localhost'
  `);
};
