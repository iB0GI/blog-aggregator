import { db } from "..";
import { eq } from "drizzle-orm";
import { feedFollows, feeds, users } from "../schema";
import { firstOrUndefined } from "./utils";

export async function createFeed(url: string, name: string, userId: string) {
  const [result] = await db
    .insert(feeds)
    .values({ url: url, name: name, userId: userId })
    .returning();
  return result;
}

export async function getAllFeeds() {
  const result = await db.select().from(feeds);
  return result;
}
export async function getFeedByUrl(url: string) {
  const result = await db.select().from(feeds).where(eq(feeds.url, url));
  return firstOrUndefined(result);
}
