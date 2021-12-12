// material
import { styled } from '@mui/material/styles';
// components
import { FC } from 'react';
import Page from '../../src/components/Page';
import MainLayout from '../../src/layouts/main';
import { GetStaticProps } from 'next'
import postlist from '../../posts/postList';
// import client, { QueryPosts } from 'src/db';
import {
  LandingBlog,
}
  from '../../src/components/_external-pages/blog';


const RootStyle: FC<any> = styled(Page)({
  height: '100%',
});

export default function BlogPage({
  allPostsData
}: {
  allPostsData: {
    createdAt: string
    title: string
    slug: string
    author: {
      callName: string
    }
    meta: {
      viewCount: number
      commentCount: number
      shareCount: number
    }
  }[]
}) {
  return (
    <MainLayout>
      <RootStyle
        title='IBNU SINA | Blog'
        id='move_top'
      >
        <LandingBlog data={allPostsData} />
      </RootStyle>
    </MainLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await postlist();
  postlist().catch(error => error.message);
  const allPostsData = posts.data.loadPosts.postResult;
  return {
    props: {
      allPostsData
    },
    revalidate: 10
  }
}