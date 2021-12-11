import { alpha, styled } from '@mui/material/styles';
import MainLayout from '../../src/layouts/main';
import { Box, Card, Container, Typography } from '@mui/material';
import Markdown from '../../src/components/Markdown';
import Page from '../../src/components/Page';
import HeaderBreadcrumbs from '../../src/components/HeaderBreadcrumbs';
import {
  BlogPostHero,
  BlogPostCommentList
} from '../../src/components/_external-pages/blog/blogPost';
import { GetStaticProps, GetStaticPaths } from 'next';
import allPostId from '../../posts/allPostId';
import postContent from '../../posts/postContent';
import { FC } from 'react';

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

export default function BlogPost(props: {
  id: string
  title: string
  createdAt: string
  content: string
  slug: string
}) {

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
                { name: props.slug }
              ]} action={undefined} sx={undefined} />

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


export const getStaticPaths: GetStaticPaths = async () => {
  allPostId().catch(error => error.message);
  const paths = await allPostId();
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: { params: any }) => {
  // postContent(params.slug as string).catch(error => error.message);
  const res = await postContent(params.slug as string);
  const postData = res.data.postBySlug;
  return {
    props: {
      postData
    },
    revalidate: 10
  }
}