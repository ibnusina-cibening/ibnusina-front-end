import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
// import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
// import Date from '../components/date'
import { GetStaticProps } from 'next'
import postlist from '../lib/postList';
// import postData from '../lib/allPostId'

export default function Home({
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
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Pondok Pesantren Ibnu Sina</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ slug, createdAt, title, author, meta }) => (

            <li className={utilStyles.listItem} key={slug}>
              <Link href={`/posts/${slug}`}>
                <a>{title}</a>
              </Link>
              <div>
                <small>{'penulis: '}{author.callName}</small>
                <small className={utilStyles.lightText}>
                  <FormatDate dateString={createdAt} />
                </small>
                <small>
                  {'view: '}{meta?.viewCount ?? 0}
                  {' share: '}{meta?.shareCount ?? 0}
                  {' comment: '}{meta?.commentCount ?? 0}
                </small>
              </div>
              {'--------------------------------------------'}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

function FormatDate({ dateString }: { dateString: string }) {
  const dd = new Date(+dateString);
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
