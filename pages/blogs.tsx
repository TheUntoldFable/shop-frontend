import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { memo, useContext, useLayoutEffect, useRef, useState } from 'react'

import BlogsSection from '@/components/blog/BlogsSection'
import FeaturedBlog from '@/components/blog/FeaturedBlog'
import Container from '@/components/Container'
import PageEmpty from '@/components/PageEmpty'
import Wrapper from '@/components/Wrapper'
import type { Blog } from '@/models/blog'
import { UIContext } from '@/store/contexts/ui'
import { fetchDataFromApi } from '@/utils/api'

interface Props {
  blogs: { data: Blog[] };
  featuredBlogs: { data: Blog[] };
  allBlogs: { data: Blog[] };
}

// eslint-disable-next-line no-empty-pattern
const BlogPage: NextPage<Props> = ({
  blogs,
  featuredBlogs,
  allBlogs
}: Props) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const hasFeaturedBlogs = featuredBlogs?.data.length > 0
  const hasBlogs = allBlogs?.data.length > 0
  const uiContext = useContext(UIContext)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [ headerHeightVH, setHeaderHeightVH ] = useState(0)

  useLayoutEffect(() => {
    if (uiContext?.containerRef.current) {
      // Get the div height in pixels
      const height = uiContext.containerRef.current.offsetHeight

      // If you want the height in viewport height (vh):
      const vh = (height / window.innerHeight) * 100
      setHeaderHeightVH(vh)
    }
  }, [ uiContext ])

  return (
    <Container>
      <div
        ref={containerRef}
        /*        style={{
                                          height: `${100 - headerHeightVH}vh`
                                        }}*/
      >
        {/*<div className="flex flex-1 mt-12 flex-col justify-around items-center h-full">*/}
        {/*  <h1 className="text-center font-bold">Our blogs!</h1>*/}
        {/*  <FontAwesomeIcon size="4x" icon={faCaretDown} />*/}
        {/*</div>*/}
      </div>
      <Wrapper className="p-4 h-full my-14 flex flex-col gap-24">
        {locale !== 'it' && hasBlogs ? (
          <>
            {hasFeaturedBlogs && (
              <FeaturedBlog featuredBlog={featuredBlogs.data[0]} />
            )}
            <BlogsSection blogs={blogs.data} />
          </>
        ) : (
          <PageEmpty
            title={t('empty', { ns: 'blog' })}
            description={t('empty_description', { ns: 'blog' })}
            icon="blog"
          />
        )}
      </Wrapper>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx

  if (!locale) return { props: {} }

  if (locale === 'it')
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'footer',
          'nav',
          'buttons',
          'banner',
          'blog'
        ]))
      }
    }

  const blogs = await fetchDataFromApi(
    `/api/blogs?populate=*&filters[isFeatured][$eq]=false&[sort]=updatedAt:asc&&locale=${locale}`
  )

  const featuredBlogs = await fetchDataFromApi(
    `/api/blogs?populate=*&filters[isFeatured][$eq]=true&locale=${locale}`
  )

  const allBlogs = await fetchDataFromApi(
    `/api/blogs?populate=*&locale=${locale}`
  )

  return {
    props: {
      allBlogs,
      featuredBlogs,
      blogs,
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

export default memo(BlogPage)
