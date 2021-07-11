#!/usr/bin/env node
const commander = require("commander");
const init = require("./commands/init");
const proxy = require("./commands/proxy");

const program = new commander.Command();

program
  .name(process.env.npm_package_name)
  .version(process.env.npm_package_version, "-v,--version")
  .showHelpAfterError();

program.addCommand(init);
program.addCommand(proxy);

program.parse();
