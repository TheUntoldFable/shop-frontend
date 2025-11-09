/* eslint-disable react/prop-types */
import { useInView } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { useMemo, useRef } from 'react'
import { ToastContainer } from 'react-toastify'

import useWindowSize from '@/hooks/useWindowSize'
import { slideRight } from '@/utils/animations'

import ClimateSection from '../ClimateSection'
import HeroBanner from '../HeroBanner'
import ProductCard from '../ProductCard'
import SubscribeDialog from '../SubscribeDialog'
import Wrapper from '../Wrapper'

export default function HomePage({ hoodies, shirts, allProducts }) {
  const { isMobile } = useWindowSize()
  const { t } = useTranslation('common')

  const collectionRef = useRef(null)
  const godsMonstersRef = useRef(null)

  const collectionInView = useInView(collectionRef, { once: true })
  const godsMonstersInView = useInView(godsMonstersRef, { once: true })


  const filteredProducts = useMemo(
    () =>
      allProducts.data.filter(
        (p) =>
          p.attributes?.subtitle !== 't-shirt' &&
          p.attributes?.subtitle !== 'hoodie'
      ),
    [ allProducts ]
  )

  return (
    <div>
      <ToastContainer />
      <SubscribeDialog />
      {/*<Discount />*/}
      <Wrapper>
        <HeroBanner />
        <div
          style={!isMobile ? slideRight(godsMonstersInView) : undefined}
          ref={godsMonstersRef}
          className="relative mb-12 flex flex-1 flex-col gap-6 rounded-md bg-offWhite bg-opacity-90 p-6"
        >
          <div className="z-1 rounded-md text-center">
            <h2 className="my-6 rounded-md p-4 font-semibold text-[24px] uppercase text-darkBlack sm:text-[32px]">
              {t('GODS & MONSTERS')}
            </h2>
          </div>

          {hoodies && (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 md:gap-6 lg:grid-cols-3">
              {hoodies?.data?.map((product) => (
                <ProductCard
                  key={product?.id}
                  data={product}
                  border="border-0"
                />
              ))}
            </div>
          )}
        </div>

        <div
          style={!isMobile ? slideRight(collectionInView) : undefined}
          ref={collectionRef}
          className="relative mb-12 flex flex-1 flex-col gap-6 rounded-md bg-offWhite bg-opacity-90 p-6"
        >
          <div className="z-1 rounded-md text-center">
            <h2 className="my-6 rounded-md p-4 font-semibold text-[24px] uppercase text-darkBlack sm:text-[32px]">
              {t('uncensored_collection')}
            </h2>
          </div>

          {shirts && (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 md:gap-6 lg:grid-cols-3">
              {shirts?.data?.map((product) => (
                <ProductCard
                  key={product?.id}
                  data={product}
                  border="border-0"
                />
              ))}
            </div>
          )}
        </div>
        {filteredProducts && (
          <div className="my-12 grid grid-cols-1 gap-2 sm:grid-cols-3 md:gap-6 lg:grid-cols-3">
            {filteredProducts.map((product, index) => (
              <ProductCard
                mIndex={index}
                key={`${product?.id}-${index}`}
                data={product}
              />
            ))}
          </div>
        )}
      </Wrapper>
      <ClimateSection />
    </div>
  )
}
