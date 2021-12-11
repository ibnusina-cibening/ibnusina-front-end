import { alpha, styled } from '@mui/material/styles';
import MainLayout from '../../src/layouts/main';
// import client, {QueryDetailPosts, gql} from 'src/db';
import { Box, Card, Container, Typography} from '@mui/material';
import Markdown from '../../src/components/Markdown';
import Page from '../../src/components/Page';
import HeaderBreadcrumbs from '../../src/components/HeaderBreadcrumbs';
import {
  BlogPostHero,
  BlogPostCommentList
} from '../../src/components/_external-pages/blog/blogPost';



const Spacer = styled('div')(({ theme }) => ({
  padding: theme.spacing(15, 0),
  backgroundImage:
    theme.palette.mode === 'light'
      ? `linear-gradient(180deg, ${alpha(theme.palette.grey[300], 0)} 0%, ${
          theme.palette.grey[300]
        } 100%)`
      : 'none',
}));

const RootStyle = styled(Page)({
  height: '100%',
});

// const SkeletonLoad = (
//   <>
//     <Skeleton width="100%" height={560} variant="rectangular" sx={{ borderRadius: 2 }} />
//     <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
//       <Skeleton variant="circular" width={64} height={64} />
//       <Box sx={{ flexGrow: 1, ml: 2 }}>
//         <Skeleton variant="text" height={20} />
//         <Skeleton variant="text" height={20} />
//         <Skeleton variant="text" height={20} />
//       </Box>
//     </Box>
//   </>
// );



export async function getStaticPaths(){
  const { data } = await client.query({
    query: gql`query {
      loadPosts(limit:5){
        postResult{
          slug
        }
        
      }
    }`
  })
  const pth = data.loadPosts.postResult.map((post)=>({
    params: { pid: post.slug }
  }))
  return{
    paths: pth || [],
    fallback: 'blocking'
  }
}

export async function getStaticProps({params}){
  const { data } = await client.query(QueryDetailPosts(params.pid));
  return {
    props: data.postBySlug,
    revalidate: 10
  }
}

// export default function Post(props){
//   return (
//     <MainLayout>
//       <RootStyle 
//       title={'IBNU SINA'}
//       id='move_top'
//       >
//         <h1>{props.title}</h1>
//       </RootStyle>
//     </MainLayout>
//   );
// }

export default function BlogPost(props) {

  return (
    <MainLayout>
      <Spacer>
        <RootStyle 
        title={props.title}
        id='move_top'
        >
        <Container maxWidth={'lg'}>
          <HeaderBreadcrumbs
            heading="Post Details"
            links={[
              { name: 'Home', href: '/' },
              { name: 'Blog', href: '/blog' },
              { name:  props.title}
            ]}
          />

          {props && (
            <Card>
              <BlogPostHero post={props} />

              <Box sx={{ p: { xs: 3, md: 5 } }}>
                <Typography variant="h6" sx={{ mb: 5 }}>
                  Test
                </Typography>

                <Markdown children={props.content} />
  {/* 
                <Box sx={{ my: 5 }}>
                  <Divider />
                  <BlogPostTags post={post} />
                  <Divider />
                </Box>

                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography variant="h4">Comments</Typography>
                  <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                    ({post.comments.length})
                  </Typography>
                </Box>

                <BlogPostCommentList post={post} />

                <Box sx={{ mb: 5, mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <Pagination count={8} color="primary" />
                </Box>

                <BlogPostCommentForm /> */}
              </Box>
            </Card>
          )}
  {/* 
          {!props && SkeletonLoad}

          {error && <Typography variant="h6">404 Post not found</Typography>}

          {recentPosts.length > 0 && <BlogPostRecent posts={recentPosts} />} */}
        <BlogPostCommentList/>
        </Container>



        </RootStyle>
      </Spacer>
    </MainLayout>

  );
}