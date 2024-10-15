import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Container from '@/components/Container'
import PageEmpty from '@/components/PageEmpty'
import WishlistItem from '@/components/wishlist/WishlistItem'
import Wrapper from '@/components/Wrapper'
import { useAppSelector } from '@/store/hooks'
import { selectWishlistItems } from '@/store/wishlistSlice'

const Wishlist = () => {
  const { t } = useTranslation([ 'wishlist', 'cart', 'buttons' ])

  const wishlistItems = useAppSelector(selectWishlistItems)

  return (
    <Container>
      <div className="w-full py-12">
        <Wrapper>
          {wishlistItems && wishlistItems?.length > 0 && (
            <>
              {/* HEADING AND PARAGRAPH START */}
              <div className="text-center max-w-[800px] mx-auto">
                <div className="text-offWhite text-[28px] md:text-[34px] font-semibold leading-tight">
                  {t('favourite')}
                </div>
              </div>
              {/* HEADING AND PARAGRAPH END */}

              {/* CART CONTENT START */}
              {/* CART ITEMS START */}
              <div className="flex flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-5 my-14 px-5 md:px-0">
                  {wishlistItems.map((item) => (
                    <WishlistItem key={item.id} wishlistItem={item} />
                  ))}
                </div>
              </div>
              {/* CART ITEMS END */}
              {/* CART CONTENT END */}
            </>
          )}

          {/* This is empty screen */}
          {wishlistItems.length < 1 && (
            <PageEmpty
              icon="heart"
              title={t('empty')}
              description={t('empty_description')}
            />
          )}
        </Wrapper>
      </div>
    </Container>
  )
}

export default Wishlist

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'footer',
        'nav',
        'wishlist',
        'buttons',
        'banner'
      ]))
    }
  }
}
