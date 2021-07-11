const { Command } = require("commander");
const fs = require("fs-extra");
const { CERTBOT_CONFIG_DIR, NGINX_DIR } = require("../utils/constants");
const { spawn } = require("@ev-fns/spawn");
const path = require("path");

const program = new Command();

const makeconfig = () =>
  `
server_tokens off;

include /etc/nginx/conf.d/domains/*.conf;

server {
  listen 80 default_server;
  listen 443 default_server;
  listen [::]:80 default_server;
  listen [::]:443 default_server;
  server_name "";
  ssl_certificate /etc/letsencrypt/live/default_server/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/default_server/privkey.pem;
  return 444;
}
  `.trim();

exports.init = program.command("init").action(async () => {
  const cert_path = path.join(CERTBOT_CONFIG_DIR, "live", "default_server");

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

  await fs.mkdirp(NGINX_DIR);

  const config = makeconfig();

  const default_config_path = path.join(NGINX_DIR, "default.conf");

  await fs.writeFile(default_config_path, config + "\n");
});
