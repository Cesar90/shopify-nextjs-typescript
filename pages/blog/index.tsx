import fs from 'fs'
import matter from 'gray-matter';
import path from 'path'
import Layout from '../../components/Layout';
import { sortByDate } from '../../utils'
import { IPosts } from '../../utils/interface'
import Post from '../../components/Post'

export default function BlogPage({posts}: IPosts) {
  return (
    <Layout>
        <h1 className='text-5xl border-b-4 p-5 font-bold'>
          Latest Posts
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, index) =><Post key={index} post={post} />)}
        </div>
    </Layout>
  )
}

export async function getStaticProps(){
  const files = fs.readdirSync(path.join('posts'))
  const posts  = files.map(filename => {
    const slug = filename.replace('.md','');
    const mardownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
    const { data:frontmatter }: any = matter(mardownWithMeta)
    const result = {
      slug,
      frontmatter
    }

    return result
  })
  
  return {
    props:{
      posts: posts.sort(sortByDate)
    }
  }
}