import React, { useState } from 'react';
import styles from '../../components/layout.module.css';
import utilStyles from '../../styles/utils.module.css';
import { arrayToTree } from 'performant-array-to-tree';
import CommentList from '../../components/commentList';
import { AddComment } from '../../components/commentElement';
import { useSession, signOut, signIn } from 'next-auth/client';
// import { signOut } from "next-auth/react";

export default function Comment({ postId }: { postId: String }) {
    const [commentList, setCommentList] = useState([]);
    const [session, loading] = useSession();

    const [formValue, setFormValue] = useState('tulis komentar');
    const [showForm, setShowForm] = useState(false);

    // membuat komentar root baru 
    const handleClick = (e) => {
        if (e.target.name === 'show') {
            // if (typeof window !== 'undefined' && loading) null;
            if(!session){
                setShowForm(!showForm)
                setFormValue('tulis komentar');
            }
            if (session) {
                setShowForm(!showForm)
                setFormValue('tulis komentar');
            }
        }
        if (e.target.name === 'submit') {
            let n = Math.floor(Math.random() * Date.now());
            setCommentList([...commentList, ...[
                { id: n.toString(), parentId: null, content: formValue, children: 0, child: 0 }
            ]]);
            // setIndex(index + 1);
        }

    };
    const onChange = (e) => {
        setFormValue(e.target.value);
    }
    // hasil edit komentar disimpan
    const saveCommentEdited = ({ id, localValue, child, parentId }) => {
        const updatedData = commentList.map(x => (x.id === id ?
            { id, parentId, content: localValue, children: 0, child } : x));
        setCommentList(updatedData);
    }
    const saveReply = ({ id, parentId, content, parentChildNum, parentContent, parentIdOfParent }) => {
        const updatedData = commentList.map(x => (x.id === parentId ?
            {
                id: parentId,
                parentId: parentIdOfParent,
                content: parentContent,
                children: 0,
                child: parentChildNum + 1
            } : x));
        setCommentList([...updatedData, ...[{ id, parentId, content, children: 0, child: 0 }]]);
    }
    const deleteComment = ({ id }) => {
        // pertama kita hapus dulu childrennya, jika ada
        const removeChildren = commentList.filter(x => x.parentId !== id);
        // menghapus komentar root 
        const newData = removeChildren.filter(x => x.id !== id);
        setCommentList(newData);;
    }
    const commentData = arrayToTree(commentList, { dataField: null });
    const isLoggedIn = session ? true: false; 
    return (
        <div className={styles.container}>
            {
                typeof window !== 'undefined' && loading && null
            }
            {
                session ? <button onClick={() => signOut({redirect: false,  callbackUrl: 'http://localhost:3000'})}>Sign out</button>:
                <button onClick={() => signIn()}>Sign in</button>
            }
            
            <AddComment
                formValue={formValue}
                showForm={showForm}
                onChange={onChange}
                handleClick={handleClick}
                isLoggedIn = {isLoggedIn}
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

