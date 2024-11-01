import React from 'react'

const Discount = () => {
  return (
    <div className="flex flex-1 items-center justify-center flex-col text-center mx-12 py-12 mb-12 rounded-md">
      <h1 className="animate-bounce uppercase text-darkBlack font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#0ba360] to-[#3cba92]">
        Annual Sale
      </h1>
      <h2 className="text-[1.5rem] sm:text-md text-darkBlack font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0ba360] to-[#3cba92]">
        25% OFF
      </h2>
      <h2 className="uppercase text-[1.5rem] sm:text-md text-darkBlack font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0ba360] to-[#3cba92]">
        On all products
      </h2>
    </div>
  )
}

export default Discount
