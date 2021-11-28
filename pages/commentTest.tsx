import React, { useState, useEffect } from 'react';
import styles from '../components/layout.module.css'
import utilStyles from '../styles/utils.module.css';

export default function Comment({ postId }: { postId: String }) {
    const [commentList, setCommentList] = useState([]);
    const [formValue, setFormValue] = useState('tulis komentar');
    const [showForm, setShowForm] = useState(false);
    const [index, setIndex] = useState(0);

    // membuat komentar root baru 
    const handleClick = (e) => {
        if (e.target.name === 'add') {
            setShowForm(!showForm)
            setFormValue('tulis komentar');
        }
        if (e.target.name === 'submit') {
            setCommentList([...commentList, ...[{ id: index.toString(), parentId: 'root', content: formValue, children: 0 }]]);
            setIndex(index + 1);
        }
    };
    const onChange = (e) => {
        setFormValue(e.target.value);
    }
    // hasil edit komentar root disimpan
    const saveComment = ({ id, localValue }) => {
        const updatedData = commentList.map(x => (x.id === id ? { id, parentId: 'root', content: localValue, children: 0 } : x));
        setCommentList(updatedData);
    }
    const saveReply = ({ id, parentId, content, parentChildrenNum, parentIdOfParent }) => {
        const newReply = { id, parentId, content, children: 0 }
        setCommentList([...commentList, ...[newReply]]);
        // update jumlah children pada parent
        const updatedData = commentList.map(x => (x.id === parentId ? { id: parentId, parentId: parentIdOfParent, content, children: parentChildrenNum+1 } : x));
        setCommentList(updatedData);
    }
    const deleteComment = ({ id }) => {
        // pertama kita hapus dulu childrennya, jika ada
        const removeChildren = commentList.filter(x => x.parentId !== id);
        // menghapus komentar root 
        const newData = removeChildren.filter(x => x.id !== id);
        setCommentList(newData);;
    }
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
                    commentList.map(({ id, content, parentId, children }) => {
                        console.log(children);
                        if (parentId === 'root') {
                            return (
                                <div className={utilStyles.comment} key={id}>
                                    <CommentItem
                                        id={id}
                                        formValue={content}
                                        deleteComment={deleteComment}
                                        saveComment={saveComment}
                                        parentId = {parentId}
                                        children={children}
                                        saveReplyToParent={saveReply} />
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}


function CommentItem({
    id,
    formValue,
    saveComment,
    deleteComment,
    saveReplyToParent,
    parentId,
    children
}: {
    id: string,
    formValue: string,
    saveComment,
    deleteComment,
    saveReplyToParent,
    parentId,
    children
}) {
    const [selectedForm, setSelectedForm] = useState();
    const [localValue, setLocalValue] = useState(formValue);
    const [editMode, setEditMode] = useState(false);
    const [replyThis, setReplyThis] = useState();
    // const hasChildren = children > 0;
    const handleSelect = (e) => {
        if (e.target.name === 'edit') {
            setSelectedForm(e.target.id);
            setEditMode(true);
        }
    }
    const onChange = (e) => {
        setLocalValue(e.target.value);
    }
    const replyMode = (e) => {
        setReplyThis(e.target.id);
    }
    const saveReply = ({ id, localValue, name }) => {
        if (name === 'simpan') {
            const reply = { id: id + 1000, parentId: id, content: localValue, children: 0 , parentIdOfParent: parentId, parentChildrenNum:children}
            saveReplyToParent(reply);
        }
        setReplyThis(null);
    }
    return (
        <>
            <textarea
                id={id}
                disabled={selectedForm === id ? false : true}
                className={utilStyles.textarea}
                value={localValue}
                onChange={onChange}
            />
            {!editMode ?
                <span>
                    <button type="button" name="edit"
                        id={id}
                        onClick={handleSelect}
                    >edit
                    </button>
                    <button type="button" name="balas"
                        id={id}
                        onClick={replyMode}
                    >balas</button>
                    <button type="button" name="hapus"
                        onClick={() => {
                            deleteComment({ id });
                        }}
                    >hapus</button>
                </span>
                :
                <span>
                    <button type="button" name="simpan"
                        onClick={() => {
                            setEditMode(false);
                            setSelectedForm(null);
                            saveComment({ id, localValue });
                        }}
                    >simpan</button>
                    <button type="button" name="batal"
                        onClick={() => {
                            setEditMode(false);
                            setSelectedForm(null);
                            setLocalValue(formValue);
                        }}
                    >batal</button>
                </span>
            }
            {
                replyThis && <Reply id={id} saveReplyToParent={saveReply} />
            }
        </>
    )

}

function Reply({ id, saveReplyToParent }) {
    const [localValue, setLocalValue] = useState('test reply');
    const [selected, setSelected] = useState();
    const saveReply = ({ id, localValue, name }) => {
        saveReplyToParent({ id, localValue, name });
    }
    const onChange = (e) => {
        setLocalValue(e.target.value);
    }
    return (
        <>
            <textarea
                id={id}
                disabled={false}
                className={utilStyles.textarea}
                value={localValue}
                onChange={onChange}
            />
            <span>
                <button type="button" name="simpan"
                    onClick={() => {
                        saveReply({ id, localValue, name: 'simpan' });
                    }}
                >simpan</button>
                <button type="button" name="batal"
                    onClick={() => {
                        saveReply({ id, localValue, name: 'batal' });
                    }}
                >batal</button>
            </span>
        </>

    )
}