import { create } from "./command";
import { program } from "commander";
import Log, { log } from "./plugin/log";

function main() {
  program.name(Log.PROJECT_NAME).usage(Log.VERSION);
  program.version(Log.VERSION);
  create();
  program.on("--help", () => log(Log.HELP));
  program.parse(process.argv);
}

export default main;
