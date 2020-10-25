import Head from 'next/head'
import styles from '../styles/Home.module.scss'

const CONTENT_API_KEY = 'cf1950cbb71a9436ec40d9fe80';
const BLOG_URL = 'https://ghost-next-backend.herokuapp.com';

type Post = {

}

async function getPosts() {
  const res = await fetch(`${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}`)
              .then(res => res.json());

  const titles = res.posts.map((post) => post.title);
  // console.log(titles);
  return titles;
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts();

  return  {
    props: {posts}
  }
}

const Home:React.FC<{ posts: string[] }> = (props) =>{
  const { posts } = props
  return (
    <div className={styles.container}>
      <h1>Hello to my blog! :)</h1>
      <ul>
        {posts.map((post, index) => {
          return <li key={index}>{post}</li>
        })}
      </ul>
    </div>
  )
}


export default Home;