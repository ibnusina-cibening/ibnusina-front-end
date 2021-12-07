import React, { useEffect, useState } from 'react';
import utilStyles from '../styles/utils.module.css';
import { arrayToTree } from 'performant-array-to-tree';
import CommentList from '../components/commentList';
import { AddComment } from '../components/commentElement';
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
            results: [], // di backend harus mereturn response berupa array, walaupun array kosong
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
        limit: 10
    };
    const { postId, next, isParent, commentParentId, limit } = commentVariable;
    const { comment, isLoading, isError } = useComment(commentVariable);
    const [isData, setIsData] = useState([]);
    const { mutate } = useSWRConfig();
    if (isLoading) return <div>loading</div>
    if (isError) return <div>error</div>
    const addComment = async (newCommentToAdd) => {
        await mutate([postId, next, isParent, commentParentId, limit], async () => {
            const { addComment: newComment } = await addCommentToList(newCommentToAdd);
            const newArrayResults = [newComment].concat(comment.getCommentByPostId.results);
            const arr = { ...comment, results: newArrayResults, nextTimeStamp: comment.getCommentByPostId.nextTimeStamp };
            setIsData(newArrayResults);
            return arr;
        }, false)
    }
    const addReply = async (newReplyAdded, vr2) => {
        // console.log(newReplyAdded);
        // console.log(vr2);
        const { addComment: newReply } = await addCommentToList(newReplyAdded);
        console.log(newReply);
        // const updatedData = commentList.map(x => (x.id === parentId ?
        //     {
        //         id: parentId,
        //         parentId: parentIdOfParent,
        //         content: parentContent,
        //         children: null,
        //         numofchildren: parentChildNum + 1
        //     } : x));
        // setCommentList([...updatedData, ...[{ id, parentId, content, children: null, numofchildren: 0 }]]);

    }
    const res = !comment ? [] : comment.getCommentByPostId.results;
    const d = isData.length > 0 ? isData : res;
    const commentData = arrayToTree(d, { dataField: "" });
    // const commentData = comment.getCommentByPostId.results ? arrayToTree(comment.getCommentByPostId.results, { dataField: "" }) : [];
    return <Comment
        data={commentData}
        pId={pId}
        addComment={addComment}
        addReply={addReply}
    />
}
function Comment({ data, pId, addComment, addReply }) {
    const dataList = data;
    const [commentList, setCommentList] = useState(data);
    const [formValue, setFormValue] = useState('tulis komentar');
    const [showForm, setShowForm] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const { data: session, status } = useSession();
    const handleClick = async (e) => {
        if (e.target.name === 'show') {
            await setShowForm(!showForm)
            await setFormValue('tulis komentar');
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
    const setLogin = (e) => {
        setIsLoggedIn(e);
        setShowForm(e);
    }
    const onChange = (e) => {
        setFormValue(e.target.value);
    }
    // hasil edit komentar disimpan
    const saveCommentEdited = ({ id, localValue, numofchildren, parentId }) => {
        const updatedData = commentList.map(x => (x.id === id ?
            { id, parentId, content: localValue, children: null, numofchildren } : x));
        setCommentList(updatedData);
    }
    const saveReply = ({ parentCommentId, parentUserId, replyContent, parentIdOfParent, parentContent, parentChildNum }) => {
        // const updatedData = commentList.map(x => (x.id === parentId ?
        //     {
        //         id: parentId,
        //         parentId: parentIdOfParent,
        //         content: parentContent,
        //         children: null,
        //         numofchildren: parentChildNum + 1
        //     } : x));
        // setCommentList([...updatedData, ...[{ id, parentId, content, children: null, numofchildren: 0 }]]);
        const vr = {
            postId: pId,
            content: replyContent,
            parentUserId,
            parentCommentId,
            token: session ? session.token : null
        };
        const vr2 = { // untuk kebutuhan modifikasi cache
            parentIdOfParent, parentContent, parentChildNum 
        }
        addReply(vr, vr2);
    }
    const deleteComment = ({ id }) => {
        // pertama kita hapus dulu childrennya, jika ada
        const removeChildren = commentList.filter(x => x.parentId !== id);
        // menghapus komentar root 
        const newData = removeChildren.filter(x => x.id !== id);
        setCommentList(newData);
    }
    return (
        <div>
            <Login
                getlogin={setLogin}
            />
            <AddComment
                formValue={formValue}
                showForm={showForm}
                onChange={onChange}
                handleClick={handleClick}
                isLoggedIn={isLoggedIn}
            />
            <div>
                <span>--------------------------------------</span>
                {
                    dataList.map(c => {
                        return <div className={utilStyles.commentContainer} key={c.id}>
                            <CommentList
                                comment={c}
                                saveCommentEdited={saveCommentEdited}
                                deleteComment={deleteComment}
                                saveReplyToParent={saveReply}
                            />
                        </div>
                    })
                }
            </div>
        </div>
    )
}