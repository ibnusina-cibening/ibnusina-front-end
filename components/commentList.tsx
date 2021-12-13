import React, { useState } from 'react';
import { InputComment, ButtonComment } from './commentElement';
import { Login } from '../lib/login';
import {
  Box,
  Button,
  Card,
  Avatar,
  Divider,
  ListItem,
  TextField,
  Typography,
  ListItemText,
  ListItemAvatar,
  List
} from '@mui/material';

export default function CommentList({
  comment,
  saveCommentEdited,
  deleteComment,
  saveReplyToParent,
  thisUserId,
  showMoreChildren,
  setLogin }: {
    comment: any,
    saveCommentEdited: any,
    deleteComment: any,
    saveReplyToParent: any,
    thisUserId: any,
    showMoreChildren: any,
    setLogin: any
  }
) {
  return (
    <List
      key={comment.id}>
      <CommentItem
        comment={comment}
        saveCommentEdited={saveCommentEdited}
        deleteComment={deleteComment}
        saveReplyToParent={saveReplyToParent}
        parentContent={comment.content}
        numofchildren={comment.numofchildren}
        showMoreChildren={showMoreChildren}
        thisUserId={thisUserId}
        setLogin={setLogin}
      />
      {/* {nestedComments} */}
      {
        comment.children.length > 0 &&

        <>
          {
            comment.children.map((comment: { id: React.Key | null | undefined; }) => {
              return (
                <List
                  // disableGutters
                  sx={{
                    // alignItems: 'flex-start',
                    // pl: 4,
                    color: 'red',
                    // mt: 1,
                    ml: 5,
                    // width: (theme) => `calc(100% - ${theme.spacing(4)})`
                  }}
                  key={comment.id}
                >
                  <CommentList
                    comment={comment}
                    saveCommentEdited={saveCommentEdited}
                    deleteComment={deleteComment}
                    saveReplyToParent={saveReplyToParent}
                    showMoreChildren={showMoreChildren}
                    thisUserId={thisUserId}
                    setLogin={setLogin}
                  />
                </List>
              )
            })
          }
        </>
      }
      {comment.loadMore && <div onClick={() => {
        showMoreChildren({ commentId: comment.id });
      }}>tampilkan lebih banyak</div>}
    </List>
  );
}

