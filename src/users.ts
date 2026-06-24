import { setUser } from "./config";

export function handlerLogin(_cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error(
      "The login handler expects a single argument, the username",
    );
  }
  setUser(args[0]);
  console.log(`User name has been set as ${args[0]}`);
}
