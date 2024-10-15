/* eslint-disable react/prop-types */
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useRef } from 'react'

import useCurrency from '@/hooks/useCurrency'
import useWindowSize from '@/hooks/useWindowSize'
import { fadeIn } from '@/utils/animations'
import { getDiscountedPricePercentage } from '@/utils/helper'

const ProductCard = ({
  data: { attributes: p },
  isCarouselCard,
  border,
  mIndex // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  const { isMobile } = useWindowSize()
  const { t } = useTranslation('common')
  const router = useRouter()
  const { locale } = router
  const { currency } = useCurrency()
  const discount = Number(
    getDiscountedPricePercentage(p.original_price, p.price)
  )

  const productRef = useRef(null)
  const productInView = useInView(productRef, { once: true })
  const disabled: boolean = p.outOfStock

  return (
    <motion.div
      ref={productRef}
      style={!isMobile ? fadeIn(productInView, mIndex) : undefined}
      className={`
      h-full
      overflow-hidden
    bg-darkBlack
      transition 
      ease-in-out duration-300
      drop-shadow-2xl
${border ?? 'border-[2px] border-white'}
   cursor-pointer
   `}
    >
      <Link href={{ pathname: `/product/${p.slug}` }} locale={locale}>
        {disabled && (
          <div
            className="
       absolute
       z-10
       inset-0
       flex
       flex-1
       flex-col
       items-center
       justify-center
      text-white
       font-bold
       top-50"
          >
            <div className="bg-black p-2 text-center">{t('out_of_stock')}</div>
          </div>
        )}
        <div
          className={` flex flex-1 flex-col ${isCarouselCard && 'sm:border-[1px]  sm:border-white'} 
        ${border ?? 'border-[2px] border-white'}`}
        >
          {disabled && <div className="inset-0 absolute bg-white opacity-50" />}
          <div className="p-52">
            <Image
              alt="img"
              objectFit="cover"
              fill={true}
              src={p.thumbnail.data.attributes.url}
            />
          </div>
          <div className="absolute inset-0  transition-opacity duration-300 opacity-0 hover:opacity-100  flex flex-1 justify-end flex-col z-10  text-offWhite/[0.9]">
            <div className="bg-black rounded-t-sm p-2">
              <h2 className="text-lg text-transparent  bg-clip-text bg-gradient-to-r from-[#0ba360] to-[#3cba92] font-bold">
                {p.name}
              </h2>
              <div className="flex items-center justify-between flex-row sm:flex-row text-black/[0.5]">
                <div className="flex flex-row">
                  <p className="mr-2 text-lg font-semibold">
                    {p.price} {currency}
                  </p>

                  {discount > 0 && (
                    <p className="text-base font-normal line-through">
                      {p.original_price} {currency}
                    </p>
                  )}
                </div>
                {p.original_price && (
                  <>
                    {discount > 0 && (
                      <div className="flex justify-between">
                        <p className="text-base font-semibold rounded-md bg-orange-400 p-[5px] text-white">
                          -{discount}%
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard
