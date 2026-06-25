import { handlerRssAgg } from "./commands/aggregate";
import {
  runCommand,
  registerCommand,
  type CommandsRegistry,
} from "./commands/commands";
import { handlerAddFeed, handlerListFeeds } from "./commands/feeds";
import { handlerFollowFeed, handlerFollowing } from "./commands/feeds-follow";
import { handlerReset } from "./commands/reset";
import {
  handlerListUsers,
  handlerLogin,
  handlerRegister,
} from "./commands/users";
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
  registerCommand(registry, "users", handlerListUsers);
  registerCommand(registry, "agg", handlerRssAgg);
  registerCommand(registry, "addfeed", handlerAddFeed);
  registerCommand(registry, "feeds", handlerListFeeds);
  registerCommand(registry, "follow", handlerFollowFeed);
  registerCommand(registry, "following", handlerFollowing);

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
