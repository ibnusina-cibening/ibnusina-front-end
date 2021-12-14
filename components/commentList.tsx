import React, { useState } from 'react';
import { InputComment, ButtonComment } from './commentElement';
import { Login } from '../lib/login';
import {
  Box,
  Button,
  Card,
  Avatar,
  Divider,
  Chip,
  ListItem,
  TextField,
  Typography,
  ListItemText,
  ListItemSecondaryAction,
  ButtonGroup,
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
      disablePadding
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
                  disablePadding
                  // disableGutters
                  sx={{
                    // alignItems: 'flex-start',
                    // pl: 4,
                    // color: 'red',
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
      {comment.loadMore &&
        // bergantung pada nilai childshowlimit yang didefinisikan di komponen use Comment
        <ListItem
          disablePadding
          sx={{
            alignItems: 'flex-start',
            color: 'blue',
            pl: 7,
          }}
        >
          <span onClick={() => {
            showMoreChildren({ commentId: comment.id });
          }}>komentar berikutnya
          </span>
        </ListItem>
      }
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
        disablePadding
        sx={{
          // alignItems: 'flex-start',
        }}
      >
        <ListItemAvatar>
          <Avatar alt={comment.identity.callName} src={comment.identity.avatar} sx={{ width: 48, height: 48 }} />
        </ListItemAvatar>
        <Box component="span" sx={{ border: (editMode ? '1px dashed black' : ''), width: '100%' }}>
          {!editMode && !replyThis ?
            <Box component="span" sx={{ mt: 1, mb: -1, justifyContent: "right", alignItems: "right", display: "flex" }}>
              <ButtonGroup variant='text'>
                {myComment &&
                  <ButtonComment
                    disabled={false}
                    id={comment.id}
                    name="edit"
                    onClick={onSelectForm}
                  />}
                <ButtonComment
                  disabled={false}
                  name="balas"
                  id={comment.id}
                  onClick={replyMode}
                />
                {myComment &&
                  <ButtonComment
                    disabled={false}
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
              </ButtonGroup>
            </Box> : <Box sx={{ m: 2 }}></Box>
          }
          <InputComment
            disabled={selectedForm === comment.id ? false : true}
            localValue={localValue}
            onChange={onChange}
            comment={comment}
            id={comment.id}
          />
          {editMode &&
            /// mengedit komentar 
            <Box component="div" sx={{ justifyContent: "left", alignItems: "left", display: "flex" }}>
              <ButtonComment
                id={comment.id}
                name="simpan"
                disabled ={!localValue ? true:false}
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
                disabled = {false}
                name="batal"
                onClick={() => {
                  setEditMode(false);
                  setSelectedForm(null);
                  setLocalValue(comment.content);
                }}
              />
            </Box>
          }
        </Box>
      </ListItem>

      <ListItem
        disablePadding
        sx={{
          alignItems: 'flex-start',
          color: 'blue',
          pl: 7,
        }}
      >
        {comment.numofchildren - counter > 0 &&
          <span onClick={() => {
            showMoreChildren({ commentId: comment.id });
            setCounter(numofchildren);
          }}>{'tampilkan ' + (comment.numofchildren - counter) + ' balasan lainnya'}
          </span>
        }
      </ListItem>
      <Divider
        sx={{
          ml: 'auto',
          width: (theme) => `calc(100% - ${theme.spacing(7)})`
        }}
      />
      {
        // jika user login dan akan berkomentar
        replyThis && thisUserId ?
          <List >
            <ListItem>
              <small>balas ke {comment.identity.callName}</small>
              <ListItemAvatar>
                <Avatar alt={comment.identity.callName} src={comment.identity.avatar} sx={{ ml: -3, width: 48, height: 48 }} />
              </ListItemAvatar>
              <Reply id={comment.id} name={comment.identity.callName} saveReplyToParent={saveReply} />
            </ListItem>
          </List>
          :
          // user ingin berkomentar tapi tidak login
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
    <Box component="span" sx={{ mr: -2, border: '1px dashed green', width: '100%' }}>
      <InputComment
        id={id}
        disabled={false}
        localValue={localValue}
        onChange={onChange}
        comment={undefined}
      />
      {/* <ListItemSecondaryAction> */}
      <Box component="span">
        <ButtonComment
          disabled={!localValue?true:false}
          id={id}
          name="simpan"
          onClick={() => {
            saveReply({ id, localValue, name: 'simpan' });
          }}
        />
        <ButtonComment
        disabled={false}
          id={id}
          name="batal"
          onClick={() => {
            saveReply({ id, localValue, name: 'batal' });
          }}
        />
      </Box>
    </Box>
  )
}