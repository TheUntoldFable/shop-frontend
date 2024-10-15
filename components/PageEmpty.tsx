import {
  faCartShopping,
  faHeartCrack,
  faRoadBarrier
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

type EmptyIcon = 'heart' | 'cart' | 'blog';

interface EmptyPageProps {
  icon: EmptyIcon;
  description: string;
  title: string;
}

const PageEmpty = ({ icon, description, title }: EmptyPageProps) => {
  const { t } = useTranslation([ 'buttons' ])
  return (
    <div className="flex-[2] flex flex-col items-center pb-[50px]">
      {iconsList[icon]}
      <span className="text-offWhite text-xl font-bold">{title}</span>
      <span className="text-offWhite text-center mt-4 max-w-md">
        {description}
      </span>
      <Link
        href="/"
        className="rounded-full py-4 px-8 bg-gradient-to-r from-[#0ba360] to-[#3cba92] text-offWhite font-medium transition ease-in-out active:scale-95 mb-3 hover:opacity-75 mt-8"
      >
        {t('continue', { ns: 'buttons' })}
      </Link>
    </div>
  )
}

export default PageEmpty

const iconsList: Record<EmptyIcon, JSX.Element | undefined> = {
  heart: (
    <FontAwesomeIcon
      color="#EEEEEE"
      icon={faHeartCrack}
      className="my-10 w-20 md:w-40 flex flex-1"
    />
  ),
  cart: (
    <FontAwesomeIcon
      color="#EEEEEE"
      icon={faCartShopping}
      className="my-10 w-20 md:w-40 flex flex-1"
    />
  ),
  blog: (
    <FontAwesomeIcon
      color="#EEEEEE"
      icon={faRoadBarrier}
      className="my-10 w-20 md:w-40 flex flex-1"
    />
  )
}