// import myQuery from './query';
// import { request } from 'graphql-request'

export default async function <JSON = any>(
    input: RequestInfo,
    init?: RequestInit
): Promise<JSON> {
    // const res= request(process.env.GRAPH_URL, query, {"postId": input});
    const res = await fetch(input, init);
    const d = await res.json();
    // console.log(d);
    return d;
}


