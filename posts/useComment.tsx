import React, { useState, useEffect } from 'react';
import { arrayToTree } from 'performant-array-to-tree';
import useSWR, { useSWRConfig } from "swr";
import Comment from "../components/commentRender";
import { fetchComment, addCommentToList, editCommentary, removeComment } from "./fetcher/commentFetcher";
import { CommentLoader } from 'components/commentElement'; 

function useComment(commentVariable: {
    postId: string; next: number; isParent: boolean; commentParentId: string; limit: number;
}) {
    const { postId, next, isParent, commentParentId, limit } = commentVariable;
    const { error, data } = useSWR<{
        getCommentByPostId: {
            nextTimeStamp: number,
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
                    updatedAt: string,
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
        limit: 3 // batas komentar root yang ditampilkan 
    };
    const childShowLimit = 2; // batas komentar children yang ditampilkan saat diklik 
    const { postId, next, isParent, commentParentId, limit } = commentVariable;
    const { comment, isLoading, isError } = useComment(commentVariable);
    const { mutate } = useSWRConfig();
    // ------------------
    const dataSet = !comment?.getCommentByPostId?.results ? [] : comment.getCommentByPostId.results;
    const dataTimeStamp = !comment?.getCommentByPostId?.nextTimeStamp ? 0 : comment.getCommentByPostId.nextTimeStamp;
    // -------------------

    const [inProgress, setInProgress] = useState('');
    const [isNext, setIsNext] = useState(dataTimeStamp); // sebelumnya null
    useEffect(() => {
        setIsNext(dataTimeStamp);
    }, [dataTimeStamp]);
    if (isLoading) return <CommentLoader message={''}/>
    if (isError) return <div>error</div>

    const showMore = async () => {
        // khusus untuk komentar root 
        setInProgress('loading root');
        const moreComment = await fetchComment(postId, isNext, true, "", limit);
        if (!moreComment.getCommentByPostId) setInProgress('');
        // console.log(moreComment.getCommentByPostId);
        if (moreComment.getCommentByPostId) {
            await mutate([postId, next, isParent, commentParentId, limit], async () => {
                const { nextTimeStamp, results } = moreComment.getCommentByPostId;
                const getCommentByPostId = {
                    getCommentByPostId: {
                        nextTimeStamp: nextTimeStamp,
                        results: [...dataSet, ...results]
                    }
                };
                setInProgress('');
                return getCommentByPostId
            }, false)
        }
    };
    const showMoreChildren = async ({ commentId: cpId }: { commentId: any }) => {
        // khusus untuk menampilkan komentar balasan (children)
        let thisChildren = dataSet.filter(d => d.parentId === cpId);
        // jika di data cache tidak ada, kita akan cari di database;
        // ini disedikan untuk tombol "tampilkan (int) balasan lainnya"
        if (!thisChildren.length) {
            setInProgress(cpId+'1');
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
                    updatedAt: !x.updatedAt ? null : x.updatedAt,
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
                    setInProgress('');
                    return getCommentByPostId
                }, false)
            }
        } else if (thisChildren.length) {
            setInProgress(cpId+'2');
            // ini untuk tombol bawah. Karena tombol bawah hanya tampil
            // saat cache sudah terisi data children sebelumnya ("tampilkan lebih banyak")
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
                    updatedAt: !x.updatedAt ? null : x.updatedAt,
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
                    setInProgress('');
                    return getCommentByPostId
                }, false)
            }
        }
    }
    const addComment = async (newCommentToAdd: {
        postId: string;
        content: string;
        parentUserId: string;
        parentCommentId: string;
        token: string;
    }) => {
        setInProgress('add root comment');
        const { addComment: newComment } = await addCommentToList(newCommentToAdd);
        if (!newComment.id) setInProgress('');
        if (newComment.id) {
            setInProgress(newComment.id);
            await mutate([postId, next, isParent, commentParentId, limit], async () => {
                const newArrayResults = [newComment].concat(dataSet);
                const getCommentByPostId = {
                    getCommentByPostId: {
                        nextTimeStamp: dataTimeStamp,
                        results: newArrayResults
                    }
                };
                setInProgress('');
                return getCommentByPostId;
            }, false)
        }

    };
    const addReply = async (
        newReplyAdded: {
            postId: string;
            parentUserId: string;
            parentCommentId: string;
            parentUpdatedAt: string;
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
        setInProgress(newReplyAdded.parentCommentId + 'ok');
        const { addComment: newReply } = await addCommentToList(newReplyAdded);
        const { parentId } = newReply;
        if (!parentId) setInProgress('');
        if (parentId) {
            await mutate([postId, next, isParent, commentParentId, limit], async () => {
                const {
                    postId: postIdOfParent,
                    // content: replyContent,  //ini hanya digunakan untuk request saja
                    parentUserId,
                    parentCommentId,
                    parentUpdatedAt,
                    parentIdentity,
                    parentCreatedAt } = newReplyAdded;

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
                        updatedAt: parentUpdatedAt,
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
                setInProgress('');
                return getCommentByPostId;
            }, false)
        }
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
        setInProgress(commentId);
        const editThisComment = await editCommentary({ token, commentId, content })
        if (!editThisComment) setInProgress('');
        if (editThisComment) {
            const { content: cont, updatedAt, userId } = editThisComment.updateComment;
            // console.log(editThisComment);
            const updatedData = dataSet.map(x => (x.id === commentId ?
                {
                    id: commentId,
                    userId,
                    postId: pId,
                    parentId,
                    updatedAt,
                    createdAt: '',
                    identity,
                    content: cont,
                    children: null,
                    numofchildren,
                    loadMore
                } : x));
            await mutate([postId, next, isParent, commentParentId, limit], async () => {
                // const nresult = dataSet.map(x => x.id === commentId ? updatedData[0] : x);
                const getCommentByPostId = {
                    getCommentByPostId: {
                        nextTimeStamp: dataTimeStamp,
                        results: updatedData
                    }
                };
                setInProgress('');
                return getCommentByPostId
            }, false);
        }
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
        setInProgress(commentId)
        const removeThis = await removeComment({ token, postId, commentId, userId, parentUserId });
        const { id: thisId } = removeThis.deleteComment;
        if (!thisId) setInProgress('');
        if (thisId) {
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
                setInProgress('');
                return getCommentByPostId
            }, false)
        }
    }
    const commentData = arrayToTree(dataSet, { dataField: "" });
    return <Comment
        data={commentData}
        pId={pId}
        addComment={addComment}
        addReply={addReply}
        // showComment={showComment}
        showMore={showMore}
        showMoreChildren={showMoreChildren}
        nextComment={isNext}
        saveEditedComment={saveEditedComment}
        removeComment={deleteComment}
        inProgress={inProgress}
    />
}