function CommentItem({
  comment,
  deleteComment,
  saveCommentEdited,
  saveReplyToParent,
  parentContent,
  showMoreChildren,
  thisUserId,
  numofchildren,
  setLogin }: {
    comment: any,
    deleteComment: any,
    saveCommentEdited: any,
    saveReplyToParent: any,
    parentContent: string,
    showMoreChildren: any,
    thisUserId: string,
    numofchildren: number,
    setLogin: any
  }) {
  const [localValue, setLocalValue] = useState(comment.content);
  const [selectedForm, setSelectedForm] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [replyThis, setReplyThis] = useState();
  const [counter, setCounter] = useState(0);

  const onSelectForm = () => {
    setSelectedForm(comment.id);
    setEditMode(true);
  }

  const onChange = (e: { target: { value: any; }; }) => {
    // console.log(e.target.value);
    setLocalValue(e.target.value);
  }
  const replyMode = (e: { target: { id: React.SetStateAction<undefined>; }; }) => {
    setReplyThis(e.target.id);
  }

  const saveReply = ({ localValue, name }: { localValue: string, name: string }) => {
    if (name === 'simpan') {
      // mengirim data children sekaligus parent
      // let n = Math.floor(Math.random() * Date.now());
      const reply = {
        // id: n.toString(),
        parentCommentId: comment.id,
        parentUserId: comment.userId,
        replyContent: localValue,
        parentIdOfParent: comment.parentId,
        parentContent,
        parentChildNum: comment.numofchildren,
        parentCreatedAt: comment.createdAt,
        parentIdentity: comment.identity,
        parentLoadMore: comment.loadMore
      }
      saveReplyToParent(reply);
      setCounter(counter + 1);
    }
    setReplyThis(undefined);
  }
  const myComment = thisUserId === comment.userId;
  return (
    <>
      <ListItem
        sx={{
          alignItems: 'flex-start',
          // pl: 4,
          // color: 'red',
          // mt: 1,
          // ml: 5,
          // width: (theme) => `calc(100% - ${theme.spacing(4)})`
        }}
      >
        {/* <span key={comment.id}>{comment.identity.callName + " (" + (comment.id) + ")"}</span> */}
        <ListItemAvatar>
          <Avatar alt={comment.identity.callName} src={comment.identity.avatar} sx={{ width: 48, height: 48 }} />
        </ListItemAvatar>
        <InputComment
          disabled={selectedForm === comment.id ? false : true}
          localValue={localValue}
          onChange={onChange}
          comment={comment}
          id={comment.id}
        />
        {!editMode && !replyThis && <span>
          {myComment && <ButtonComment
            id={comment.id}
            name="edit"
            onClick={onSelectForm}
          />}
          <ButtonComment
            name="balas"
            id={comment.id}
            onClick={replyMode}
          />
          {myComment && <ButtonComment
            id={comment.id}
            name="hapus"
            onClick={() => {
              deleteComment({
                postId: comment.postId,
                commentId: comment.id,
                userId: comment.userId,
                parentId: comment.parentId
              });
            }}
          />}
          {comment.numofchildren - counter > 0 &&
            <span onClick={() => {
              showMoreChildren({ commentId: comment.id });
              setCounter(numofchildren);
            }}>{' tampilkan ' + (comment.numofchildren - counter) + ' balasan lainnya'}
            </span>
          }
        </span>
        }
        {editMode &&
          <>
            <ButtonComment
              id={comment.id}
              name="simpan"
              onClick={() => {
                setEditMode(false);
                setSelectedForm(null);
                saveCommentEdited({
                  id: comment.id,
                  localValue,
                  numofchildren: comment.numofchildren,
                  parentId: comment.parentId,
                  identity: comment.identity,
                  loadMore: !comment.loadMore ? false : comment.loadMore
                });
              }}
            />
            <ButtonComment
              id={comment.id}
              name="batal"
              onClick={() => {
                setEditMode(false);
                setSelectedForm(null);
                setLocalValue(comment.content);
              }}
            />

          </>

        }


      </ListItem>
      <Divider
        sx={{
          ml: 'auto',
          width: (theme) => `calc(100% - ${theme.spacing(7)})`
        }}
      />
      {
        replyThis && thisUserId ?
          <List>
            <ListItem
              sx={{
                alignItems: 'flex-start',
                // pl: 4,
                // color: 'red',
                // mt: 1,
                // ml: 5,
                // width: (theme) => `calc(100% - ${theme.spacing(4)})`
              }}
            >
              <strong>balas ke {comment.identity.callName}</strong>
              <ListItemAvatar>
                <Avatar alt={comment.identity.callName} src={comment.identity.avatar} sx={{ width: 48, height: 48 }} />
              </ListItemAvatar>
              <Reply id={comment.id} name={comment.identity.callName} saveReplyToParent={saveReply} />
            </ListItem>
          </List>
          :
          replyThis && <span>silahkan login untuk mulai berkomentar<Login getlogin={setLogin} /></span>
      }
    </>
  )
}

function Reply({ id, saveReplyToParent, name }: {
  id: string,
  saveReplyToParent: any,
  name: string
}) {
  const [localValue, setLocalValue] = useState('');
  const saveReply = ({ id, localValue, name }: {
    id: string,
    localValue: string,
    name: string
  }) => {
    saveReplyToParent({ id, localValue, name });
  }
  const onChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setLocalValue(e.target.value);
  }
  return (
    <>
      <InputComment
        id={id}
        disabled={false}
        localValue={localValue}
        onChange={onChange}
        comment={undefined}
      />
      <>
        <ButtonComment
          id={id}
          name="simpan"
          onClick={() => {
            saveReply({ id, localValue, name: 'simpan' });
          }}
        />
        <ButtonComment
          id={id}
          name="batal"
          onClick={() => {
            saveReply({ id, localValue, name: 'batal' });
          }}
        />
      </>
    </>
  )
}