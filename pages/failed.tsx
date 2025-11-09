import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'

import Wrapper from '@/components/Wrapper'


const Failed = () => {
  const { t } = useTranslation([ 'order' ])


  return (
    <div className="min-h-[650px] flex items-center">
      <Wrapper>
        <div className="max-w-[600px] rounded-lg p-5 border text-offWhite border-offWhite mx-auto flex flex-col">
          <div className="text-2xl font-bold text-offWhite">
            {t('title_failed')}
          </div>
          <div className="text-base mt-5 text-offWhite">{t('description')}</div>
          <div className="underline text-offWhite">info.troyka@gmail.com</div>

          <Link
            href="/"
            className="font-bold mt-5 bg-gradient-to-r from-[#0ba360] to-[#3cba92] p-2 w-52 hover:opacity-75 text-center rounded-md text-offWhite"
          >
            {t('continue_shopping')}
          </Link>
        </div>
      </Wrapper>
    </div>
  )
}

export default Failed

export async function getStaticProps(ctx) {
  const { locale } = ctx

  return {
    props: {
      ...(await serverSideTranslations(locale, [ 'order','banner' ]))
    }
  }
}
