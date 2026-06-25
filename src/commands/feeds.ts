import { readConfig } from "../config";
import { createFeedFollow } from "../lib/db/queries/feed-follows";
import { createFeed, getAllFeeds } from "../lib/db/queries/feeds";
import { getUserById, getUserByName } from "../lib/db/queries/users";
import { Feed, User } from "../lib/db/schema";
import { printFeedFollow } from "./feeds-follow";

export async function handlerAddFeed(
  _cmdName: string,
  user: User,
  ...args: string[]
) {
  if (args.length !== 2) {
    throw new Error("The add handler expects a 2 arguments, the name and url");
  }

  const [name, url] = args;

  const feed = await createFeed(url, name, user.id);
  if (!feed) {
    throw new Error(`Failed to create feed`);
  }

  const feedFollow = await createFeedFollow(user.id, feed.id);

  printFeedFollow(user.name, feedFollow.feedName);

  console.log("Feed created successfully:");
  printFeed(feed, user);
}

export async function handlerListFeeds(_cmdName: string) {
  const feeds = await getAllFeeds();

  if (feeds.length === 0) {
    console.log("No feeds found");
    return;
  }

  for (const feed of feeds) {
    const user = await getUserById(feed.userId);
    if (!user) {
      throw new Error(`User ${feed.userId} does not exist`);
    }
    printFeed(feed, user);
  }
}

function printFeed(feed: Feed, user: User) {
  console.log(`* ID:            ${feed.id}`);
  console.log(`* Created:       ${feed.createdAt}`);
  console.log(`* Updated:       ${feed.updatedAt}`);
  console.log(`* name:          ${feed.name}`);
  console.log(`* URL:           ${feed.url}`);
  console.log(`* User:          ${user.name}`);
}
