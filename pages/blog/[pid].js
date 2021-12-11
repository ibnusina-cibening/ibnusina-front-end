import { alpha, styled } from '@mui/material/styles';
import MainLayout from '../../src/layouts/main';
// import client, {QueryDetailPosts, gql} from 'src/db';
import { Box, Card, Container, Typography } from '@mui/material';
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
      ? `linear-gradient(180deg, ${alpha(theme.palette.grey[300], 0)} 0%, ${theme.palette.grey[300]
      } 100%)`
      : 'none',
}));

const RootStyle = styled(Page)({
  height: '100%',
});

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`query {
      loadPosts(limit:5){
        postResult{
          slug
        }
        
      }
    }`
  })
  const pth = data.loadPosts.postResult.map((post) => ({
    params: { pid: post.slug }
  }))
  return {
    paths: pth || [],
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {
  const { data } = await client.query(QueryDetailPosts(params.pid));
  return {
    props: data.postBySlug,
    revalidate: 10
  }
}

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
                { name: props.title }
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
                </Box>
              </Card>
            )}
            <BlogPostCommentList />
          </Container>
        </RootStyle>
      </Spacer>
    </MainLayout>

  );
}