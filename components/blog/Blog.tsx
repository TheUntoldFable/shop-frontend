import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import type { Blog } from '@/models/blog'

interface Props {
  blog: Blog;
}

const Blog = ({ blog }: Props) => {
  const { t } = useTranslation('blog')
  const { locale } = useRouter()

  const source = blog.attributes.thumbnail.data.attributes.formats.large.url
  const title = blog.attributes.title
  const summary = blog.attributes.summary
  const minutesRead = blog.attributes.minutesRead

  const date = new Date(blog.attributes.publishedAt ?? '')

  const day = format(date, 'd')
  const monthName = format(date, 'MMMM')
  const year = format(date, 'yyyy')

  return (
    <Link
      className="w-full rounded-sm bg-offWhite"
      href={{ pathname: `/blog/${blog.id}` }}
      locale={locale}
    >
      <div className="flex flex-col gap-1 p-2">
        <div className="relative h-96">
          <Image
            alt="img"
            className="
       cursor-pointer
       rounded-sm
       max-h-[400px]"
            objectFit="cover"
            fill={true}
            src={source}
          />
        </div>
        <div className="flex items-center gap-2">
          <p
            className="underline text-transparent
         bg-clip-text
         bg-gradient-to-r
          from-gray-700 to-black"
          >
            {`${monthName} ${day}, ${year}`}
          </p>
          <p className="text-black sm:text-md text-sm font-semibold uppercase">
            • {t('minutes_read', { count: minutesRead })}
          </p>
        </div>
        <h3
          className="
        font-bold
        text-transparent
        bg-clip-text
        bg-gradient-to-r
        from-gray-700 to-black
        cursor-pointer
        "
        >
          {title}
        </h3>
        <p
          className="text-lg
           text-transparent
           bg-clip-text
    bg-gradient-to-r from-gray-700 to-black"
        >
          {summary}
        </p>

        <p className="font-semibold text-offWhite/[0.6] uppercase">
          {t('minutes_read', { count: minutesRead })}
        </p>
      </div>
    </Link>
  )
}

export default Blog
