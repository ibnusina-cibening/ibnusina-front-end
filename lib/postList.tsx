import {postList, headers, url} from './query';

export default async function postData() {
  const query = postList;
  const getData = {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query
    })
  };
  const response = await fetch(url, getData);
  if (!response.ok) {
    const message = `Terjadi masalah di postList. Pesan error: ${response.status}`;
    throw new Error(message);
  }
  const post = await response.json();
  return post;
}