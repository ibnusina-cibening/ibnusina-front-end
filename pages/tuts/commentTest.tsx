import React, { useState } from 'react';
import styles from '../../components/layout.module.css';
import utilStyles from '../../styles/utils.module.css';
import { arrayToTree } from 'performant-array-to-tree';
import CommentList from '../../components/commentList';
import { CommentFormTop, ButtonComment } from '../../components/commentElement';

export default function Comment({ postId }: { postId: String }) {
    const [commentList, setCommentList] = useState([]);
    const [formValue, setFormValue] = useState('tulis komentar');
    const [showForm, setShowForm] = useState(false);

    // membuat komentar root baru 
    const handleClick = (e) => {
        if (e.target.name === 'show') {
            setShowForm(!showForm)
            setFormValue('tulis komentar');
        }
        if (e.target.name === 'submit') {
            let n = Math.floor(Math.random() * Date.now());
            setCommentList([...commentList, ...[
                { id: n.toString(), parentId: null, content: formValue, children: 0, child: 0 }]]);
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
    return (
        <div className={styles.container}>
            {showForm &&
                <CommentFormTop
                    formValue={formValue}
                    onChange={onChange}
                />
            }
            {!showForm ?
                <ButtonComment
                    id={1}
                    name="show"
                    onClick={handleClick}
                />
                :
                <ButtonComment
                    id={2}
                    name="submit"
                    onClick={handleClick}
                />
            }
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