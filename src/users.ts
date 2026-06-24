import { setUser } from "./config";
import { createUser, getUserByName, deleteUsers } from "./lib/db/queries/users";

export async function handlerLogin(_cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(
      "The register handler expects a single argument, the username",
    );
  }

  const userName = args[0];
  const user = await getUserByName(userName);

  if (!user) {
    throw new Error(`User ${userName} does not exist`);
  }

  setUser(userName);
  console.log(`User name has been set as ${userName}`);
}

export async function handlerRegister(_cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(
      "The register handler expects a single argument, the username",
    );
  }

  const userName = args[0];
  const result = await createUser(userName);

  if (!result) {
    throw new Error(`Failed to create user ${userName}`);
  }
  setUser(userName);
  console.log(`User ${userName} has been created`);
}

export async function handlerReset(_cmdName: string) {
  await deleteUsers();
  console.log("All users have been deleted");
}
