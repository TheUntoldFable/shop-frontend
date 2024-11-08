import Image from 'next/image'
import React from 'react'

import saleImage from '@/public/sale.png'

const Discount = () => {
  return (
    <div className="mt-24 flex flex-1 flex-col items-center justify-center rounded-md text-center sm:mt-44">
      <h1 className="animate-bounce font-bold text-3xl uppercase text-white sm:text-7xl">
        Annual Sale
      </h1>
      <div className="-mt-14 max-w-[1080px] sm:-mt-24">
        <Image src={saleImage} alt="sale" />
      </div>
    </div>
  )
}

export default Discount
