import React, { useState } from 'react';
import utilStyles from '../styles/utils.module.css';
import { InputComment, ButtonComment } from './commentElement';

export default function CommentList({
  comment,
  saveCommentEdited,
  deleteComment,
  saveReplyToParent }) {
  const nestedComments = (comment.children || []).map(comment => {
    return <div className={utilStyles.commentContainerChildren} key={comment.id}>
      <CommentList
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
      <CommentItem
        comment={comment}
        saveCommentEdited={saveCommentEdited}
        deleteComment={deleteComment}
        saveReplyToParent={saveReplyToParent}
        parentContent={comment.content}
        parentId={comment.parentId}
        numofchildren={comment.numofchildren}
      />
      {nestedComments}
    </div>
  );
}

function CommentItem({
  comment,
  deleteComment,
  saveCommentEdited,
  saveReplyToParent,
  parentContent,
  parentId,
  numofchildren }) {
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
        // id: n.toString(),
        parentCommentId: comment.id,
        parentUserId: comment.userId,
        replyContent: localValue,
        parentIdOfParent: comment.parentId,
        parentContent,
        parentChildNum: comment.numofchildren
      }
      saveReplyToParent(reply);
    }
    setReplyThis(null);
  }
  return (
    <>
      <span key={comment.id}>{comment.identity.callName}</span>
      <InputComment
        disabled={selectedForm === comment.id ? false : true}
        localValue={localValue}
        onChange={onChange}
        id={comment.id}
      />
      {!editMode && !replyThis && <span>
        <ButtonComment 
          id={comment.id}
          name="edit"
          onClick={onSelectForm}
        />
        <ButtonComment 
          name="balas"
          id={comment.id}
          onClick={replyMode}
        />
        <ButtonComment 
          id={comment.id}
          name="hapus"
          onClick={() => {
            deleteComment({ id: comment.id });
          }}
        />
        {' tampilkan '+ comment.numofchildren + ' balasan lainnya'}
      </span>
      }
      {editMode &&
        <span>
          <ButtonComment 
            id ={comment.id}
            name="simpan"
            onClick={() => {
              setEditMode(false);
              setSelectedForm(null);
              saveCommentEdited({ 
                id: comment.id, 
                localValue, 
                numofchildren: comment.numofchildren, 
                parentId:comment.parentId 
              });
            }}
          />
          <ButtonComment 
            id ={comment.id}
            name="batal"
            onClick={() => {
              setEditMode(false);
              setSelectedForm(null);
              setLocalValue(comment.content);
            }}
          />
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
      <span>balas ke {id}</span>
      <InputComment
        id={id}
        disabled={false}
        localValue={localValue}
        onChange={onChange}
      />
      <span>
        <ButtonComment
          id={id}
          name="simpan"
          onClick={() => {
            saveReply({ id, localValue, name: 'simpan' });
          }}
        />
        <ButtonComment 
          id = {id}
          name="batal"
          onClick={() => {
            saveReply({ id, localValue, name: 'batal' });
          }}
        />
      </span>
    </>

  )
}