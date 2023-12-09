import format from 'date-fns/format'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import type { Blog } from '@/models/blog'

interface Props {
  featuredBlog: Blog;
}

const FeaturedBlog = ({ featuredBlog }: Props) => {
  const { t } = useTranslation('blog')

  const { locale } = useRouter()

  const title = featuredBlog.attributes.title
  const summary = featuredBlog.attributes.summary
  const minutesRead = featuredBlog.attributes.minutesRead

  const date = new Date(featuredBlog.attributes.publishedAt ?? '')

  const day = format(date, 'd')
  const monthName = format(date, 'MMMM')
  const year = format(date, 'yyyy')

  return (
    <Link href={{ pathname: `/blog/${featuredBlog.id}` }} locale={locale}>
      <div className="flex gap-6">
        <div className="self-center">
          <Image
            alt="img"
            className="
          cursor-pointer
          rounded-sm 
          hover:scale-105 
          transition 
          ease-in-out 
          duration-300"
            width={600}
            height={600}
            src={
              featuredBlog.attributes.image.data.attributes.formats.medium.url
            }
          />
        </div>
        <div className="max-w-[800px] flex flex-col justify-between">
          <h2
            className="
        font-semibold    
        text-transparent 
        bg-clip-text
        bg-gradient-to-t 
        from-[#0ba360] 
        to-[#3cba92] 
        cursor-pointer"
          >
            {title}
          </h2>
          <p className="text-xl">{summary}</p>
          <p className="underline">• {`${monthName} ${day}, ${year}`}</p>
          <p className="font-semibold text-offWhite/[0.6] uppercase">
            {t('minutes_read', { count: minutesRead })}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default FeaturedBlog
