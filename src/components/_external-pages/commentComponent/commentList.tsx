import React, { useState } from 'react';
import { InputComment, ButtonComment, CommentLoader } from './commentElement';
import { Login } from 'lib/login';
import {
  Box,
  Card,
  Avatar,
  Divider,
  Chip,
  ListItem,
  TextField,
  Typography,
  ListItemText,
  Skeleton,
  Alert,
  Button,
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
  thisUser,
  showMoreChildren,
  setLogin,
  inProgress }: {
    comment: any,
    saveCommentEdited: any,
    deleteComment: any,
    saveReplyToParent: any,
    thisUser: any,
    showMoreChildren: any,
    setLogin: any,
    inProgress: string
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
        thisUser={thisUser}
        setLogin={setLogin}
        inProgress={inProgress}
      />
      {
        comment.children.length > 0 &&
        <>
          {
            comment.children.map((comment: { id: React.Key | null | undefined; }) => {
              return (
                <List
                  disablePadding
                  sx={{
                    ml: 5,
                  }}
                  key={comment.id}
                >
                  <CommentList
                    comment={comment}
                    saveCommentEdited={saveCommentEdited}
                    deleteComment={deleteComment}
                    saveReplyToParent={saveReplyToParent}
                    showMoreChildren={showMoreChildren}
                    thisUser={thisUser}
                    setLogin={setLogin}
                    inProgress={inProgress}
                  />
                </List>
              )
            })
          }
        </>
      }
      {comment.loadMore &&
        // jumlah yang ditampilkan tergantung nilai childshowlimit yang didefinisikan di komponen useComment
        <>
          {inProgress === comment.id + 2 ? <CommentLoader message='sebentar' /> :
            <ListItem
              disablePadding
              sx={{
                alignItems: 'flex-start',
                color: 'blue',
                pl: 7,
              }}
            >
              <Box component="span" sx={{ m: 1, justifyContent: "center", alignItems: "center", display: "flex" }}>
                <Button variant="outlined" size="small" onClick={() => {
                  showMoreChildren({ commentId: comment.id });
                }}>tampilkan lebih banyak
                </Button>
              </Box>
            </ListItem>}
        </>
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
  thisUser,
  numofchildren,
  inProgress,
  setLogin }: {
    comment: any,
    deleteComment: any,
    saveCommentEdited: any,
    saveReplyToParent: any,
    parentContent: string,
    showMoreChildren: any,
    thisUser: any,
    numofchildren: number,
    setLogin: any,
    inProgress: string
  }) {
  const [localValue, setLocalValue] = useState(comment.content);
  const [selectedForm, setSelectedForm] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [replyThis, setReplyThis] = useState();
  const [counter, setCounter] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [replyString, setReplyString] = useState('ok');

  const onSelectForm = () => {
    setSelectedForm(comment.id);
    setEditMode(true);
  }
  const onChange = (e: { target: { value: any; }; }) => {
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
        parentUpdatedAt: !comment.updatedAt ? null : comment.updatedAt,
        parentIdentity: comment.identity,
        parentLoadMore: comment.loadMore
      }
      saveReplyToParent(reply);
      setCounter(counter + 1);
    }
    setReplyThis(undefined);
    setReplyString(comment.id + 'ok');
  }

  const myComment = thisUser?.id === comment.userId;
  const inProgressProcess = inProgress == comment.id;
  // console.log(inProgressProcess); 
  if (inProgressProcess) return (
    <CommentLoader message={'Tunggu sebentar yah.. !'} />
  )
  // console.log(inProgress, replyThis);
  return (
    <>
      <ListItem
        disablePadding
      >
        <ListItemAvatar>
          <Avatar alt={comment.identity.callName} src={comment.identity.avatar} sx={{ width: 48, height: 48 }} />
        </ListItemAvatar>
        <Box component="span" sx={{ border: (editMode ? '1px dashed black' : ''), width: '100%' }}>
          {!editMode && !replyThis && !confirmDelete ?
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
                      setConfirmDelete(true);
                    }}
                  />}
              </ButtonGroup>
            </Box> : !editMode && <Box sx={{ m: 2 }}></Box>
          }
          <InputComment
            disabled={selectedForm === comment.id ? false : true}
            localValue={localValue}
            onChange={onChange}
            comment={comment}
            id={comment.id}
          />
          {
            inProgress === replyString &&
            <CommentLoader message={'Balasan komentar sedang ditambahkan'} />
          }
          {editMode &&
            /// mengedit komentar 
            <Box component="div" sx={{ justifyContent: "left", alignItems: "left", display: "flex" }}>
              <ButtonComment
                id={comment.id}
                name="simpan"
                disabled={!localValue ? true : false}
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
                disabled={false}
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
          // alignItems: 'flex-start',
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
      {
        inProgress === comment.id + 1 &&
        <span><CommentLoader message={'tunggu sebentar!'} /></span>
      }
      {confirmDelete &&
        <Alert severity="warning"
          action={
            <ButtonGroup variant="text">
              <Button color="inherit" size="small" onClick={() => {
                setConfirmDelete(false);
                deleteComment({
                  postId: comment.postId,
                  commentId: comment.id,
                  userId: comment.userId,
                  parentId: comment.parentId
                });
              }}>
                YA
              </Button>
              <Button color="inherit" size="small" onClick={() => {
                setConfirmDelete(false);
              }}>
                BATAL
              </Button>
            </ButtonGroup>
          }
        >
          Apakah anda yakin ingin menghapus komentar ini?
        </Alert>
      }
      {/* <Divider
        sx={{
          ml: 'auto',
          width: (theme) => `calc(100% - ${theme.spacing(7)})`
        }}
      /> */}
      {
        // jika user login dan akan berkomentar
        replyThis && thisUser?.id ?
          <>
            <List >
              <ListItem>
                <small>balas ke {comment.identity.callName}</small>
                <ListItemAvatar>
                  <Avatar alt={thisUser.callName} src={thisUser.avatar} sx={{ ml: -3, width: 48, height: 48 }} />
                </ListItemAvatar>
                <Reply
                  id={comment.id}
                  inProgress={inProgress}
                  name={comment.identity.callName}
                  saveReplyToParent={saveReply} />
              </ListItem>
            </List>
          </>

          :
          // user ingin berkomentar tapi tidak login
          replyThis &&
          <Alert severity="warning"
            action={
              <Login getLogin={setLogin} />
            }
          >
            Silahkan login untuk membalas komentar
          </Alert>
      }
    </>
  )
}

function Reply({ id, saveReplyToParent, name, inProgress }: {
  id: string,
  saveReplyToParent: any,
  name: string,
  inProgress: string
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
    <Box component="span" sx={{ mr: -2, width: '100%' }}>
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
          disabled={!localValue ? true : false}
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