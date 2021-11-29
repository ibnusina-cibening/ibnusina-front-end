import React, { useState } from 'react';
import utilStyles from '../styles/utils.module.css';

export default function Comment({
  comment,
  saveCommentEdited,
  deleteComment,
  saveReplyToParent }) {
  const nestedComments = (comment.children || []).map(comment => {
    return <div> ------ <Comment
      comment={comment}
      saveCommentEdited={saveCommentEdited}
      deleteComment={deleteComment}
      saveReplyToParent={saveReplyToParent}
    />
    </div>
      ;
  });
  return (
    <div key={comment.id}>
      <CommentList
        comment={comment}
        saveCommentEdited={saveCommentEdited}
        deleteComment={deleteComment}
        saveReplyToParent={saveReplyToParent}
        parentContent={comment.content}
        parentId={comment.parentId}
        child={comment.child}
      />
      {nestedComments}
    </div>
  );
}

function CommentList({
  comment,
  deleteComment,
  saveCommentEdited,
  saveReplyToParent,
  parentContent,
  parentId,
  child }) {
  const [localValue, setLocalValue] = useState(comment.content);
  const [selectedForm, setSelectedForm] = useState();
  const [editMode, setEditMode] = useState(false);
  const [replyThis, setReplyThis] = useState();

  const onSelectForm = () => {
    setSelectedForm(comment.id);
    setEditMode(true);
  }

  const onChange = (e) => {
    setLocalValue(e.target.value);
  }
  const replyMode = (e) => {
    setReplyThis(e.target.id);
  }

  const saveReply = ({ id, localValue, name }) => {
    if (name === 'simpan') {
      // mengirim data children sekaligus parent
      let n = Math.floor(Math.random() * Date.now());
      const reply = {
        id: n.toString(),
        parentId: id,
        content: localValue,
        children: 0,
        parentIdOfParent: parentId,
        parentContent,
        parentChildNum: child
      }
      saveReplyToParent(reply);
    }
    setReplyThis(null);
  }
  return (
    <>
      <span>{comment.id}</span>
      <textarea
        disabled={selectedForm === comment.id ? false : true}
        className={utilStyles.textarea}
        value={localValue}
        onChange={onChange}
      />
      {!editMode ? <span>
        <button type="button" name="edit"
          onClick={onSelectForm}
        >edit
        </button>
        <button type="button" name="balas"
          id={comment.id}
          onClick={replyMode}
        >balas</button>
        <button type="button" name="hapus"
          onClick={() => {
            deleteComment({ id: comment.id });
          }}
        >hapus</button>
      </span>
        :

        <span>
          <button type="button" name="simpan"
            onClick={() => {
              setEditMode(false);
              setSelectedForm(null);
              saveCommentEdited({ id: comment.id, localValue, child: comment.child });
            }}
          >simpan</button>
          <button type="button" name="batal"
            onClick={() => {
              setEditMode(false);
              setSelectedForm(null);
              setLocalValue(comment.content);
            }}
          >batal</button>
        </span>

      }
      {

        replyThis && <Reply id={comment.id} saveReplyToParent={saveReply} />
      }

    </>
  )
}

function Reply({ id, saveReplyToParent }) {
  const [localValue, setLocalValue] = useState('test reply');
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