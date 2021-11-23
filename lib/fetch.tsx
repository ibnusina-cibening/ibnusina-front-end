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


// const fetcher = queryBody => (url) =>
//     fetch(url, {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(queryBody)
//     }).then(async (res) => {
//         try {
//             const response = await res.json();
//             console.log(response);
//             return response;
//         } catch (error) {
//             console.log(error);
//         }
//     });

//     export default fetcher;