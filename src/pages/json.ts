import { editionJson, getEditions, jsonResponse } from '../editions';

export async function GET() {
  const [latest] = await getEditions();
  return jsonResponse(editionJson(latest));
}
