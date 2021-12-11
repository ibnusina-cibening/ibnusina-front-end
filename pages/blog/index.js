// material
import { styled } from '@mui/material/styles';
// components
import Page from 'src/components/Page';
import MainLayout from 'src/layouts/main';

import client, { QueryPosts } from 'src/db';
import {
  LandingBlog,
} 
from 'src/components/_external-pages/blog';


const RootStyle = styled(Page)({
  height: '100%',
});
  

export async function getServerSideProps(){
  const { data } = await client.query(QueryPosts, {fetchPolicy: "network-only"});
  return{
    props:{
      posts: data?.loadPosts?.postResult,
      revalidate: 30
    }
  }
}

export default function BlogPage({posts}) {
  return (
    <MainLayout>
        <RootStyle
        title='IBNU SINA | Blog'
        id='move_top'
        >
            <LandingBlog data={posts} />
        </RootStyle>
    </MainLayout>
  );
}