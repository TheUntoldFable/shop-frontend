import type { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect } from 'react'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import HomePage from '@/components/screens/HomePage'
import { useAppDispatch } from '@/helpers/store'
import { getUser } from '@/store/contexts/userContext'
import { revertAll } from '@/store/rootReducer'
import { setUserInfo } from '@/store/userSlice'
import { fetchDataFromApi } from '@/utils/api'

import 'react-toastify/dist/ReactToastify.css'

// eslint-disable-next-line react/prop-types
export default function Home({ shirts, productsNoShirt, userData }) {
  const dispatch = useAppDispatch()
  const { locale } = useRouter()

  document.cookie = `NEXT_LOCALE=${locale}; max-age=31536000; path=/`

  useEffect(() => {
    dispatch(setUserInfo(userData))
  }, [])

  useEffect(() => {
    dispatch(revertAll())
  }, [ locale ])

  return (
    <main>
      <Header />

      <HomePage shirts={shirts} productsNoShirt={productsNoShirt} />

      <Footer />
    </main>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx

  if(!locale) return { props: {} }

  // const products = await fetchDataFromApi(
  //   `/api/products?populate=*&sort=subtitle:desc&locale=${locale}`
  // );

  const shirts = await fetchDataFromApi(
    `/api/products?populate=*&filters[subtitle][$contains]=t-shirt&sort=updatedAt:asc&locale=${locale}`
  )

  const productsNoShirt = await fetchDataFromApi(
    `/api/products?populate=*&filters[subtitle][$notContains]=t-shirt&sort=price:asc&locale=${locale}`
  )

  const userData = getUser(ctx)

  return {
    props: {
      shirts,
      productsNoShirt,
      userData,
      ...(await serverSideTranslations(locale, [
        'common',
        'coming_soon',
        'nav',
        'forms',
        'footer',
        'buttons',
        'banner'
      ]))
      // Will be passed to the page component as props
    }
  }
}
