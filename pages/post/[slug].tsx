import Link from 'next/link'
import { useRouter } from 'next/router';

import styles from '../../styles/Home.module.scss'


const {CONTENT_API_KEY, BLOG_URL} = process.env;


async function getPost(slug: string) {
    const res = await fetch(`${BLOG_URL}/ghost/api/v3/content/posts/slug/${slug}?key=${CONTENT_API_KEY}&fields=title,slug,excerpt,html`)
    .then(res => res.json());

    const posts = res.posts;
    return posts[0];
}

export const getStaticProps = async ({ params }) => {
    const post = await getPost(params.slug);
  
    return  {
      props: {post}
    }
  }
export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: true
    }
}
type Post = {
    title: string
    html: string
    slug: string
}

const Post: React.FC<{post: Post}> = props => {
    console.log(props);
    const { post } = props;
    const router = useRouter();

    if(router.isFallback) {
        return <h1>Loading...</h1>
    }
    return( 

        <div className={styles.container}>
            
            <div className="goBack">
                <Link href="/" >
                    <a>Go Back</a>
                </Link>
            </div>
            
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{__html: post.html}}></div>
            
        
        </div>
    )
}

export default Post;