import { getEditions, jsonResponse } from '../editions';

// Index of every edition, newest first: what the terminal reader lists in its sidebar.
export async function GET() {
  const editions = (await getEditions()).map((e) => ({ date: e.date, count: e.stories.length }));
  return jsonResponse(JSON.stringify(editions, null, 2));
}
