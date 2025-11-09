/* eslint-disable react/prop-types */
import Image from 'next/image'
import { useMemo } from 'react'

export default function ImageSelector({ images, onSelect, selected }) {
    
	const selectedImage = useMemo(() => images ? images.find((a) => a.hash === selected)
		?.hash : undefined
	, [images, selected])

	return (
		<div className="flex flex-col gap-2">
			{images.map((image, index) => (
				<div
					onClick={() => onSelect(image.hash)}
					key={`${image.hash}-${index}`}
					className={`w-16 h-18 rounded-md transition ease-in-out hover:opacity-100 hover:border-[2px ${
						selectedImage === image.hash
							? 'border-[2px] border-neonGreen opacity-100'
							: 'opacity-60 border-0'
					}`}
				>
					<Image
						alt="img"
						width={500}
						height={750}
						src={image.formats.small.url}
						className="bg-white  flex cursor-pointer rounded-md h-full w-full"
					/>
				</div>
			))}
		</div>
	)
}
