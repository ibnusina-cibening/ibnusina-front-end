// material
import { styled } from '@mui/material/styles';
// components
import { FC } from 'react';
import Page from 'src/components/Page';
import MainLayout from 'src/layouts/main';
import { GetStaticProps } from 'next'
import { gql, GraphQLClient } from 'graphql-request';
import {
  LandingBlog,
}
  from 'src/components/_external-pages/blog';
import Error from '../_error';

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
    imageUrl: string
    author: {
      callName: string
      avatar: string
    }
    meta: {
      viewCount: number
      commentCount: number
      shareCount: number
    }
  }[]
}) {
  // console.log(allPostsData);
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
  const postList = gql`
  query{
    loadPosts(limit:15){
      nextPost
      postResult{
        id
        title
        createdAt
        slug
        imageUrl
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
  const url = process.env.GRAPH_URL!; // hanya diakses di server ( tidak menggunakan prefix NEXT_PUBLIC)
  const headers = {Authorization: '' };
  const client = new GraphQLClient(url, { headers });
  const data = await client.request(postList);
  const allPostsData = data.loadPosts.postResult;
  // console.log(process.env.NODE_ENV );
  try {
    if (!allPostsData) {
      return Error({statusCode:404})
    }
  }catch(e){
    return Error({statusCode:500})
  }
  return {
    props: {
      allPostsData
    },
    revalidate: 10
  }
}

// fetching data sebaiknya langsung di sini, tidak request route api. 
// referensi: https://stackoverflow.com/questions/61452675/econnrefused-during-next-build-works-fine-with-next-dev