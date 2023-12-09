import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import type { Blog } from '@/models/blog'

interface Props {
  blog: Blog
}

const BlogDetails = ({ blog }: Props) => {
  const { t } = useTranslation('blog')
  const { locale } = useRouter()
  
  const source = blog.attributes.thumbnail.data.attributes.formats.large.url
  const title = blog.attributes.title
  const summary = blog.attributes.summary
  const minutesRead = blog.attributes.minutesRead

  const date = new Date(blog.attributes.publishedAt ?? '')

  const day = format(date,'d')
  const monthName = format(date,'MMMM')
  const year = format(date,'yyyy')
   
  return (
    <Link href={{ pathname: `/blog/${blog.id}` }} locale={locale}>
      <div className="rounded-sm flex flex-col gap-4 p-2">
        <Image
          alt="img"
          className="
       cursor-pointer
       rounded-sm 
       hover:scale-105 
       transition 
       ease-in-out 
       duration-300"
          width={1280}
          height={980}
          src={source}
        />
        <h3
          className="
        font-semibold    
        text-transparent 
        bg-clip-text
        bg-gradient-to-t 
        from-[#0ba360] 
        to-[#3cba92]
        cursor-pointer
        "
        >
          {title}
        </h3>
        <p className='text-lg'>{summary}</p>
        <p className='underline'>• {`${monthName} ${day}, ${year}`}</p>
        <p className="font-semibold text-offWhite/[0.6] uppercase">{t('minutes_read',{ count: minutesRead })}</p>
      </div>
    </Link>
  )
}

export default BlogDetails
