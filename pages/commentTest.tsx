import React, { useState } from 'react';
import styles from '../components/layout.module.css'
import utilStyles from '../styles/utils.module.css';
import { arrayToTree } from 'performant-array-to-tree';
import GetComment from './CommentNested';


export default function Comment({ postId }: { postId: String }) {
    const [commentList, setCommentList] = useState([]);
    const [formValue, setFormValue] = useState('tulis komentar');
    const [showForm, setShowForm] = useState(false);

    // membuat komentar root baru 
    const handleClick = (e) => {
        if (e.target.name === 'add') {
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
    // hasil edit komentar root disimpan
    const saveCommentEdited = ({ id, localValue, child }) => {
        // console.log(id, localValue, child);
        const updatedData = commentList.map(x => (x.id === id ?
            { id, parentId: null, content: localValue, children: 0, child } : x));
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
    // console.log(commentData);
    return (
        <div className={styles.container}>

            {showForm &&

                <div className={utilStyles.comment}>
                    <textarea
                        className={utilStyles.textarea}
                        value={formValue}
                        onChange={onChange}
                    />
                </div>}
            {!showForm ?
                <button type="button" name="add" onClick={handleClick}>
                    Tampilkan komentar
                </button> :
                <button type="button" name="submit" onClick={handleClick}>
                    kirim
                </button>
            }
            <div>
                <span>--------------------------------------</span>
                {
                    commentData.map(c => {

                        return <div className={utilStyles.comment} key={c.id}>
                            <GetComment
                                comment={c}
                                saveCommentEdited={saveCommentEdited}
                                deleteComment={deleteComment}
                                saveReplyToParent={saveReply}
                                // parentId={c.parentId}
                                // parentContent={c.content}
                                // child={c.child}
                            />
                            ------------------------------
                        </div>
                    })
                }
            </div>
        </div>
    )
}