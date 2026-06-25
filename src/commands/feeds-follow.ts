import {
  createFeedFollow,
  getFeedFollowsForUser,
} from "../lib/db/queries/feed-follows";
import { getFeedByUrl } from "../lib/db/queries/feeds";
import { getUserByName } from "../lib/db/queries/users";
import { User } from "../lib/db/schema";

export async function handlerFollowFeed(
  _cmdName: string,
  user: User,
  ...args: string[]
) {
  if (args.length !== 1) {
    throw new Error("The follow handler expects a single argument, the url");
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

export async function handlerFollowing(_cmdName: string, user: User) {
  const feeds = await getFeedFollowsForUser(user.id);
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
