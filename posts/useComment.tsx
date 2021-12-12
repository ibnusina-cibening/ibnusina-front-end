import React, { useState } from 'react';
import { arrayToTree } from 'performant-array-to-tree';
import useSWR, { useSWRConfig } from "swr";
import Comment from "../components/commentRender";
import { fetchComment, addCommentToList, editCommentary, removeComment } from "./fetcher/commentFetcher";

function useComment(commentVariable: {
    postId: string; next: number; isParent: boolean; commentParentId: string; limit: number;
}) {
    const { postId, next, isParent, commentParentId, limit } = commentVariable;
    const { error, data } = useSWR<{
        getCommentByPostId: {
            nextTimeStamp: 0,
            results: [
                {
                    id: string,
                    content: string,
                    identity: {
                        callName: string,
                        avatar: string
                    },
                    numofchildren: number,
                    parentId: string
                    createdAt: string,
                    postId: string,
                    userId: string
                    children: number
                    loadMore: boolean
                }
            ], // di backend harus mereturn response berupa array, walaupun array kosong
        }
    }>([postId, next, isParent, commentParentId, limit], fetchComment, {
        revalidateOnFocus: false,
        revalidateOnMount: true
    });
    return {
        comment: data,
        isLoading: !error && !data,
        isError: error
    }
}

