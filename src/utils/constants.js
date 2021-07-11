const path = require("path");

exports.NGINX_DIR = path.join(__dirname, "..", "..", "nginx");

exports.NGINX_DOMAINS_DIR = path.join(
  __dirname,
  "..",
  "..",
  "nginx",
  "domains"
);

exports.CERTBOT_DIR = path.join(__dirname, "..", "..", "certbot");

exports.CERTBOT_CONFIG_DIR = path.join(
  __dirname,
  "..",
  "..",
  "certbot",
  "conf"
);

exports.TEMPLATES_DIR = path.join(__dirname, "..", "..", "templates");
