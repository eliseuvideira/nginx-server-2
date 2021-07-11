const fs = require("fs-extra");
const path = require("path");
const { Command } = require("commander");
const { makeconfig } = require("../functions/makeconfig");
const { DOMAINS_DIR } = require("../utils/constants");

const program = new Command();

exports.proxy = program
  .command("proxy")
  .usage("server.ev1.pw eliseu@ev1.pw http://localhost:8080")
  .argument("domain", "domain name without http/https\t\tex: server.ev1.pw")
  .argument("email", "email to setup certbot\t\t\tex: eliseu@ev1.pw")
  .argument("location", "location to proxy to\t\t\tex: http://localhost:8080")
  .option("-s,--staging", "staging certbot", false)
  .action(async (domain, email, location, options) => {
    const config = makeconfig(domain, location);

    await fs.mkdirp(DOMAINS_DIR);

    const configpath = path.join(DOMAINS_DIR, domain + ".conf");
    await fs.writeFile(configpath, config);

    console.log({ domain, email, location, options });
  });
