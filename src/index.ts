import { runCommand, registerCommand, type CommandsRegistry } from "./commands";
import { handlerLogin } from "./users";
function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error("Not enough arguments");
    process.exit(1);
  }

  const [cmdName, ...userArguments] = args;
  const registry: CommandsRegistry = {};

  registerCommand(registry, "login", handlerLogin);

  try {
    runCommand(registry, cmdName, ...userArguments);
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error running command ${cmdName}: ${err.message}`);
    } else {
      console.error(`Error running command ${cmdName}: ${err}`);
    }
    process.exit(1);
  }
}

main();
