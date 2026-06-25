import { CommandHandler, UserCommandHandler } from "./commands/commands";
import { readConfig } from "./config";
import { getUserByName } from "./lib/db/queries/users";

export function middlewareLoggedIn(
  handler: UserCommandHandler,
): CommandHandler {
  return async (cmdName: string, ...args: string[]) => {
    const currentUser = readConfig().currentUserName;
    if (!currentUser) {
      throw new Error("Current user not found");
    }
    const user = await getUserByName(currentUser);
    if (!user) {
      throw new Error(`User ${currentUser} does not exist`);
    }
    await handler(cmdName, user, ...args);
  };
}
