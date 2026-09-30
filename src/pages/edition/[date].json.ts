import { editionJson, getEditions, jsonResponse, type Edition } from '../../editions';

export async function getStaticPaths() {
  return (await getEditions()).map((edition) => ({ params: { date: edition.date }, props: { edition } }));
}

export function GET({ props }: { props: { edition: Edition } }) {
  return jsonResponse(editionJson(props.edition));
}
