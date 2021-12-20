import useSWR, { useSWRConfig } from "swr";
import { useSession, signIn } from "next-auth/react";
import convertToKilo from 'lib/convertToKilo';
import { Box, Typography, Button, Alert, IconButton, CardActions } from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import BadgeUnstyled from '@mui/base/BadgeUnstyled';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from "react";
import { fetchMetaPost, actionToThisPost } from "./fetcher/metaPostFetcher";
import CircularProgress from '@mui/material/CircularProgress';

const StyledBadge = styled(BadgeUnstyled)`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum';
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
  position: relative;
  display: inline-block;
  line-height: 1;

  & .MuiBadge-badge {
    z-index: auto;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    color: #fff;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    white-space: nowrap;
    text-align: center;
    background: #ff4d4f;
    border-radius: 10px;
    box-shadow: 0 0 0 1px #fff;
  }

  & .MuiBadge-dot {
    padding: 0;
    z-index: auto;
    min-width: 6px;
    width: 6px;
    height: 6px;
    background: #ff4d4f;
    border-radius: 100%;
    box-shadow: 0 0 0 1px #fff;
  }

  & .MuiBadge-anchorOriginTopRightCircular {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
  }
`;

const useMetaPost = (postId: string, token: string) => {
  const { error, data } = useSWR<{
    getMetaPostCount: {
      commentCount: number
      viewCount: number
      shareCount: number
      reaction: {
        meLike: boolean
        meReaction: string
        mood: {
          LIKE: number
          SMILE: number
          SAD: number
          EXCITED: number
          PRAYING: number
        }
      }
    }
  }>([postId, token], fetchMetaPost, {
    revalidateOnFocus: false,
    revalidateOnMount: true
  });
  return {
    metaPost: data?.getMetaPostCount,
    isLoading: !error && !data,
    isError: error
  }
}

function ViewStats({ postId }: { postId: string }) {
  const { data: session, status }: { data: any, status: string } = useSession();
  const token = session ? session.token : '';
  const { metaPost, isLoading, isError } = useMetaPost(postId, token);
  if (isLoading) return <Box component="div" sx={{ pt: 2, pb: 2, pl: 3, justifyContent: "left", alignItems: "left", display: "flex" }}>loading</Box>
  if (isError) return <div>error</div>
  const vc = !metaPost?.viewCount ? 0 : metaPost?.viewCount;
  const cc = !metaPost?.commentCount ? 0 : metaPost?.commentCount;
  const sc = !metaPost?.shareCount ? 0 : metaPost?.shareCount;
  const textVC = convertToKilo({ number: vc });
  return <>
    <Box component="span" sx={{ pb: 2, pl: 5, justifyContent: "left", alignItems: "left", display: "flex" }}>
      <VisibilityRoundedIcon />
      <Typography gutterBottom variant="subtitle2" component="div" sx={{ pl: 2, mb: -1 }}>
        {textVC} kali dilihat
      </Typography>
    </Box>
  </>
}

function ViewReaction({ postId }: { postId: string }) {
  const { data: session, status }: { data: any, status: string } = useSession();
  const token = session ? session.token : null;
  const { metaPost, isLoading, isError } = useMetaPost(postId, token);
  if (isLoading) return <div>loading</div>
  if (isError) return <div>error</div>
  const reaction = metaPost?.reaction;
  const mood = reaction?.mood;
  const myReaction = reaction?.meReaction;

  const excited = !mood?.EXCITED ? 0 : mood.EXCITED;
  const praying = !mood?.PRAYING ? 0 : mood.PRAYING;
  const sad = !mood?.SAD ? 0 : mood.SAD;
  const smile = !mood?.SMILE ? 0 : mood.SMILE;
  return <div>
    <span role="img" aria-label="excited">😍: {convertToKilo({ number: excited })}{myReaction === 'EXCITED' ? " Termasuk kamu" : null}</span>
    <span role="img" aria-label="praying">🙏: {convertToKilo({ number: praying })} {myReaction === 'PRAYING' ? " Termasuk kamu" : null}</span>
    <span role="img" aria-label="sad">😥: {convertToKilo({ number: sad })} {myReaction === 'SAD' ? " Termasuk kamu" : null}</span>
    <span role="img" aria-label="smile">😀 : {convertToKilo({ number: smile })} {myReaction === 'SMILE' ? " Termasuk kamu" : null}</span>
  </div>
}
// referensi emoticon in react: https://medium.com/@seanmcp/%EF%B8%8F-how-to-use-emojis-in-react-d23bbf608bf7


