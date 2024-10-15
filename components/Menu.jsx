/* eslint-disable react/prop-types */
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { BsChevronDown } from 'react-icons/bs' // eslint-disable-next-line react/prop-types

// eslint-disable-next-line react/prop-types
const Menu = ({ showCatMenu, setShowCatMenu, categories }) => {
  const { t } = useTranslation('nav')
  const { locale } = useRouter()

  const isDev = process.env.NODE_ENV !== 'development'

  const navItems = [
    { id: 1, name: t('home'), url: `/${locale}` },
    { id: 2, name: t('about'), url: `${locale}/about` },
    { id: 3, name: t('category'), subMenu: true },
    { id: 4, name: t('contact'), url: `${locale}/contact` }
    /*{ id: 5, name: t("blog"), url: `${locale}/blogs` },*/
  ]

  return (
    <ul
      className="
    hidden
    md:flex
    items-center
    justify-center
    gap-6
    font-normal
    text-lg
    "
    >
      {navItems.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {item?.subMenu ? (
              <li
                className="hover:bg-offWhite
                hover:text-darkBlack
                font-normal
                cursor-pointer
                py-1.5
                px-2
                transition
                ease-in-out
                duration-300
                rounded-sm
                flex
                items-center
                gap-2
                relative"
                onMouseEnter={() => setShowCatMenu(true)}
                onMouseLeave={() => setShowCatMenu(false)}
              >
                {item.name}
                <BsChevronDown size={14} />
                {showCatMenu && (
                  <ul
                    className="
                  bg-offWhite
                  flex
                  flex-col
                  gap-2
                  transition
                  ease-in-out
                  duration-300
                  absolute
                  top-9
                  left-0
                  min-w-[250px]
                  py-1.5
                  px-2
                  text-darkBlack
                  shadow-lg"
                  >
                    {categories &&
                      categories?.map(({ attributes: c, id }) => {
                        return (
                          <Link
                            replace
                            key={id}
                            href={`/category/${c.slug}`}
                            onClick={() => setShowCatMenu(false)}
                          >
                            <li
                              className="
                          flex
                          justify-between
                          items-center
                          p-3
                          transition
                          ease-in-out
                          duration-300
                          hover:bg-darkBlack/[0.05]
                          shadow-sm
                          rounded-sm"
                            >
                              {c.name}
                              <span className="opacity-50 text-sm">
                                {`(${c.products.data.length})`}
                              </span>
                            </li>
                          </Link>
                        )
                      })}
                  </ul>
                )}
              </li>
            ) : (
              <li
                className="cursor-pointer
                py-1.5
                px-2
                shadow-lg
                transition
                ease-in-out
                duration-300
                hover:bg-offWhite
                hover:text-darkBlack
                rounded-sm
                "
              >
                <Link replace href={`/${item?.url}`}>
                  {item.name}
                </Link>
              </li>
            )}
          </React.Fragment>
        )
      })}
    </ul>
  )
}

export default Menu
