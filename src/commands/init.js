const { Command } = require("commander");
const fs = require("fs-extra");
const { NGINX_DIR } = require("../utils/constants");
const path = require("path");
const { createDummyCert } = require("../functions/createDummyCert");
const { ssl } = require("../functions/ssl");

const program = new Command();

exports.init = program.command("init").action(async () => {
  await createDummyCert("default_server");

  await fs.mkdirp(NGINX_DIR);

  const config = `
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
  `;

  const configFile = path.join(NGINX_DIR, "default.conf");

  await fs.writeFile(configFile, config.replace(/^    /gm, "").trim() + "\n");

  ssl();
});
