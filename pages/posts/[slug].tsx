import Layout from '../../components/layout'
// import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
// import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next';
// import postlist from '../../lib/postList';
import allPostId from '../../lib/allPostId';
import postContent from '../../lib/postContent';
import queryMetaPost from '../../lib/query';
import SWRrequest from '../../lib/SWR';

export default function Post({
  postData
}: {
  postData: {
    title: string
    createdAt: string
    content: string
    slug: string
  }
}) {
  // console.log(postData);
  console.log(postData);
  const varSlug = {slug: postData.slug};
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <div>{postData.createdAt}</div>
        </div>
        <div>{postData.content}</div>
        <SWRrequest query={queryMetaPost.metaPost} variable={varSlug} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  allPostId().catch(error => error.message);
  const paths = await allPostId();
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  postContent(params.slug as string).catch(error => error.message);
  const res = await postContent(params.slug as string);
  const postData = res.data.postBySlug;
  return {
    props: {
      postData
    },
    revalidate: 10
  }
}