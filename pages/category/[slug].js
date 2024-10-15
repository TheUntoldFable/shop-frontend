/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import Container from '@/components/Container'
import ProductCard from '@/components/ProductCard'
import Wrapper from '@/components/Wrapper'
import { fetchDataFromApi } from '@/utils/api'

const Category = ({ category, products, slug }) => {
  const [ pageIndex, setPageIndex ] = useState(1)
  const { query, locale } = useRouter()

  useEffect(() => {
    setPageIndex(1)
  }, [ query ])

  const { data, isLoading } = useSWR(
    `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&locale=${locale}`,
    fetchDataFromApi,
    {
      fallbackData: products
    }
  )

  return (
    <Container>
      <div className="w-full relative">
        <Wrapper>
          <div className="text-center max-w-[800px]mx-auto">
            <div className="text-[28px] md:text-[34px] pt-10 mb-5 font-semibold leading-tight">
              {category?.data?.[0]?.attributes?.name}
            </div>
          </div>

          {/* products grid start */}
          <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-5 my-14 px-5 md:px-0">
            {data?.data?.map((product) => (
              <ProductCard key={product?.id} data={product} />
            ))}
          </div>
          {/* products grid end */}

          {/* PAGINATION BUTTONS START */}
          {/* {data?.meta?.pagination?.total > maxResult && (
            <div className="flex gap-3 items-center justify-center my-16 md:my-0">
              <button
                className={`rounded py-2 px-4 bg-#393646 text-offWhite disabled:bg-gray-200 disabled:text-gray-500`}
                disabled={pageIndex === 1}
                onClick={() => setPageIndex(pageIndex - 1)}
              >
                Previous
              </button>

              <span className="font-bold">{`${pageIndex} of ${
                data && data.meta.pagination.pageCount
              }`}</span>

              <button
                className={`rounded py-2 px-4 bg-#393646 text-offWhite disabled:bg-gray-200 disabled:text-gray-500`}
                disabled={
                  pageIndex === (data && data.meta.pagination.pageCount)
                }
                onClick={() => setPageIndex(pageIndex + 1)}
              >
                Next
              </button>
            </div>
          )} */}
          {/* PAGINATION BUTTONS END */}
          {isLoading && (
            <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
              <img src="/favicon.ico" width={150} />
              <span className="text-2xl font-medium">Loading...</span>
            </div>
          )}
        </Wrapper>
      </div>
    </Container>
  )
}

export default Category

export async function getServerSideProps({ params: { slug }, locale }) {
  const category = await fetchDataFromApi(
    `/api/categories?populate=*&filters[slug][$eq]=${slug}&locale=${locale}`
  )
  const products = await fetchDataFromApi(
    `/api/products?populate=*&filters[categories][slug][$eq]=${slug}&locale=${locale}`
  )

  return {
    props: {
      category,
      products,
      slug,
      ...(await serverSideTranslations(locale, [
        'footer',
        'nav',
        'buttons',
        'banner'
      ]))
    }
  }
}
