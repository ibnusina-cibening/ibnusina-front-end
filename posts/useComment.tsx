import React, { useEffect, useState } from 'react';
import utilStyles from '../styles/utils.module.css';
import { arrayToTree } from 'performant-array-to-tree';
import CommentList from '../components/commentList';
import { AddComment, ButtonComment } from '../components/commentElement';
import { Login } from '../lib/login';
import { GraphQLClient } from 'graphql-request';
import { getComment, addComment } from './query';
import useSWR, { useSWRConfig } from "swr";
import { useSession } from "next-auth/react";

async function fetchComment(postId, next, isParent, commentParentId, limit) {
    console.log('hi dari fetchComent');
    const url = await process.env.NEXT_PUBLIC_GRAPH_URL;
    // const url = "http://localhost:4000/";
    const headers = {
        Authorization: ''
    }
    const client = new GraphQLClient(url, { headers });
    const res = await client.request(getComment, { postId, next, isParent, commentParentId, limit }, headers);
    const data = await res;
    return data;
}

async function addCommentToList({ postId, content, parentUserId, parentCommentId, token }) {
    console.log('hai dari addCommenttoList');
    const url = await process.env.NEXT_PUBLIC_GRAPH_URL;
    // const url = "http://localhost:4000/"
    const headers = {
        Authorization: token
    }
    const client = new GraphQLClient(url, { headers });
    const res = await client.request(addComment, { postId, content, parentUserId, parentCommentId }, headers);
    const data = await res;
    return data;
}

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
                    numOfChildren: number,
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
    const { postId, next, isParent, commentParentId, limit } = commentVariable;
    const { comment, isLoading, isError } = useComment(commentVariable);
    const { mutate } = useSWRConfig();
    const dataSet = !comment?.getCommentByPostId?.results ? [] : comment.getCommentByPostId.results;
    const [isData, setIsData] = useState(dataSet);
    const [isNext, setIsNext] = useState(null);
    const [shouldLoad, setShouldLoad] = useState('');
    if (isLoading) return <div>loading</div>
    if (isError) return <div>error</div>
    const showComment = async () => {
        await setIsData(comment.getCommentByPostId.results);
        setIsNext(comment.getCommentByPostId.nextTimeStamp);
    };
    const showMore = async () => {
        // const varComment = {postId: pId, next:isNext, isParent:true, commentParentId:"", limit: 2};
        const moreComment = await fetchComment(postId, isNext, true, "", limit);
        const { nextTimeStamp, results } = moreComment.getCommentByPostId;
        setIsData([...isData, ...results]);
        setIsNext(nextTimeStamp);
    };
    const showMoreChildren = async ({ commentParentId: cpId, childShowLimit }) => {
        const nextComment = isData.filter(d => d.parentId === cpId);
        // jika di state tidak ada, kita akan cari di database;
        if (!nextComment.length) {
            const moreComment = await fetchComment(postId, null, false, cpId, childShowLimit + 1);
            const { results } = moreComment.getCommentByPostId;
            if (results.length > 0) {
                // menyalin aray dari database dan membuang elemen terakhir; 
                const copyResults = results.slice(0, -1); 
                // console.log(copyResults, results);
                // apakah masih ada children yang harus ditampilkan pada komentar ini? 
                // jika masih ada, maka tombol show more akan ditampilkan. Jika tidak, maka tidak
                results.length > childShowLimit ? setShouldLoad(cpId): setShouldLoad('');
                const updateData = [...isData, ...copyResults];
                setIsData(updateData);
            }else{
                setShouldLoad('');
            }
        } else if (nextComment.length){
            const commentIndex = nextComment.length - 1;
            const nextData = parseInt(nextComment[commentIndex].createdAt);
            const moreComment = await fetchComment(postId, nextData, false, cpId, childShowLimit + 1);
            const { results } = moreComment.getCommentByPostId;
            if (results.length > 0) {
                // menyalin aray dari database dan membuang elemen terakhir; 
                const copyResults = results.slice(0, -1); 
                // apakah masih ada children yang harus ditampilkan pada komentar ini? 
                // jika masih ada, maka tombol show more akan ditampilkan. Jika tidak, maka tidak
                results.length > childShowLimit ? setShouldLoad(cpId): setShouldLoad('');
                const updateData = [...isData, ...copyResults];
                setIsData(updateData);
            }else{
                setShouldLoad('');
            }
        }
    }
    const addComment = async (newCommentToAdd) => {
        await mutate([postId, next, isParent, commentParentId, limit], async () => {
            const { addComment: newComment } = await addCommentToList(newCommentToAdd);
            const newArrayResults = [newComment].concat(isData);
            const arr = { ...comment, results: newArrayResults, nextTimeStamp: comment.getCommentByPostId.nextTimeStamp };
            setIsData(newArrayResults);
            return arr;
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
            const { parentIdOfParent, parentContent, parentChildNum } = vr2;
            // mengupdate numofchildren pada parent comment 
            const updatedData = isData.map(x => (x.id === parentId ?
                {
                    id: parentCommentId,
                    parentId: parentIdOfParent,
                    content: parentContent,
                    createdAt: parentCreatedAt,
                    postId: postIdOfParent,
                    userId: parentUserId,
                    identity: parentIdentity,
                    children: null,
                    numofchildren: parentChildNum + 1
                } : x));
            // const newArrayResults = [...updatedData, newReply];
            const newArrayResults = [newReply].concat(updatedData);
            const arr = { ...comment, results: newArrayResults, nextTimeStamp: comment.getCommentByPostId.nextTimeStamp };
            await setIsData(newArrayResults);
            return arr;
        }, false)

    }
    // console.log(shouldLoad);
    const commentData = arrayToTree(isData, { dataField: "" });
    return <Comment
        data={commentData}
        pId={pId}
        addComment={addComment}
        addReply={addReply}
        showComment={showComment}
        showMore={showMore}
        showMoreChildren={showMoreChildren}
        nextComment={isNext}
        shouldLoad = {shouldLoad}
    />
}
function Comment({
    data,
    pId,
    addComment,
    addReply,
    showComment,
    nextComment,
    showMore,
    showMoreChildren,
    shouldLoad
}) {
    const dataList = data;
    const [commentList, setCommentList] = useState(data);
    const [formValue, setFormValue] = useState('tulis komentar');
    const [showForm, setShowForm] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const { data: session, status } = useSession();
    const handleClick = async (e) => {
        if (e.target.name === 'show') {
            await setShowForm(!showForm)
            // await setFormValue('tulis komentar');
            showComment();
        }
        if (e.target.name === 'show more') {
            // console.log(nextComment);
            showMore()
        }
        if (e.target.name === 'submit') {
            const vr = {
                postId: pId,
                content: formValue,
                parentUserId: "",
                parentCommentId: "",
                token: session ? session.token : null
            }
            addComment(vr);
        }
    };
    // const showMoreChildren = (e)=>{
    //     console.log(e);
    // }
    const setLogin = (e) => {
        setIsLoggedIn(e);
        setShowForm(e);
    };
    const onChange = (e) => {
        setFormValue(e.target.value);
    };
    // hasil edit komentar disimpan
    const saveCommentEdited = ({ id, localValue, numofchildren, parentId }) => {
        const updatedData = commentList.map(x => (x.id === id ?
            { id, parentId, content: localValue, children: null, numofchildren } : x));
        setCommentList(updatedData);
    };
    const saveReply = ({ parentCommentId,
        parentUserId,
        replyContent,
        parentIdOfParent,
        parentContent,
        parentChildNum,
        parentIdentity,
        parentCreatedAt }) => {
        const vr = {
            postId: pId,
            content: replyContent,
            parentUserId,
            parentCommentId,
            parentIdentity,
            parentCreatedAt,
            token: session ? session.token : null
        };
        const vr2 = { // untuk kebutuhan modifikasi cache
            parentIdOfParent, parentContent, parentChildNum
        };
        addReply(vr, vr2);
    };
    const deleteComment = ({ id }) => {
        // pertama kita hapus dulu childrennya, jika ada
        const removeChildren = commentList.filter(x => x.parentId !== id);
        // menghapus komentar root 
        const newData = removeChildren.filter(x => x.id !== id);
        setCommentList(newData);
    };
    return (
        <div>
            {showForm && <Login
                getlogin={setLogin}
            />}
            {!showForm &&
                <ButtonComment
                    id={1}
                    name="show"
                    onClick={handleClick}
                />

            }
            {
                showForm &&
                <AddComment
                    formValue={formValue}
                    onChange={onChange}
                    handleClick={handleClick}
                    isLoggedIn={isLoggedIn}
                />
            }
            <div>
                <span>--------------------------------------</span>
                {showForm &&
                    dataList.map(c => {
                        return <div className={utilStyles.commentContainer} key={c.id}>
                            <CommentList
                                comment={c}
                                saveCommentEdited={saveCommentEdited}
                                deleteComment={deleteComment}
                                saveReplyToParent={saveReply}
                                showMoreChildren={showMoreChildren}
                                shouldLoad = {shouldLoad}
                            />
                        </div>
                    })
                }
                {showForm && nextComment && <ButtonComment
                    id={333}
                    name="show more"
                    onClick={handleClick}
                />}
            </div>
        </div>
    )
}