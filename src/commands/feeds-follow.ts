import { readConfig } from "../config";
import {
  createFeedFollow,
  getFeedFollowsForUser,
} from "../lib/db/queries/feed-follows";
import { getFeedByUrl } from "../lib/db/queries/feeds";
import { getUserByName } from "../lib/db/queries/users";

export async function handlerFollowFeed(_cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("The follow handler expects a single argument, the url");
  }

  const currentUser = readConfig().currentUserName;
  const user = await getUserByName(currentUser as string);

  if (!user) {
    throw new Error(
      `Current configuration user "${currentUser}" does not exist in the database.`,
    );
  }

  const url = args[0];
  const feed = await getFeedByUrl(url);

  if (!feed) {
    throw new Error(`Feed "${url}" does not exist in the database.`);
  }

  const follow = await createFeedFollow(user.id, feed.id);
  if (!follow) {
    throw new Error(`Failed to follow feed`);
  }

  printFeedFollow(user.name, feed.name);
}

export async function handlerFollowing(_cmdName: string) {
  const user = readConfig().currentUserName;
  if (!user) {
    throw new Error("Current user not found");
  }

  const userId = await getUserByName(user);
  if (!userId) {
    throw new Error(`User ${user} does not exist`);
  }

  const feeds = await getFeedFollowsForUser(userId.id);
  if (feeds.length === 0) {
    console.log(`No feed follows found for this user.`);
    return;
  }

  for (const feed of feeds) {
    console.log(`* ${feed.feedName} (${feed.userName})`);
  }
}

export function printFeedFollow(username: string, feedname: string) {
  console.log(`* User:          ${username}`);
  console.log(`* Feed:          ${feedname}`);
}
