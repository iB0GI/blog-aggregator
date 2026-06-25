import { db } from "..";
import { feeds } from "../schema";

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
