const path = require("path");

exports.NAME = process.env.npm_package_name;

exports.VERSION = process.env.npm_package_version;

exports.DOMAINS_DIR = path.join(__dirname, "..", "..", "nginx", "domains");
