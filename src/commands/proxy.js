const { Command } = require("commander");
const { certbot } = require("../functions/certbot");
const { createDummyCert } = require("../functions/createDummyCert");
const { createProxyConfig } = require("../functions/createProxyConfig");
const { deleteDummyCert } = require("../functions/deleteDummyCert");
const { recreateNginx } = require("../functions/recreateNginx");
const { reloadNginx } = require("../functions/reloadNginx");

const program = new Command();

exports.proxy = program
  .command("proxy")
  .usage("server.ev1.pw eliseu@ev1.pw http://localhost:8080")
  .argument("domain", "domain name without http/https\t\tex: server.ev1.pw")
  .argument("email", "email to setup certbot\t\t\tex: eliseu@ev1.pw")
  .argument("location", "location to proxy to\t\t\tex: http://localhost:8080")
  .option("-s,--staging", "staging certbot", false)
  .action(async (domain, email, location, options) => {
    createProxyConfig(domain, location);

    await createDummyCert(domain);

    recreateNginx();

    deleteDummyCert(domain);

    certbot(domain, email, options.staging);

    reloadNginx();
  });
