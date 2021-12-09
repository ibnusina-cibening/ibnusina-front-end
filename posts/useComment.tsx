import React, { useState } from 'react';
import { arrayToTree } from 'performant-array-to-tree';
import useSWR, { useSWRConfig } from "swr";
import Comment from "../components/commentRender";
import { fetchComment, addCommentToList, editCommentary } from "./fetcher/commentFetcher";

function useComment(commentVariable) {
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
                    postId: string,
                    userId: string
                    children: number
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
        next: null,
        isParent: true,
        commentParentId: "",
        limit: 5
    };
    const childShowLimit = 2; 
    const { postId, next, isParent, commentParentId, limit } = commentVariable;
    const { comment, isLoading, isError } = useComment(commentVariable);
    const { mutate } = useSWRConfig();
    const dataSet = !comment?.getCommentByPostId?.results ? [] : comment.getCommentByPostId.results;
    // const [isData, setIsData] = useState(dataSet);
    const [isNext, setIsNext] = useState(null);
    // console.log(dataSet);
    if (isLoading) return <div>loading</div>
    if (isError) return <div>error</div>
    const showComment = async () => {
        // await setIsData(comment.getCommentByPostId.results);
        setIsNext(comment.getCommentByPostId.nextTimeStamp);
    };
    const showMore = async () => {
        const moreComment = await fetchComment(postId, isNext, true, "", limit);
        const { nextTimeStamp, results } = moreComment.getCommentByPostId;
        // setIsData([...isData, ...results]);
        setIsNext(nextTimeStamp);
        await mutate([postId, next, isParent, commentParentId, limit], async () => {
            // const nresult = comment.getCommentByPostId.results.map(x => x.id === commentId ? updatedData[0]: x);
            const  getCommentByPostId = {getCommentByPostId:{
                nextTimeStamp: comment.getCommentByPostId.nextTimeStamp,
                results: [...comment.getCommentByPostId.results, ...results]// di backend harus mereturn response berupa array, walaupun array kosong
            }};
            return getCommentByPostId
        }, false)
    };
    const showMoreChildren = async ({ commentId: cpId}) => {
        let thisChildren = comment.getCommentByPostId.results.filter(d => d.parentId === cpId);
        // let thisParent = isData.filter(d => d.id === cpId);
        // const newData = isData.filter(d => d.id !== cpId);
        // jika di state tidak ada, kita akan cari di database;
        if (!thisChildren.length) {
            const moreComment = await fetchComment(postId, null, false, cpId, childShowLimit + 1);
            const { results } = moreComment.getCommentByPostId;
            if (results.length > 0) {
                // menyalin aray dari database dan membuang elemen terakhir; 
                // jika resultnya terdiri dari satu elemen array 
                const copyResults = results.length > childShowLimit ? results.slice(0, -1) : results;
                // console.log(copyResults, results);
                // apakah masih ada children yang harus ditampilkan pada komentar ini? 
                // jika masih ada, maka tombol show more akan ditampilkan. Jika tidak, maka tidak
                const newData = comment.getCommentByPostId.results.map(x => (x.id === cpId ? {
                    id: x.id,
                    parentId: x.parentId,
                    content: x.content,
                    createdAt: x.createdAt,
                    postId: x.postId,
                    userId: x.userId,
                    identity: x.identity,
                    children: null,
                    numofchildren: x.numofchildren,
                    loadMore: results.length > childShowLimit ? true : false
                } : x))
                const updateData = [...newData, ...copyResults];
                // setIsData(updateData);
                await mutate([postId, next, isParent, commentParentId, limit], async () => {
                    // const nresult = comment.getCommentByPostId.results.map(x => x.id === commentId ? updatedData[0]: x);
                    const  getCommentByPostId = {getCommentByPostId:{
                        nextTimeStamp: comment.getCommentByPostId.nextTimeStamp,
                        results: updateData// di backend harus mereturn response berupa array, walaupun array kosong
                    }};
                    return getCommentByPostId
                }, false)
            }
        } else if (thisChildren.length) {
            const commentIndex = thisChildren.length - 1;
            const nextData = parseInt(thisChildren[commentIndex].createdAt);
            const moreComment = await fetchComment(postId, nextData, false, cpId, childShowLimit + 1);
            const { results } = moreComment.getCommentByPostId;
            if (results.length > 0) {
                // menyalin aray dari database dan membuang elemen terakhir; 
                // jika resultnya terdiri dari satu elemen array 
                const copyResults = results.length > childShowLimit ? results.slice(0, -1) : results;
                // apakah masih ada children yang harus ditampilkan pada komentar ini? 
                // jika masih ada, maka tombol show more akan ditampilkan. Jika tidak, maka tidak
                const newData = comment.getCommentByPostId.results.map(x => (x.id === cpId ? {
                    id: x.id,
                    parentId: x.parentId,
                    content: x.content,
                    createdAt: x.createdAt,
                    postId: x.postId,
                    userId: x.userId,
                    identity: x.identity,
                    children: null,
                    numofchildren: x.numofchildren,
                    loadMore: results.length > childShowLimit ? true : false
                } : x))
                const updateData = [...newData, ...copyResults];
                // setIsData(updateData);
                await mutate([postId, next, isParent, commentParentId, limit], async () => {
                    // const nresult = comment.getCommentByPostId.results.map(x => x.id === commentId ? updatedData[0]: x);
                    const  getCommentByPostId = {getCommentByPostId:{
                        nextTimeStamp: comment.getCommentByPostId.nextTimeStamp,
                        results: updateData// di backend harus mereturn response berupa array, walaupun array kosong
                    }};
                    return getCommentByPostId
                }, false)
            }
        }
    }
    const addComment = async (newCommentToAdd) => {
        await mutate([postId, next, isParent, commentParentId, limit], async () => {
            const { addComment: newComment } = await addCommentToList(newCommentToAdd);
            const newArrayResults = [newComment].concat(comment.getCommentByPostId.results);
            // const arr = { ...comment, results: newArrayResults, nextTimeStamp: comment.getCommentByPostId.nextTimeStamp };
            // setIsData(newArrayResults);
            // return arr;
            const  getCommentByPostId = {getCommentByPostId:{
                nextTimeStamp: comment.getCommentByPostId.nextTimeStamp,
                results: newArrayResults// di backend harus mereturn response berupa array, walaupun array kosong
            }};
            return getCommentByPostId;
        }, false)
    };
    const addReply = async (newReplyAdded, vr2) => {
        await mutate([postId, next, isParent, commentParentId, limit], async () => {
            const { postId: postIdOfParent,
                // content: replyContent,  ini hanya digunakan untuk request saja
                parentUserId,
                parentCommentId,
                parentIdentity,
                parentCreatedAt } = newReplyAdded;
            const { addComment: newReply } = await addCommentToList(newReplyAdded);
            const { postId, userId, content, createdAt, id, identity, numofchildren, parentId } = newReply;
            // numofchildren diambil dari data yang ada (cache atau state)
            const { parentIdOfParent, parentContent, parentChildNum, parentLoadMore } = vr2;
            // mengupdate numofchildren pada parent comment 
            // sekaligus penambahan loadMore
            const updatedData = comment.getCommentByPostId.results.map(x => (x.id === parentId ?
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
            // const arr = { ...comment, results: newArrayResults, nextTimeStamp: comment.getCommentByPostId.nextTimeStamp };
            // await setIsData(newArrayResults);
            // console.log(newArrayResults);
            const  getCommentByPostId = {getCommentByPostId:{
                nextTimeStamp: comment.getCommentByPostId.nextTimeStamp,
                results: newArrayResults// di backend harus mereturn response berupa array, walaupun array kosong
            }};
            return getCommentByPostId;
        }, false)
    };
    const saveEditedComment = async ({ id: commentId, localValue: content, numofchildren, parentId, identity, loadMore, token }) => {
        const editThisComment = await editCommentary({ token, commentId, content })
        const { content: cont, createdAt, userId } = editThisComment.updateComment;
        const updatedData = comment.getCommentByPostId.results.map(x => (x.id === commentId ?
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
            const nresult = comment.getCommentByPostId.results.map(x => x.id === commentId ? updatedData[0]: x);
            const  getCommentByPostId = {getCommentByPostId:{
                nextTimeStamp: comment.getCommentByPostId.nextTimeStamp,
                results: nresult// di backend harus mereturn response berupa array, walaupun array kosong
            }};
            return getCommentByPostId
        }, false)
        // setIsData(updatedData);
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
    />
}