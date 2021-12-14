import React, { useState } from 'react';
import utilStyles from '../styles/utils.module.css';
import CommentList from '../components/commentList';
import { AddComment, ButtonComment } from '../components/commentElement';
import { Login } from '../lib/login';
import { useSession } from "next-auth/react";
import { Box, List, ListSubheader, ListItem, Divider } from '@mui/material';

export default function Comment({
    data,
    pId,
    addComment,
    addReply,
    showComment,
    nextComment,
    showMore,
    showMoreChildren,
    saveEditedComment,
    removeComment
}: {
    data: any,
    pId: string,
    addComment: any,
    addReply: any,
    showComment: any,
    nextComment: any,
    showMore: any,
    showMoreChildren: any,
    saveEditedComment: any,
    removeComment: any
}) {
    const dataList = data;
    // const [commentList, setCommentList] = useState(data);
    const [formValue, setFormValue] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const { data: session, status } = useSession();
    const handleClick = async (e: { target: { name: string; }; }) => {
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
    const setLogin = (e: boolean | ((prevState: boolean) => boolean)) => {
        setIsLoggedIn(e);
        setShowForm(e);
    };
    const onChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setFormValue(e.target.value);
    };
    // hasil edit komentar disimpan
    const saveCommentEdited = ({ id, localValue, numofchildren, parentId, identity, loadMore }: {
        id: string,
        localValue: string,
        numofchildren: number,
        parentId: string,
        identity: object,
        loadMore: boolean
    }) => {
        saveEditedComment({
            id,
            localValue,
            numofchildren,
            parentId,
            identity,
            loadMore,
            token: session ? session.token : null
        })
    };
    const saveReply = ({
        parentCommentId,
        parentUserId,
        replyContent,
        parentIdOfParent,
        parentContent,
        parentChildNum,
        parentIdentity,
        parentCreatedAt,
        parentLoadMore }: {
            parentCommentId: string
            parentUserId: string,
            replyContent: string,
            parentIdOfParent: string,
            parentContent: string,
            parentChildNum: number,
            parentIdentity: string,
            parentCreatedAt: string,
            parentLoadMore: boolean
        }) => {
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
    const deleteComment = ({ postId, commentId, userId, parentId }: {
        postId: string,
        commentId: string,
        userId: string,
        parentId: string
    }) => {
        removeComment({ token: session ? session.token : null, postId, commentId, userId, parentId });
    };
    // console.log(session.id);
    return (
        <>
            <Divider
                sx={{
                    ml: 'auto',
                    width: (theme) => `calc(100% - ${theme.spacing(7)})`
                }}
            />

            {showForm &&
                <Box component="div" sx={{ p: 2, border: '1px dashed grey', width: '100%' }}>
                    <Login
                        getlogin={setLogin}
                    />
                </Box>
            }

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

            <Divider
                sx={{
                    ml: 'auto',
                    width: (theme) => `calc(100% - ${theme.spacing(7)})`
                }}
            />
            {showForm &&
                dataList.map((c: { id: React.Key | null | undefined; }) => {
                    return <div key={c.id}>
                        <CommentList
                            comment={c}
                            saveCommentEdited={saveCommentEdited}
                            deleteComment={deleteComment}
                            saveReplyToParent={saveReply}
                            showMoreChildren={showMoreChildren}
                            thisUserId={!session ? undefined : session.id}
                            setLogin={setLogin}
                        />
                    </div>
                })
            }
            {showForm && nextComment &&
             <Box  sx={{ '& button': { m: 1 }, p: 2, width: '100%', justifyContent:"center", alignItems:"center", display:"flex"}}>
                <ButtonComment
                    id={333}    
                    name="show more"
                    onClick={handleClick}
                />
            </Box>
            }

        </>
    )
}