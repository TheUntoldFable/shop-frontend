import format from 'date-fns/format'
import type { NextPage, GetServerSideProps } from 'next'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Markdown from 'react-markdown'

import Container from '@/components/Container'
import Wrapper from '@/components/Wrapper'
import type { Blog } from '@/models/blog'
import { fetchDataFromApi } from '@/utils/api'

interface Props {
  blog: { data: Blog[]; }
}

const BlogDetails: NextPage<Props> = ({ blog }: Props) => {
  const { t } = useTranslation('blog')

  const date = new Date(blog.data[0].attributes.publishedAt ?? '')

  const day = format(date,'d')
  const monthName = format(date,'MMMM')
  const year = format(date,'yyyy')

  const content = blog.data[0].attributes.content
  const minutesRead = blog.data[0].attributes.minutesRead
  const title = blog.data[0].attributes.title

  const imageUrl = blog.data[0].attributes.image.data.attributes.formats.large.url
  
  return (
    <Container>
      <Wrapper className='py-12 max-w-[960px]'>
        <div className='flex flex-col gap-12 mb-24 border-b-[1px] pb-6 border-offWhite'>
          <p className="text-offWhite/[0.6] text-[20px] capitalize">{t('minutes_read',{ count: minutesRead })}</p>
          <Image width={1280} height={1080} className='w-full' alt="img" src={imageUrl ?? ''}/>
          <h1 className='font-semibold'>{title}</h1>
          <p>• {`${monthName} ${day}, ${year}`}</p>
        </div>
        
        {/* <div style={{
          whiteSpace: 'normal',
          wordBreak: 'break-word'
        }} dangerouslySetInnerHTML={{ __html: content }}></div> */}
        <Markdown className=" prose p-4 text-[18px] text-offWhite">
          {content}
        </Markdown>
      </Wrapper>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    locale,
    params: { id }
  } = ctx

  if (!locale) return { props: {} }

  const blog = await fetchDataFromApi(
    `/api/blogs?populate=*&filters[id][$eq]=${id}&locale=${locale}`
  )

  return {
    props: {
      blog,
      ...(await serverSideTranslations(locale, [
        'footer',
        'nav',
        'buttons',
        'banner',
        'blog'
      ]))
    }
  }
}

export default BlogDetails
