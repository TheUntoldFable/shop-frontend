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

  const filteredProducts = useMemo(() =>allProducts.data.filter(p => p.attributes.subtitle !== 't-shirt' && p.attributes.subtitle !== 'hoodie' ),[ allProducts ])

  return (
    <div>
      <ToastContainer />
      <SubscribeDialog />
      <Wrapper>
        <HeroBanner />
        <div style={!isMobile ? slideRight(godsMonstersInView) : undefined} ref={godsMonstersRef} className="bg-offWhite relative flex flex-col flex-1 p-6 mb-12 rounded-md gap-6 bg-opacity-90">
          <div className="rounded-md z-1 text-center">
            <h2 className="text-darkBlack p-4 rounded-md uppercase sm:text-[32px] my-6 text-[24px] font-semibold">
              {t('GODS & MONSTERS')}
            </h2>
          </div>

          {hoodies && (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-6">
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

        <div style={!isMobile ? slideRight(collectionInView) : undefined} ref={collectionRef} className="bg-offWhite relative flex flex-col flex-1 p-6 mb-12 rounded-md gap-6 bg-opacity-90">
          <div className="rounded-md z-1 text-center">
            <h2 className="text-darkBlack p-4 rounded-md uppercase sm:text-[32px] my-6 text-[24px] font-semibold">
              {t('uncensored_collection')}
            </h2>
          </div>


          {shirts && (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-6">
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
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-2 my-12 md:gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard mIndex={index} key={`${product?.id}-${index}`} data={product} />
            ))}
          </div>
        )}
      </Wrapper>
      <ClimateSection />
    </div>
  )
}
