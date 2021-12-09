import React, { useState } from 'react';
import utilStyles from '../styles/utils.module.css';
import CommentList from '../components/commentList';
import { AddComment, ButtonComment } from '../components/commentElement';
import { Login } from '../lib/login';
import { useSession } from "next-auth/react";

export default function Comment({
    data,
    pId,
    addComment,
    addReply,
    showComment,
    nextComment,
    showMore,
    showMoreChildren,
    saveEditedComment
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
    const setLogin = (e) => {
        setIsLoggedIn(e);
        setShowForm(e);
    };
    const onChange = (e) => {
        setFormValue(e.target.value);
    };
    // hasil edit komentar disimpan
    const saveCommentEdited = ({ id, localValue, numofchildren, parentId, identity, loadMore }) => {
        saveEditedComment({ 
            id, 
            localValue, 
            numofchildren, 
            parentId, 
            identity,
            loadMore,
            token: session ? session.token : null})
        // console.log(localValue)
    };
    const saveReply = ({ parentCommentId,
        parentUserId,
        replyContent,
        parentIdOfParent,
        parentContent,
        parentChildNum,
        parentIdentity,
        parentCreatedAt,
        parentLoadMore }) => {
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
            parentIdOfParent, parentContent, parentChildNum, parentLoadMore
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