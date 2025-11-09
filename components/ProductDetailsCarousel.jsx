/* eslint-disable react/prop-types */
import Image from 'next/image';
import { useMemo } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

const ProductDetailsCarousel = ({ image, sliderImages, selected }) => {

  const selectedImage = useMemo(() => sliderImages
    ? sliderImages.find((a) => a.hash === selected)
    : null
  , [sliderImages, selected])


  return (
    <div className="text-[20px] text-neonGreenLighter w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Image
        className="rounded-md"
        width={800}
        height={600}
        key={selectedImage?.id ?? image?.id}
        src={selectedImage?.url ?? image?.url}
        alt={selectedImage?.name ?? image?.name}
      />
    </div>
  )
}

export default ProductDetailsCarousel
