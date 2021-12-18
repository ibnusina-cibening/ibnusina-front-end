import useSWR, { useSWRConfig } from "swr";
import { useSession } from "next-auth/react";
import convertToKilo from 'lib/convertToKilo';
import { Box, Card, Container, Typography, CardHeader, IconButton, CardActions } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import BadgeUnstyled from '@mui/base/BadgeUnstyled';
import { styled } from '@mui/material/styles';
import { useState } from "react";
import { fetchMetaPost, actionToThisPost } from "./fetcher/metaPostFetcher";
import { Session } from "types/metaPost";

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
  }>([postId, token], fetchMetaPost, { revalidateOnFocus: false });
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
  if (isLoading) return <div>loading</div>
  if (isError) return <div>error</div>
  const vc = !metaPost?.viewCount ? 0 : metaPost?.viewCount;
  const cc = !metaPost?.commentCount ? 0 : metaPost?.commentCount;
  const sc = !metaPost?.shareCount ? 0 : metaPost?.shareCount;
  return <>
    <div>{convertToKilo({ number: vc })} kali dilihat</div>
    <div>{convertToKilo({ number: cc })} komentar</div>
    <div>{convertToKilo({ number: sc })} kali dibagikan</div>
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
  const { data: session, status }: { data: any, status: string } = useSession();
  const token = session ? session.token : '';
  const { metaPost, isLoading, isError } = useMetaPost(postId, token);
  const [likeIt, setLikeIt] = useState(false);
  if (isLoading) return <div>loading</div>
  if (isError) return <div>error</div>
  const shareCount = !metaPost?.shareCount ? 0 : metaPost?.shareCount;
  const reaction = metaPost?.reaction;
  const mood = reaction?.mood;
  const includingMe = reaction?.meLike ? `Kamu dan ${mood?.LIKE} orang lainnya menyukai postingan ini` : 'Suka dan bagikan';
  const like = !mood?.LIKE ? 0 : mood.LIKE;
  // console.log(likeIt);
  const myColor = reaction?.meLike ? 'green' : '';
  return (
    <CardActions>
      <StyledBadge badgeContent={convertToKilo({ number: like })} overlap="circular">
        <IconButton aria-label="add to favorites" onClick={() => {
          setLikeIt(!likeIt)
        }
        }>
          <FavoriteIcon sx={{ fontSize: 25, color: myColor }} />
        </IconButton>
      </StyledBadge>
      <StyledBadge badgeContent={convertToKilo({ number: shareCount })} overlap="circular">
        <IconButton aria-label="share">
          <ShareIcon sx={{ fontSize: 25 }} />
        </IconButton>
      </StyledBadge>
      <Typography gutterBottom variant="subtitle2" component="div" sx={{ pl: 2, mb: -1 }}>
        {includingMe}
      </Typography>
    </CardActions>
  )
}

export { ViewStats, ViewReaction, LikeAndShare };