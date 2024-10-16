import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaInstagram } from 'react-icons/fa'

import { policies } from '@/helpers/policies'

import Wrapper from './Wrapper'


const Footer = () => {
  const { locale } = useRouter()
  const { t } = useTranslation('footer')
  return (
    <footer className="flex justify-center md:flex-row flex-col items-center gap-2 bg-offWhite text-[#181516]">
      <Image
        alt="img"
        width={600}
        height={600}
        className="sm:w-24 md:w-32 w-20 mt-6 md:m-0 h-full"
        src="/logo-black.png"
      />
      <div className="md:min-w-[55%] pb-8">
        <Wrapper className="flex justify-between flex-col md:flex-row gap-12 pt-10">
          {/* LEFT START */}
          <div className="flex flex-col gap-3 shrink-0">
            <Link
              href="/contact"
              className="text-darkBlack text-center md:text-left font-semibold uppercase text-sm cursor-pointer"
            >
              {t('become_partner')}
            </Link>
          </div>
          <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] flex-col md:flex-row">
            {/* MENU START */}
            {/* MENU END */}

            {/* NORMAL MENU START */}
            <div className="flex gap-6 md:gap-10 lg:gap-12 shrink-0">
              {/* MENU START */}
              <div className="flex flex-col gap-3 md:mx-0 md:text-left text-center mx-auto">
                <p className="text-darkBlack font-semibold uppercase text-sm">
                  {t('help')}
                </p>
                <Link
                  href="/contact"
                  className="
                  text-[12px] 
                  text-darkBlack 
                  hover:text-darkBlack/[0.5]
                  transition 
                  ease-in-out 
                  duration-300 
                  cursor-pointer"
                >
                  {t('contact_us')}
                </Link>
              </div>
              {/* MENU END */}
            </div>
            {/* NORMAL MENU END */}
          </div>
          {/* LEFT END */}

          {/* RIGHT START */}
          <div className="flex gap-4 justify-center md:justify-start">
            <div
              onClick={() =>
                window.open('https://www.instagram.com/troykawear/')
              }
              className="
              w-10 
              h-10 
              rounded-full 
              bg-darkBlack/[0.25]   
              transition 
              ease-in-out 
              duration-300
              flex  
              items-center 
              justify-center 
              text-black hover:text-darkBlack/[0.5] cursor-pointer"
            >
              <FaInstagram size={20} />
            </div>
          </div>
          {/* RIGHT END */}
        </Wrapper>
        <Wrapper className="flex justify-between mt-5 flex-col md:flex-row gap-[10px] md:gap-12">
          {/* LEFT START */}
          <p className="
          text-[12px] 
          text-darkBlack/[0.8]  
          hover:text-darkBlack/[0.5]
           cursor-pointer 
           mt-auto 
           text-center
           transition 
           ease-in-out 
           duration-300  
           md:text-left">
            {t('copyright')}
          </p>
          {/* LEFT END */}

          {/* RIGHT START */}
          <div className="
          flex 
          flex-col 
          gap-2 
          md:gap-1 
          text-center 
          md:text-right 
          flex-wrap 
          justify-center">
            <a
              id="refund"
              href={policies[locale].refund}
              target="_blank"
              rel="noopener noreferrer"
              className="
              text-[12px] 
              text-darkBlack 
              hover:text-darkBlack/[0.5] 
              transition 
              ease-in-out 
              duration-300 
              cursor-pointer"
            >
              {t('refund_policy')}
            </a>
            <a
              id="terms"
              href={policies[locale].terms}
              target="_blank"
              rel="noopener noreferrer"
              className="
              text-[12px] 
              text-darkBlack 
              hover:text-darkBlack/[0.5]
              transition 
              ease-in-out 
              duration-300 
              cursor-pointer"
            >
              {t('terms_use')}
            </a>
            <a
              id="privacy"
              href={policies[locale].privacy}
              target="_blank"
              rel="noopener noreferrer"
              className="
              text-[12px] 
              text-darkBlack 
              hover:text-darkBlack/[0.5]
              transition 
              ease-in-out 
              duration-300 
              cursor-pointer"
            >
              {t('privacy_policy')}
            </a>
          </div>
          {/* RIGHT END */}
        </Wrapper>
      </div>
      {/* <Image width={600} height={600} className=" w-90 h-10" src="/troyka-eye.png"/> */}
    </footer>
  )
}

export default Footer
