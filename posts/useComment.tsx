import React, { useState } from 'react';
import utilStyles from '../styles/utils.module.css';
import { arrayToTree } from 'performant-array-to-tree';
import CommentList from '../components/commentList';
import { AddComment } from '../components/commentElement';
import { Login } from '../lib/login';
import { GraphQLClient } from 'graphql-request';
import { getComment } from './query';
import useSWR from "swr";


async function fetcher(postId, next, isParent, commentParentId, limit) {
    // console.log(postId, next, isParent, commentParentId);
    console.log('hi dari komentar');
    const url = await process.env.NEXT_PUBLIC_GRAPH_URL;
    const headers = {
        Authorization: ''
    }
    const client = new GraphQLClient(url, { headers });
    const res = await client.request(getComment, {postId, next, isParent, commentParentId, limit}, headers);
    const data = await res;
    return data;
}

export default function UseComment({ pId }: { pId: String }) {
    const variables = { 
        postId: "a77329b6-482d-4820-be00-1e7b7570ead7", 
        next: null, 
        isParent: true, 
        commentParentId: "",
        limit: 3
    };
    const {postId, next, isParent,  commentParentId, limit} = variables;
    const { error, data } = useSWR<{
        getCommentByPostId: {
            id: string
            postId: string
            content: string
            createdAt: string
            updatedAt: string
            identity: {
                avatar: string
                callName: string
            }
            userId: string
            parentId: string
            numofchildren: number
            children: number
        }
    }>([postId, next, isParent, commentParentId, limit], fetcher, {revalidateOnFocus: false, revalidateOnMount: true});
    if (!data) return <div>loading</div>
    if (error) return <div>error</div>
    return <Comment data={data.getCommentByPostId}/>
}

function Comment({data}) {
    const [commentList, setCommentList] = useState(data.results);
    const [formValue, setFormValue] = useState('tulis komentar');
    const [showForm, setShowForm] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    // membuat komentar baru 
    const handleClick = (e) => {
        if (e.target.name === 'show') {
            setShowForm(!showForm)
            setFormValue('tulis komentar');
            // const dataList = fetcher(variables);
            // console.log(dataList);
        }
        if (e.target.name === 'submit') {
            let n = Math.floor(Math.random() * Date.now());
            setCommentList([...commentList, ...[
                { id: n.toString(), parentId: "", content: formValue, children: null, numofchildren: 0 }
            ]]);
        }
    };
    const setLogin = (e) => {
        setIsLoggedIn(e);
        setShowForm(e);
        // console.log('hello', e);
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
    const saveReply = ({ id, parentId, content, parentChildNum, parentContent, parentIdOfParent }) => {
        const updatedData = commentList.map(x => (x.id === parentId ?
            {
                id: parentId,
                parentId: parentIdOfParent,
                content: parentContent,
                children: null,
                numofchildren: parentChildNum + 1
            } : x));
        setCommentList([...updatedData, ...[{ id, parentId, content, children: null, numofchildren: 0 }]]);
    }
    const deleteComment = ({ id }) => {
        // pertama kita hapus dulu childrennya, jika ada
        const removeChildren = commentList.filter(x => x.parentId !== id);
        // menghapus komentar root 
        const newData = removeChildren.filter(x => x.id !== id);
        setCommentList(newData);;
    }
    const commentData = arrayToTree(commentList, { dataField: "" });
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
                    commentData.map(c => {
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

