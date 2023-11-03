import fs from 'fs'
import path from 'path'
import matter from 'gray-matter';
import { marked } from 'marked'
import Link from 'next/link'
import Layout from '../../components/Layout';
import { IStaticProps, IPropsPost } from '../../utils/interface'

export default function PostPage({
    frontmatter: { title, category, date, cover_image }, content, slug
}:IPropsPost) {
    return (<Layout>
        <Link href='/blog'>Go Back</Link>
        <div className="w-full px-10 
            py-6 bg-white 
            rounded-lg shadow-md 
            mt-6">
                <div className="flex justify-between items-center mt-4">
                    <h1 className="text-5xl mb-7">
                        {title}
                    </h1>
                    <div>{category}</div>
                </div>
                <img src={cover_image} alt="" className="w-full rounded" />

                <div className='flex justify-between items-center bg-gray-100 p-2 my-8'>
                    <div className='flex items-center'>
                        <img
                        src={cover_image}
                        alt=''
                        className='mx-4 w-10 h-10 object-cover rounded-full hidden sm:block'
                        />
                        <h4>{title}</h4>
                    </div>
                    <div className='mr-4'>{new Date(date).toDateString()}</div>
                </div>

                <div className='blog-text mt-2'>
                    <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
                </div>
        </div>
    </Layout>)
}

export async function getStaticPaths() {
    //We get all the posts that are in the post folder
    const files = fs.readdirSync(path.join('posts'))
    //We get the static routes of the posts
    const paths = files.map((filename) => ({
      params: {
        slug: filename.replace('.md', ''),
      },
    }))
  
    return {
      paths,
      fallback: false,
    }
}

export async function getStaticProps({ params: { slug } }: IStaticProps){

    const markdownWithMeta = fs.readFileSync(
        path.join('posts', slug + '.md'),
        'utf-8'
      )
    
    const { data: frontmatter, content } = matter(markdownWithMeta)

    return {
        props: {
            frontmatter,
            content,
            slug
        }
        
    }
}