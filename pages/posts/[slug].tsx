import Layout from '../../components/layout'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next';
import allPostId from '../../posts/allPostId';
import postContent from '../../posts/postContent';
import { ViewStats, ViewReaction, ViewLike } from '../../posts/useMetaPost';
import UseComment from '../../posts/useComment';

export default function Post({
  postData
}: {
  postData: {
    id: string
    title: string
    createdAt: string
    content: string
    slug: string
  }
}) {
  const id = postData?.id;
  return (
    <Layout>
      <Head>
        <title>{postData?.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData?.title}</h1>
        <div className={utilStyles.lightText}>
          <div>{postData?.createdAt}</div>
        </div>
        <div>{postData?.content}</div>
        -------- statistik ------------
        <ViewStats postId={id} />
        --------- reaksi ---------------
        <ViewReaction postId={id} />
        ---------- suka ----------------
        <ViewLike postId={id} />
        ---------- tindakan -----------
        komentar, bagikan, suka
      </article>
      <UseComment pId={id} />
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

export const getStaticProps: GetStaticProps = async ({ params }:{params: any}) => {
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