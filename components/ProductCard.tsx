/* eslint-disable react/prop-types */
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'

import useCurrency from '@/hooks/useCurrency'
import useWindowSize from '@/hooks/useWindowSize'
import { fadeIn } from '@/utils/animations'
import { getDiscountedPricePercentage } from '@/utils/helper'

const ProductCard = ({
 data: { slug, name, price, original_price, outOfStock, thumbnail },
  isCarouselCard,
  border,
}: any) => {
  const { isMobile } = useWindowSize()
  const { t } = useTranslation('common')
  const router = useRouter()
  const { locale } = router
  const { currency } = useCurrency()
  const discount = Number(
    getDiscountedPricePercentage(original_price, price)
  )

  const productRef = useRef(null) 
  const productInView = useInView(productRef, { once: true })

  const disabled: boolean = outOfStock

  return (
    <motion.div
      ref={productRef}
      style={!isMobile ? fadeIn(productInView) : undefined}
      className={`${isCarouselCard && 'h-[500px] w-[450px]'} 
      relative
      overflow-hidden
    bg-darkBlack
      drop-shadow-lg
      rounded-md
   ${
    disabled
      ? 'hover:scale-1 pointer-events-none cursor-auto'
      : undefined
    }
   cursor-pointer
   `}
    >
      <Link href={{ pathname: `/product/${slug}` }} locale={locale}>
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
          className={` ${
            isCarouselCard &&
            'sm:border-[2px] sm:border-white sm:w-[250px] sm:min-h-[500px]'
          } 
          transition-all 0.4s cubic-bezier(0.17, 0.55, 0.55, 1)
      rounded-md
          hover:border-[#3cba92] border-offWhite border-[4px] '
       `}
        >
          {disabled && <div className="inset-0 absolute bg-white opacity-50" />}
          <Image
            className={'bg-cover '}
            width={isCarouselCard ? 250 : 400}
            height={isCarouselCard ? 250 : 400}
            src={thumbnail?.url}
            alt={name ?? 'No Photo'}
          />
          <div className="justify-end flex-col p-4 text-offWhite/[0.9]">
            <h2 className="text-lg text-transparent  bg-clip-text bg-gradient-to-r from-[#0ba360] to-[#3cba92] font-bold">
              {name}
            </h2>
            <div className="flex items-center justify-between flex-row sm:flex-row text-black/[0.5]">
              <div className="flex flex-row">
                <p className="mr-2 text-lg font-semibold">
                  {price} {currency}
                </p>

                {discount > 0 && (
                  <p className="text-base font-normal line-through">
                    {original_price} {currency}
                  </p>
                )}
              </div>
              {original_price && (
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
      </Link>
    </motion.div>
  )
}

export default ProductCard
