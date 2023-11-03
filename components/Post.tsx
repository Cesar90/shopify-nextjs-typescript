import Link from 'next/link'
import Image from 'next/image'
import { IPostProps } from '../utils/interface'

export default function Post({ post }: IPostProps) {
    return (
        <div className="w-full 
            px-10 py-6 
            bg-white rounded-lg
            shadow-md mt-6">
            <Image src={post.frontmatter.cover_image} alt='' height={420} width={600} />

            <div className="flex justify-between items center">
                <span className="font-ligth text-gray-600">
                    {new Date(post.frontmatter.date).toDateString()}
                </span>
                <div>
                  {post.frontmatter.category}
                </div>
            </div>
            
            <div className="mt-2">
                <Link href={`/blog/${post.slug}`}>
                    <a className="text-2xl text-gray-700 font-bold hover:underline">
                        {post.frontmatter.title}
                    </a>
                </Link>
                <p className="mt-2 text-gray-600">
                    {post.frontmatter.excerpt}
                </p>
            </div>

            <div className="flex justify-between items-center mt-6">
                <Link href={`/blog/${post.slug}`}>
                    <a className="text-gray-900 hover:text-blue-600">
                        Read More
                    </a>
                </Link>
                <div className="flex items-center">
                    <img src={post.frontmatter.cover_image}
                    className="mx-4 w-10 h-10 object-cover 
                    rounded-full hidden sm:block" />
                </div>
            </div>
        </div>
    )
}
