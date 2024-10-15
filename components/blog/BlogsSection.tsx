import type { Blog } from '@/models/blog'

import BlogDetails from './Blog'

interface Props {
  blogs: Blog[];
}

function BlogsSection({ blogs }: Props) {
  if (blogs.length < 1) return null

  return (
    <div
      className={`grid gap-4 sm:grid-cols-${blogs.length > 3 ? 3 : blogs.length}`}
    >
      {blogs?.map((blog, index) => <BlogDetails blog={blog} key={index} />)}
    </div>
  )
}

export default BlogsSection
