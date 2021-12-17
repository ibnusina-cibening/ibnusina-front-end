import React, { useState } from 'react';
import CommentList from './commentList';
import { AddComment, ButtonComment } from './commentElement';
import { Login } from 'lib/login';
import { useSession } from "next-auth/react";
import { Box, List, ListSubheader, ListItem, Divider, Skeleton } from '@mui/material';
import {CommentLoader} from './commentElement';

export default function Comment({
    data,
    pId,
    addComment,
    addReply,
    // showComment,
    nextComment,
    showMore,
    showMoreChildren,
    saveEditedComment,
    removeComment,
    inProgress
}: {
    data: any,
    pId: string,
    addComment: any,
    addReply: any,
    // showComment: any,
    nextComment: any,
    showMore: any,
    showMoreChildren: any,
    saveEditedComment: any,
    removeComment: any,
    inProgress: string
}) {
    const dataList = data;
    // const [commentList, setCommentList] = useState(data);
    const [formValue, setFormValue] = useState('');
    // const [showForm, setShowForm] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const { data: session, status } = useSession();
    const handleClick = async (e: { target: { name: string; }; }) => {
        if (e.target.name === 'show') {
            // await setShowForm(!showForm)
            // await setFormValue('tulis komentar');
            // showComment();
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
            setFormValue('');
        }
    };
    const setLogin = (e: boolean | ((prevState: boolean) => boolean)) => {
        setIsLoggedIn(e);
        // setShowForm(e);
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
        parentUpdatedAt,
        parentIdentity,
        parentCreatedAt,
        parentLoadMore }: {
            parentCommentId: string
            parentUserId: string,
            replyContent: string,
            parentIdOfParent: string,
            parentContent: string,
            parentChildNum: number,
            parentUpdatedAt: string,
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
            parentUpdatedAt,
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

            {
                <Box component="div" sx={{ p: 2, width: '100%' }}>
                    <Login
                        getLogin={setLogin}
                    />
                </Box>
            }
            {
                session &&
                <>
                    {inProgress === 'add root comment' ?
                        <CommentLoader message={'Tunggu... sedang ditambahkan!'}/> :
                        <AddComment
                            formValue={formValue}
                            onChange={onChange}
                            handleClick={handleClick}
                            isLoggedIn={isLoggedIn}
                        />
                    }
                </>

            }

            <Divider
                sx={{
                    ml: 'auto',
                    width: (theme) => `calc(100% - ${theme.spacing(7)})`
                }}
            />
            {
                dataList.map((c: { id: React.Key | null | undefined; }) => {
                    return <div key={c.id}>
                        <CommentList
                            comment={c}
                            saveCommentEdited={saveCommentEdited}
                            deleteComment={deleteComment}
                            inProgress={inProgress}
                            saveReplyToParent={saveReply}
                            showMoreChildren={showMoreChildren}
                            thisUser={!session ? null : session}
                            setLogin={setLogin}
                        />
                    </div>
                })
            }
            {nextComment !== 0 &&
                <>
                    {inProgress !== 'loading root' ?
                        <Box sx={{ '& button': { m: 1 }, p: 2, width: '100%', justifyContent: "center", alignItems: "center", display: "flex" }}>
                            <ButtonComment
                                disabled={false}
                                id={333}
                                name="show more"
                                onClick={handleClick}
                            />
                        </Box> : <CommentLoader message={'memuat ...'}/>
                    }
                </>
            }

        </>
    )
}