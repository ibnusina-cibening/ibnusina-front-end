import { alpha, styled } from '@mui/material/styles';
import MainLayout from 'src/layouts/main';
import { Box, Card, Container, Typography } from '@mui/material';
import Markdown from 'src/components/Markdown';
import Page from 'src/components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import {
  BlogPostHero,
  BlogPostCommentList
} from 'src/components/_external-pages/blog/blogPost';
import { GetStaticProps, GetStaticPaths } from 'next';
// import { fetchPostContent, fetchAllPostId } from 'posts/fetcher/postFetcher'
import { FC } from 'react';
// database
import { ViewStats, ViewReaction, ViewLike } from 'posts/useMetaPost';
import UseComment from 'posts/useComment';
import { gql, GraphQLClient } from 'graphql-request';
import Error from '../_error';

const Spacer = styled('div')(({ theme }) => ({
  padding: theme.spacing(15, 0),
  backgroundImage:
    theme.palette.mode === 'light'
      ? `linear-gradient(180deg, ${alpha(theme.palette.grey[300], 0)} 0%, ${theme.palette.grey[300]
      } 100%)`
      : 'none',
}));

// const RootStyle = styled(Page)({
//   height: '100%',
// });
const RootStyle: FC<any> = styled(Page)({
  height: '100%',
});

export default function BlogPost({
  postData
}: {
  postData: {
    id: string
    title: string
    createdAt: string
    content: string
    slug: string
    author: {
      avatar: string,
      callName: string
    }
  }
}) {
  // console.log(postData.content);
  const id = !postData ? '' : postData.id;
  return (
    <MainLayout>
      <Spacer>
        <RootStyle
          title={postData.title}
          id='move_top'
        >
          <Container maxWidth={'lg'}>
            <HeaderBreadcrumbs
              heading="Post Details"
              links={[
                { name: 'Home', href: '/' },
                { name: 'Blog', href: '/blog' },
                { name: postData.slug }
              ]} action={undefined} sx={undefined} />

            {postData && (
              <Card>
                <BlogPostHero post={postData} />
                <Box sx={{ p: { xs: 3, md: 5 } }}>
                  <Markdown children={postData.content} />
                </Box>
                <Box sx={{ p: { xs: 3, md: 5 } }}>
                  -------- statistik ------------
                  <ViewStats postId={id} />
                  --------- reaksi ---------------
                  <ViewReaction postId={id} />
                  ---------- suka ----------------
                  <ViewLike postId={id} />
                  ---------- tindakan -----------
                  komentar, bagikan, suka
                </Box>
              </Card>
            )}
            {/* <BlogPostCommentList /> */}
            <UseComment pId={id} />
          </Container>
        </RootStyle>
      </Spacer>
    </MainLayout>

  );
}



//// SERVER SIDE 

export const getStaticPaths: GetStaticPaths = async () => {
  // allPostId().catch(error => error.message);
  const postList = gql`
    query{
      loadPosts(limit:15){
        nextPost
        postResult{
          id
          title
          createdAt
          slug
          author{
            callName
            avatar
          }
          meta{
            viewCount
            commentCount
            shareCount
          }
        }
      }
    }
      `;

  const graphEndPoint = await process.env.GRAPH_URL;
  // const url = "http://localhost:4000/";
  const headers = {
    Authorization: ''
  }
  const client = new GraphQLClient(graphEndPoint, { headers });
  const res = await client.request(postList);
  const paths = res.loadPosts.postResult.map(d => {
    return {
      params: {
        slug: d.slug
      }
    }
  })
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: { params: any }) => {
  const postContent = `
  query getPostContent ($slug:String!) {
    postBySlug(slug:$slug){
      id
      slug
      title
      content
      author{
        callName
        avatar
      }
      meta{
        commentCount
        viewCount
        shareCount
        
      }
    }
  }
  `;
  const url = await process.env.NEXT_PUBLIC_GRAPH_URL;
  // const url = "http://localhost:4000/";
  const slug = params.slug as string;
  const headers = {Authorization: ''};
  const client = new GraphQLClient(url);
  const res = await client.request(postContent, { slug }, headers);
  // return res;
  // const res = await fetchPostContent(params.slug as string);
  // fetchPostContent(params.slug as string).catch((error) => console.error(error));
  if (!res) {
    return Error({ statusCode: 404 })
  }
  const postData = res.postBySlug;
  return {
    props: {
      postData
    },
    revalidate: 10
  }
}