export default function GetKomentar({ pId, }: { pId: string }) {
    const commentVariable = {
        postId: pId,
        next: 0,
        isParent: true,
        commentParentId: "",
        limit: 5
    };
    const childShowLimit = 2;
    const { postId, next, isParent, commentParentId, limit } = commentVariable;
    const { comment, isLoading, isError } = useComment(commentVariable);
    const { mutate } = useSWRConfig();
    // ------------------
    const dataSet = !comment?.getCommentByPostId?.results ? [] : comment.getCommentByPostId.results;
    const dataTimeStamp = !comment?.getCommentByPostId?.results ? 0 : comment.getCommentByPostId.nextTimeStamp;
    // -------------------
    const [isNext, setIsNext] = useState(0); // sebelumnya null
    if (isLoading) return <div>loading</div>
    if (isError) return <div>error</div>

    const showComment = async () => {
        // setisnext hanya untuk kebutuhan menampilkan komentar root 
        // KITA BELUM MENGANTISIPASI JIKA TIDAK ADA KOMENTAR ([]);
        const setNext = !comment ? 0 : dataTimeStamp;
        setIsNext(setNext);
    };
    const showMore = async () => {
        // khusus untuk komentar root 
        const moreComment = await fetchComment(postId, isNext, true, "", limit);
        const { nextTimeStamp, results } = moreComment.getCommentByPostId;
        setIsNext(nextTimeStamp);
        await mutate([postId, next, isParent, commentParentId, limit], async () => {
            const getCommentByPostId = {
                getCommentByPostId: {
                    nextTimeStamp: nextTimeStamp,
                    results: [...dataSet, ...results]
                }
            };
            return getCommentByPostId
        }, false)
    };
    const showMoreChildren = async ({ commentId: cpId }: { commentId: any }) => {
        // khusus untuk menampilkan komentar balasan (children)
        let thisChildren = dataSet.filter(d => d.parentId === cpId);
        // jika di data cache tidak ada, kita akan cari di database;
        // ini disedikan untuk tombol "tampilkan ... komntar lainnya" (di atas)
        // karena itu, next timestampnya dibiarkan null tidak masalah
        if (!thisChildren.length) {
            const moreComment = await fetchComment(postId, null, false, cpId, childShowLimit + 1);
            const { results } = moreComment.getCommentByPostId;
            if (results.length > 0) {
                // menyalin aray dari database 
                // dan membuang elemen terakhir, jika resultnya lebih besar dari childshowlimit
                const copyResults = results.length > childShowLimit ? results.slice(0, -1) : results;
                // apakah masih ada children yang harus ditampilkan pada komentar ini? 
                // jika masih ada, maka tombol show more akan ditampilkan. Jika tidak, maka tidak
                const newData = dataSet.map(x => (x.id === cpId ? {
                    id: x.id,
                    parentId: x.parentId,
                    content: x.content,
                    createdAt: x.createdAt,
                    postId: x.postId,
                    userId: x.userId,
                    identity: x.identity,
                    children: null,
                    numofchildren: x.numofchildren,
                    loadMore: results.length > childShowLimit ? true : false // poinnya di sini
                } : x))
                const updateData = [...newData, ...copyResults];
                await mutate([postId, next, isParent, commentParentId, limit], async () => {
                    const getCommentByPostId = {
                        getCommentByPostId: {
                            // timestamp dibiarkan tidak berubah,
                            // karena kita akan membutuhkannya untuk komentar root (show more)

                            nextTimeStamp: dataTimeStamp,
                            results: updateData
                        }
                    };
                    return getCommentByPostId
                }, false)
            }
        } else if (thisChildren.length) {
            // ini untuk tombol bawah. Karena tombol bawah hanya tampil
            // saat cache sudah terisi data children sebelumnya
            const commentIndex = thisChildren.length - 1;
            // membuat nexttimestamp
            const nextData = parseInt(thisChildren[commentIndex].createdAt);
            const moreComment = await fetchComment(postId, nextData, false, cpId, childShowLimit + 1);
            const { results } = moreComment.getCommentByPostId;
            if (results.length > 0) {
                // menyalin aray dari database dan membuang elemen terakhir; 
                // jika resultnya terdiri lebih besar dari chilshowlimit
                const copyResults = results.length > childShowLimit ? results.slice(0, -1) : results;
                // apakah masih ada children yang harus ditampilkan pada komentar ini? 
                // jika masih ada, maka tombol show more akan ditampilkan. Jika tidak, maka tidak
                const newData = dataSet.map(x => (x.id === cpId ? {
                    id: x.id,
                    parentId: x.parentId,
                    content: x.content,
                    createdAt: x.createdAt,
                    postId: x.postId,
                    userId: x.userId,
                    identity: x.identity,
                    children: null,
                    numofchildren: x.numofchildren,
                    loadMore: results.length > childShowLimit ? true : false // poinnya di sini
                } : x))
                const updateData = [...newData, ...copyResults];
                await mutate([postId, next, isParent, commentParentId, limit], async () => {
                    const getCommentByPostId = {
                        getCommentByPostId: {
                            // nextimestamp dibiarkan tidak berubah
                            // alasanna sama dengan yang di atas
                            nextTimeStamp: dataTimeStamp,
                            results: updateData
                        }
                    };
                    return getCommentByPostId
                }, false)
            }
        }
    }
    const addComment = async (newCommentToAdd: {
        postId: any;
        content: any;
        parentUserId: any;
        parentCommentId: any;
        token: any;
    }) => {
        await mutate([postId, next, isParent, commentParentId, limit], async () => {
            const { addComment: newComment } = await addCommentToList(newCommentToAdd);
            const newArrayResults = [newComment].concat(dataSet);
            const getCommentByPostId = {
                getCommentByPostId: {
                    nextTimeStamp: dataTimeStamp,
                    results: newArrayResults
                }
            };
            return getCommentByPostId;
        }, false)
    };
    const addReply = async (
        newReplyAdded: {
            postId: string;
            parentUserId: string;
            parentCommentId: string;
            parentIdentity: string;
            parentCreatedAt: string;
            content: string;
            token: string;
        },

        vr2: {
            parentIdOfParent: any;
            parentContent: any;
            parentChildNum: any;
            parentLoadMore: any;
        }) => {
        await mutate([postId, next, isParent, commentParentId, limit], async () => {
            const {
                postId: postIdOfParent,
                // content: replyContent,  //ini hanya digunakan untuk request saja
                parentUserId,
                parentCommentId,
                parentIdentity,
                parentCreatedAt } = newReplyAdded;
            const { addComment: newReply } = await addCommentToList(newReplyAdded);
            const { parentId } = newReply;
            // numofchildren diambil dari data yang ada (cache atau state)
            const { parentIdOfParent, parentContent, parentChildNum, parentLoadMore } = vr2;
            // mengupdate numofchildren pada parent comment 
            // sekaligus penambahan loadMore
            const updatedData = dataSet.map(x => (x.id === parentId ?
                {
                    id: parentCommentId,
                    parentId: parentIdOfParent,
                    content: parentContent,
                    createdAt: parentCreatedAt,
                    postId: postIdOfParent,
                    userId: parentUserId,
                    identity: parentIdentity,
                    children: null,
                    numofchildren: parentChildNum + 1,
                    loadMore: !parentLoadMore ? false : true
                } : x));
            const newArrayResults = [newReply].concat(updatedData); // yang baru disimpan di bawah
            const getCommentByPostId = {
                getCommentByPostId: {
                    nextTimeStamp: dataTimeStamp,
                    results: newArrayResults
                }
            };
            return getCommentByPostId;
        }, false)
    };
    const saveEditedComment = async ({ id: commentId, localValue: content, numofchildren, parentId, identity, loadMore, token }: {
        id: string,
        localValue: string,
        content: string,
        numofchildren: number,
        parentId: string,
        identity: object,
        loadMore: boolean,
        token: string
    }) => {
        const editThisComment = await editCommentary({ token, commentId, content })
        const { content: cont, createdAt, userId } = editThisComment.updateComment;
        const updatedData = dataSet.map(x => (x.id === commentId ?
            {
                id: commentId,
                userId,
                postId: pId,
                parentId,
                createdAt,
                identity,
                content: cont,
                children: null,
                numofchildren,
                loadMore
            } : x));
        await mutate([postId, next, isParent, commentParentId, limit], async () => {
            const nresult = dataSet.map(x => x.id === commentId ? updatedData[0] : x);
            const getCommentByPostId = {
                getCommentByPostId: {
                    nextTimeStamp: dataTimeStamp,
                    results: nresult
                }
            };
            return getCommentByPostId
        }, false)
    }
    const deleteComment = async ({ token, postId, commentId, userId, parentId }: {
        token: string,
        postId: string,
        commentId: string,
        userId: string,
        parentId: string
    }) => {
        const parentComment = dataSet.filter(x => x.id === parentId);
        const parentUserId = !parentComment.length ? '' : parentComment[0].userId;
        const removeThis = await removeComment({ token, postId, commentId, userId, parentUserId });
        const { id: thisId } = removeThis.deleteComment;
        await mutate([postId, next, isParent, commentParentId, limit], async () => {
            // menghapus parent sekaligus children-nya
            const nresult = dataSet.filter(x => x.id !== thisId);
            const nr = await nresult.filter(x => x.parentId !== thisId);
            // kemudian kita juga harus mengupdate numofchildren pada parent, jika memang memiliki parent
            let res;
            if (parentUserId !== '') {
                res = nr.map(d => (d.id === parentComment[0].id ?
                    {
                        id: parentComment[0].id,
                        userId: parentComment[0].userId,
                        postId: pId,
                        parentId: parentComment[0].parentId,
                        createdAt: parentComment[0].createdAt,
                        identity: parentComment[0].identity,
                        content: parentComment[0].content,
                        children: parentComment[0].children,
                        numofchildren: parentComment[0].numofchildren - 1, // berkurang satu 
                        loadMore: parentComment[0].loadMore,
                    } : d
                ))
            }
            // selanjutnya kita update ke cache 
            const getCommentByPostId = {
                getCommentByPostId: {
                    nextTimeStamp: dataTimeStamp,
                    results: !res ? nr : res // antisipasi jika yang dihapus adalah komentar root 
                }
            };
            return getCommentByPostId
        }, false)
    }
    const commentData = arrayToTree(dataSet, { dataField: "" });
    return <Comment
        data={commentData}
        pId={pId}
        addComment={addComment}
        addReply={addReply}
        showComment={showComment}
        showMore={showMore}
        showMoreChildren={showMoreChildren}
        nextComment={isNext}
        saveEditedComment={saveEditedComment}
        removeComment={deleteComment}
    />
}