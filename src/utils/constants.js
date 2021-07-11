const path = require("path");

exports.NAME = process.env.npm_package_name;

exports.VERSION = process.env.npm_package_version;

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

exports.NGINX_CONFIG = path.join(
  __dirname,
  "..",
  "..",
  "nginx",
  "default.conf"
);

exports.TEMPLATE_DEFAULT_CONFIG = path.join(
  __dirname,
  "..",
  "..",
  "templates",
  "default.conf"
);

exports.TEMPLATES_DIR = path.join(__dirname, "..", "..", "templates");
