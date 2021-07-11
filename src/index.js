#!/usr/bin/env node
const commander = require("commander");
const init = require("./commands/init");
const { proxy } = require("./commands/proxy");
const { NAME, VERSION } = require("./utils/constants");

const program = new commander.Command();

program.name(NAME).version(VERSION, "-v,--version").showHelpAfterError();

program.addCommand(init);
program.addCommand(proxy);

program.parse();
