#!/usr/bin/env node
const { Command } = require("commander");
const { makeconfig } = require("./functions/makeconfig");
const fs = require("fs-extra");
const path = require("path");

const VERSION = process.env.npm_package_version;

const program = new Command();

program.name("cert").version(VERSION, "-v,--version");

program
  .command("proxy")
  .usage("server.ev1.pw eliseu@ev1.pw http://localhost:8080")
  .argument("domain", "domain name without http/https\t\tex: server.ev1.pw")
  .argument("email", "email to setup certbot\t\t\tex: eliseu@ev1.pw")
  .argument("location", "location to proxy to\t\t\tex: http://localhost:8080")
  .option("-s,--staging", "staging certbot", false)
  .action(async (domain, email, location, options) => {
    const config = makeconfig(domain, location);

    const configdir = path.join(__dirname, "..", "nginx", "domains");
    await fs.mkdirp(configdir);

    const configpath = path.join(configdir, domain + ".conf");
    await fs.writeFile(configpath, config);

    console.log({ domain, email, location, options });
  })
  .showHelpAfterError();

program.parse();
