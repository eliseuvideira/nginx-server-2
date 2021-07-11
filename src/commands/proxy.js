const { Command } = require("commander");
const { readFileSync, writeFileSync, mkdirpSync } = require("fs-extra");
const {
  NGINX_DOMAINS_DIR,
  CERTBOT_CONFIG_DIR,
  TEMPLATES_DIR,
} = require("../utils/constants");
const path = require("path");
const selfsigned = require("selfsigned");
const rimraf = require("rimraf");
const { exec } = require("../functions/exec");

const program = new Command();

const copyProxyConfig = (domain, location) => {
  const TEMPLATE_PROXY_CONFIG = path.join(TEMPLATES_DIR, "proxy.conf");

  const buffer = readFileSync(TEMPLATE_PROXY_CONFIG);
  const content = buffer.toString();

  const config = content
    .replace(/<domain>/g, domain)
    .replace(/<location>/g, location);

  const PROXY_CONFIG = path.join(NGINX_DOMAINS_DIR, domain + ".conf");

  writeFileSync(PROXY_CONFIG, config);
};

const createDummyCert = (domain) => {
  const CERT_PATH = path.join(CERTBOT_CONFIG_DIR, "live", domain);

  mkdirpSync(CERT_PATH);

  const cert = selfsigned.generate(null, {
    days: 1,
    keySize: 4096,
    clientCertificate: true,
    clientCertificateCN: "localhost",
    algorithm: "rsa",
  });

  const fullchain = cert.cert;
  const privkey = cert.private;

  writeFileSync(path.join(CERT_PATH, "fullchain.pem"), fullchain);
  writeFileSync(path.join(CERT_PATH, "privkey.pem"), privkey);
};

const recreateNginx = () => {
  exec(`
    docker-compose up --force-recreate -d nginx
  `);
};

const deleteDummyCert = (domain) => {
  rimraf.sync(path.join(CERTBOT_CONFIG_DIR, "live", domain));
  rimraf.sync(path.join(CERTBOT_CONFIG_DIR, "archive", domain));
  rimraf.sync(path.join(CERTBOT_CONFIG_DIR, "renewal", domain + ".conf"));
};

const startCertbot = (domain, email, staging) => {
  exec(`
    docker-compose run --rm --entrypoint "\\
      certbot certonly --webroot -w /var/www/certbot \\
        ${staging ? "--staging" : ""} \\
        --email "${email}" \\
        -d "${domain}" \\
        --rsa-key-size 4096 \\
        --agree-tos \\
        --force-renewal" certbot
  `);
};

const reloadNginx = () => {
  exec(`
    docker-compose exec nginx nginx -s reload
  `);
};

const proxy = program
  .command("proxy <domain> <email> <location>")
  .option("-s,--staging")
  .action((domain, email, location, options) => {
    copyProxyConfig(domain, location);

    createDummyCert(domain);

    recreateNginx();

    deleteDummyCert(domain);

    startCertbot(domain, email, options.staging);

    reloadNginx();
  });

module.exports = proxy;
