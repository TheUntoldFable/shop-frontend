import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect } from 'react'

import Container from '@/components/Container'
import HomePage from '@/components/screens/HomePage'
import { useAppDispatch } from '@/helpers/store'
import { getUser } from '@/store/contexts/userContext'
import { setUserInfo } from '@/store/userSlice'
import { fetchDataFromApi } from '@/utils/api'

import 'react-toastify/dist/ReactToastify.css'

// eslint-disable-next-line react/prop-types
export default function Home({ shirts, hoodies, allProducts, userData }) {
  const dispatch = useAppDispatch()
  const { locale } = useRouter()

  document.cookie = `NEXT_LOCALE=${locale}; max-age=31536000; path=/`

  useEffect(() => {
    dispatch(setUserInfo(userData))
  }, [])

  return (
    <main>
      <Container className='md:mt-56 sm:mt-28 mt-12'>
        <HomePage hoodies={hoodies} shirts={shirts} allProducts={allProducts} />
      </Container>
    </main>
  )
}

export async function getStaticProps(ctx) {
  const { locale } = ctx

  // const products = await fetchDataFromApi(
  //   `/api/products?populate=*&sort=subtitle:desc&locale=${locale}`
  // );

  const shirts = await fetchDataFromApi(
    `/api/products?populate=*&filters[subtitle][$contains]=t-shirt&sort=updatedAt:asc&locale=${locale}`
  )

  const hoodies = await fetchDataFromApi(
    `/api/products?populate=*&filters[subtitle][$contains]=hoodie&sort=updatedAt:asc&locale=${locale}`
  )

  const allProducts = await fetchDataFromApi(
    `/api/products?populate=*&sort=price:asc&locale=${locale}`
  )

  const userData = getUser(ctx)

  return {
    props: {
      hoodies,
      shirts,
      allProducts,
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
