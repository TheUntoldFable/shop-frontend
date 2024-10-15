import { XMarkIcon } from '@heroicons/react/20/solid'
import { useTranslation } from 'next-i18next'

import { useAppDispatch } from '@/helpers/store'
import useCurrency from '@/hooks/useCurrency'
import useWindowSize from '@/hooks/useWindowSize'
import { useAppSelector } from '@/store/hooks'
import { selectShowBanner, setShowBanner } from '@/store/uiSlice'

export default function Banner() {
  const dispatch = useAppDispatch()
  const shouldShowBanner = useAppSelector(selectShowBanner)
  const { currency } = useCurrency()
  const { t } = useTranslation('banner')
  const {
    windowSize: { width }
  } = useWindowSize()
  const isMobile = width < 420 // Blaze it

  if (!shouldShowBanner) return null

  return (
    <div
      className="
    relative 
    bg-gray-50 
    isolate 
    flex 
    justify-between 
    items-center 
    sm:flex-row 
    gap-2 
    overflow-hidden 
    p-2 
    sm:px-3.5"
    >
      {!isMobile && <div className="w-6 h-6 md:w-12 md:h-12" />}
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        <div className="flex justify-center items-center sm:flex-row gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#181516"
            className="sm:w-8 w-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <svg
            viewBox="0 0 2 2"
            className="mx-2 inline h-0.5 w-0.5 fill-current"
            aria-hidden="true"
          >
            <circle cx={1} cy={1} r={1} />
          </svg>
          <p className="text-sm md:text-lg leading-6 text-gray-900 font-semibold uppercase">
            {t('description')}
          </p>

          <div
            className="
          bg-gray-900 
          uppercase 
          cursor-pointer 
          rounded-full 
          px-3.5 
          py-1 
          md:text-lg 
          text-white 
          text-sm 
          transition 
          ease-in-out 
          duration-300 
          hover:bg-gray-700 
          flex-none
          font-semibold 
          font-phlatt-9000 
          focus-visible:outline 
          focus-visible:outline-2 
          focus-visible:outline-offset-2 
          focus-visible:outline-gray-900
          shadow-sm 
          "
          >
            50 {currency}
          </div>
        </div>
      </div>
      <button
        onClick={() => dispatch(setShowBanner(false))}
        type="button"
        className="-m-3 p-3 bg-transparent focus-visible:outline-offset-[-4px]"
      >
        <XMarkIcon className="sm:w-7 w-6 text-gray-900" aria-hidden="true" />
      </button>
    </div>
  )
}
