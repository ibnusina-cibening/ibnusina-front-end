import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
// import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
// import Date from '../components/date'
import { GetStaticProps } from 'next'
import postlist from '../lib/postList';

export default function Home({
  allPostsData
}: {
  allPostsData: {
    createdAt: string
    title: string
    slug: string
  }[]
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ slug, createdAt, title }) => (
            <li className={utilStyles.listItem} key={slug}>
              <Link href={`/posts/${slug}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <FormatDate dateString={createdAt}/>
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

function FormatDate({ dateString }: { dateString: string }){
  const dd= new Date(+dateString);
  return <div>{dd.toDateString()}</div>
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
