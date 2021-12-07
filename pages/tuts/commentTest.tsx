import React, { useState } from 'react';
import styles from '../../components/layout.module.css';
import utilStyles from '../../styles/utils.module.css';
import { arrayToTree } from 'performant-array-to-tree';
import CommentList from '../../components/commentList';
import { AddComment } from '../../components/commentElement';
import { Login } from '../../lib/login';
import { GraphQLClient } from 'graphql-request';
import { getComment } from '../../posts/query';
import useSWR from "swr";


async function fetcher({postId, next, isParent, commentParentId}) {
    console.log(postId, next);
    const url = "http://localhost:4000/graphql";
    // console.log(variables);
    const headers = {
        Authorization: ''
    }
    const client = new GraphQLClient(url, { headers });
    const res = client.request(getComment, {postId, next, isParent, commentParentId});
    const data = await res;
    console.log(data);
    return data;
}

const useGetComment = ({postId, next, isParent, commentParentId}) => {
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
    }>([postId, next, isParent, commentParentId], fetcher, { revalidateOnFocus: false });
    return {
      comment: data,
      isLoading: !error && !data,
      isError: error
    }
}

export default function Comment({ postId }: { postId: String }) {
    const [commentList, setCommentList] = useState([]);
    const [formValue, setFormValue] = useState('tulis komentar');
    const [showForm, setShowForm] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    // const variables = {postId: "a77329b6-482d-4820-be00-1e7b7570ead7", next: null, isParent:true, commentParentId:""};
    // const { comment, isLoading, isError } = useGetComment({postId: "a77329b6-482d-4820-be00-1e7b7570ead7", next: null, isParent:true, commentParentId:""});
    // console.log('hello', comment);
    // membuat komentar baru 
    const handleClick = (e) => {
        if (e.target.name === 'show') {
            setShowForm(!showForm)
            setFormValue('tulis komentar');
            fetcher({postId: "a77329b6-482d-4820-be00-1e7b7570ead7", next: null, isParent:true, commentParentId:""});
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
        <div className={styles.container}>
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

