import { runCommand, registerCommand, type CommandsRegistry } from "./commands";
import { handlerLogin, handlerRegister, handlerReset } from "./users";
async function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error("Not enough arguments");
    process.exit(1);
  }

  const [cmdName, ...userArguments] = args;
  const registry: CommandsRegistry = {};

  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);
  registerCommand(registry, "reset", handlerReset);

  try {
    await runCommand(registry, cmdName, ...userArguments);
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error running command ${cmdName}: ${err.message}`);
    } else {
      console.error(`Error running command ${cmdName}: ${err}`);
    }
    process.exit(1);
  }
  process.exit(0);
}

main();
