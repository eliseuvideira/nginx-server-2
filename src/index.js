#!/usr/bin/env node
const { Command } = require("commander");

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
  .action((domain, email, location, options) => {
    console.log({ domain, email, location, options });
  })
  .showHelpAfterError();

program.parse();
