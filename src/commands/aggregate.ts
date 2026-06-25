import { fetchFeed } from "../lib/rss";

export async function handlerRssAgg(_cmdName: string) {
  const rssUrl = "https://www.wagslane.dev/index.xml";
  const result = await fetchFeed(rssUrl);
  const resultStr = JSON.stringify(result, null, 2);
  console.log(resultStr);
}