function LikeAndShare({ postId }: { postId: string }) {
  // memeriksa apakah user login 
  const { data: session, status }: { data: any, status: string } = useSession();
  const token = session ? session.token : '';
  // mengambil data 
  const { metaPost, isLoading, isError } = useMetaPost(postId, token);
  const { mutate } = useSWRConfig();
  // MENAMBAHKAN SUKA 
  const myLike = !metaPost?.reaction.meLike ? false : metaPost.reaction.meLike;
  const numberOfLike = !metaPost?.reaction.mood.LIKE ? 0 : metaPost.reaction.mood.LIKE;
  const [showLogInForm, setShowLogInForm] = useState(false);
  const [showShareOption, setShowShareOption] = useState(false);
  const [meLike, setMeLike] = useState(myLike);
  const [numOfLike, setNumOfLike] = useState(numberOfLike);
  const [inProgress, setInProgress] = useState(false);
  useEffect(() => {
    setMeLike(myLike);
    setNumOfLike(numberOfLike);
  }, [myLike, numberOfLike]);
  if (isLoading) return <Box component="div" sx={{ pt: 2, pb: 2, pl: 3, justifyContent: "left", alignItems: "left", display: "flex" }}>loading</Box>
  if (isError) return <div>error</div>
  const setLikeIt = async () => {
    // jika belum login
    if (session) {
      setInProgress(true);
      const { actionToPost } = await actionToThisPost('LIKE', postId, token);
      const { added } = actionToPost;
      if (!actionToPost) setInProgress(false);
      let addLike = added ? metaPost?.reaction.mood.LIKE! + 1 : metaPost?.reaction.mood.LIKE! - 1;
      await mutate([postId, token], async () => {
        const newData = {
          getMetaPostCount: {
            commentCount: metaPost?.commentCount,
            viewCount: metaPost?.viewCount,
            shareCount: metaPost?.shareCount,
            reaction: {
              meLike: added,
              meReaction: metaPost?.reaction.meReaction,
              mood: {
                LIKE: addLike,
                SMILE: metaPost?.reaction.mood.SMILE,
                SAD: metaPost?.reaction.mood.SAD,
                EXCITED: metaPost?.reaction.mood.EXCITED,
                PRAYING: metaPost?.reaction.mood.PRAYING,
              },
            },
          }
        }
        // console.log(numOfLike === numberOfLike);
        setInProgress(false);
        return newData;
      }, false)

    } else {
      // jika belum login, maka pesan login ditampilkan 
      setShowLogInForm(!showLogInForm);
    }
  }
  const shareCount = !metaPost?.shareCount ? 0 : metaPost?.shareCount;
  const message = meLike && session ? `Terima kasih ${session.callName}` : 'suka dan bagikan';
  const iconColor = meLike ? 'green' : '';
  return (
    <>
      <Box component="div" sx={{ pt: 2, pb: 2, pl: 3, justifyContent: "left", alignItems: "left", display: "flex" }}>
        <Box component="div">
          <CardActions>
            {!inProgress ? <StyledBadge badgeContent={convertToKilo({ number: numOfLike })} overlap="circular">
              <IconButton aria-label="add to favorites" onClick={setLikeIt}>
                <FavoriteIcon sx={{ fontSize: 25, color: iconColor }} />
              </IconButton>
            </StyledBadge> : <CircularProgress size={20} />}
            <StyledBadge badgeContent={convertToKilo({ number: shareCount })} overlap="circular">
              <IconButton aria-label="share" onClick={() => { setShowShareOption(!showShareOption) }}>
                <ShareIcon sx={{ fontSize: 25 }} />
              </IconButton>
            </StyledBadge>
            <Typography gutterBottom variant="subtitle2" component="div" sx={{ pl: 2, mb: -1 }}>
              {message}
            </Typography>
          </CardActions>
          {showLogInForm &&
            // PERLU PENAMBAHAN KOMPONEN LOADER SAAT TOMBOL LOGIN DITEKAN 
            !inProgress ? <Alert severity="warning"
              action={
                <Button size={'medium'} variant="text" sx={{ position: 'relative', right: 0 }} onClick={() => {
                  setInProgress(true);
                  signIn();
                }
                }
                >Masuk</Button>
              }
            >
              Silahkan login untuk memberi suka
            </Alert>: inProgress && <CircularProgress/>
            
          }
          {showShareOption &&
            <Box component="div">
              <Alert severity="warning">
                Fitur ini masih dalam pengembangan
              </Alert>
            </Box>
          }
        </Box>
      </Box>
    </>
  )
}

export { ViewStats, ViewReaction, LikeAndShare };