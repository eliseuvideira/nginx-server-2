const { Command } = require("commander");
const { mkdirpSync, copyFileSync } = require("fs-extra");
const path = require("path");
const {
  NGINX_DIR,
  CERTBOT_DIR,
  NGINX_DOMAINS_DIR,
  CERTBOT_CONFIG_DIR,
  TEMPLATES_DIR,
} = require("../utils/constants");

const program = new Command();

const makeDirectories = () => {
  mkdirpSync(NGINX_DIR);
  mkdirpSync(NGINX_DOMAINS_DIR);
  mkdirpSync(CERTBOT_DIR);
  mkdirpSync(CERTBOT_CONFIG_DIR);
};

const copyNginxConf = () => {
  const TEMPLATE_DEFAULT_CONF = path.join(TEMPLATES_DIR, "default.conf");
  const DEFAULT_CONF = path.join(NGINX_DIR, "default.conf");

  copyFileSync(TEMPLATE_DEFAULT_CONF, DEFAULT_CONF);
};

const copyOptionsSslNginx = () => {
  const TEMPLATE_OPTIONS_SSL_NGINX = path.join(
    TEMPLATES_DIR,
    "options-ssl-nginx.conf"
  );
  const OPTIONS_SSL_NGINX = path.join(
    CERTBOT_CONFIG_DIR,
    "options-ssl-nginx.conf"
  );

  copyFileSync(TEMPLATE_OPTIONS_SSL_NGINX, OPTIONS_SSL_NGINX);
};

const copySslDhparams = () => {
  const TEMPLATE_SSL_DHPARAMS = path.join(TEMPLATES_DIR, "ssl-dhparams.pem");
  const SSL_DHPARAMS = path.join(CERTBOT_CONFIG_DIR, "ssl-dhparams.pem");

  copyFileSync(TEMPLATE_SSL_DHPARAMS, SSL_DHPARAMS);
};

const init = program.command("init").action(() => {
  makeDirectories();

  copyNginxConf();

  copyOptionsSslNginx();

  copySslDhparams();
});

module.exports = init;
