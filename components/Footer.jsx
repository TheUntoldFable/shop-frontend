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
    <footer className="flex flex-col items-center justify-center gap-2 bg-offWhite text-darkBlack md:flex-row">
      <Image
        alt="img"
        width={400}
        height={400}
        className="size-24 sm:size-40"
        src="/logo-black.png"
      />
      <div className="pb-8 md:min-w-[55%]">
        <Wrapper className="flex flex-col justify-between gap-12 pt-10 md:flex-row">
          {/* LEFT START */}
          <div className="flex shrink-0 flex-col gap-3">
            <Link
              href="/contact"
              className="cursor-pointer text-center font-semibold text-sm uppercase text-darkBlack md:text-left"
            >
              {t('become_partner')}
            </Link>
          </div>
          <div className="flex flex-col gap-[50px] md:flex-row md:gap-[75px] lg:gap-[100px]">
            {/* MENU START */}
            {/* MENU END */}

            {/* NORMAL MENU START */}
            <div className="flex shrink-0 gap-6 md:gap-10 lg:gap-12">
              {/* MENU START */}
              <div className="mx-auto flex flex-col gap-3 text-center md:mx-0 md:text-left">
                <p className="font-semibold text-sm uppercase text-darkBlack">
                  {t('help')}
                </p>
                <Link
                  href="/contact"
                  className="
                  cursor-pointer
                  text-[12px]
                  text-darkBlack
                  transition
                  duration-300
                  ease-in-out
                  hover:text-darkBlack/[0.5]"
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
          <div className="flex justify-center gap-4 md:justify-start">
            <div
              onClick={() =>
                window.open('https://www.instagram.com/troykawear/')
              }
              className="
              flex
              size-10
              cursor-pointer
              items-center
              justify-center
              rounded-full
              bg-darkBlack/[0.25]
              text-black
              transition
              duration-300
              ease-in-out hover:text-darkBlack/[0.5]"
            >
              <FaInstagram size={20} />
            </div>
          </div>
          {/* RIGHT END */}
        </Wrapper>
        <Wrapper className="mt-5 flex flex-col justify-between gap-[10px] md:flex-row md:gap-12">
          {/* LEFT START */}
          <p
            className="
          mt-auto
          cursor-pointer
          text-center
           text-[12px]
           text-darkBlack/[0.8]
           transition
           duration-300
           ease-in-out
           hover:text-darkBlack/[0.5]
           md:text-left"
          >
            {t('copyright')}
          </p>
          {/* LEFT END */}

          {/* RIGHT START */}
          <div
            className="
          flex
          flex-col
          flex-wrap
          justify-center
          gap-2
          text-center
          md:gap-1
          md:text-right"
          >
            <a
              id="refund"
              href={policies[locale].refund}
              target="_blank"
              rel="noopener noreferrer"
              className="
              cursor-pointer
              text-[12px]
              text-darkBlack
              transition
              duration-300
              ease-in-out
              hover:text-darkBlack/[0.5]"
            >
              {t('refund_policy')}
            </a>
            <a
              id="terms"
              href={policies[locale].terms}
              target="_blank"
              rel="noopener noreferrer"
              className="
              cursor-pointer
              text-[12px]
              text-darkBlack
              transition
              duration-300
              ease-in-out
              hover:text-darkBlack/[0.5]"
            >
              {t('terms_use')}
            </a>
            <a
              id="privacy"
              href={policies[locale].privacy}
              target="_blank"
              rel="noopener noreferrer"
              className="
              cursor-pointer
              text-[12px]
              text-darkBlack
              transition
              duration-300
              ease-in-out
              hover:text-darkBlack/[0.5]"
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
