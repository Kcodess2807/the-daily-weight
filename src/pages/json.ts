import { getEditions } from '../editions';

export async function GET() {
  const [e] = await getEditions();
  const edition = { date: e.date, count: e.stories.length, stories: e.stories.map((s) => ({ ...s.data, body: s.body?.trim() })) };
  return new Response(JSON.stringify(edition, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
