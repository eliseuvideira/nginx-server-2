const { mkdirpSync } = require("fs-extra");
const { CERTBOT_CONFIG_DIR } = require("../utils/constants");
const { exec } = require("./exec");

exports.ssl = () => {
  mkdirpSync(CERTBOT_CONFIG_DIR);

  exec(`
    curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "${CERTBOT_CONFIG_DIR}/options-ssl-nginx.conf"
  `);

  exec(`
    curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "${CERTBOT_CONFIG_DIR}/ssl-dhparams.pem"
  `);
};
