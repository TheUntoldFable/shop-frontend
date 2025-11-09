/* eslint-disable react/prop-types */
import { faCartShopping, faCreditCard, faTruckArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo, useEffect, useMemo, useState } from 'react'

import SelectAddress from '@/components/cart/SelectAddress'
import CartItem from '@/components/CartItem'
import Container from '@/components/Container'
import Divider from '@/components/Divider'
import Exclaimer from '@/components/Exclaimer'
import AddressForm from '@/components/profile/AddressForm'
import BillingAddressForm from '@/components/profile/BillingAddressForm'
import CredentialsForm from '@/components/profile/CredentialsForm'
import OfficeAddressForm from '@/components/profile/OfficeAddressForm'
import Wrapper from '@/components/Wrapper'
import { useAppDispatch } from '@/helpers/store'
import { handlePayment } from '@/pages/api/checkout/payments'
import { getUser } from '@/store/contexts/userContext'
import { useAppSelector } from '@/store/hooks'
import { selectBillingAddress, selectOfficeAddress, selectUserAddress, selectUserCredentials } from '@/store/userSlice'

const Cart = (props) => {
  const user = props.user.username
  const router = useRouter()
  const { locale } = router

  const { t } = useTranslation([ 'cart', 'buttons' ])
  const dispatch = useAppDispatch()
  const [ showError, setShowError ] = useState(false)
  const addressInfo = useAppSelector(selectUserAddress)
  const officeAddressInfo = useAppSelector(selectOfficeAddress)
  const credentialsInfo = useAppSelector(selectUserCredentials)
  const billingAddressInfo = useAppSelector(selectBillingAddress)
  const { cartItems } = useAppSelector((state) => state?.cart)
  const [ deliveryOption, setDeliveryOption ] = useState('home')
  const [ isDisabled, setDisabled ] = useState(true)

  const deliveryPrice = deliveryOption === 'office' ? 5 : 7.5
  const currency = locale !== 'bg' ? 'BGN' : 'ЛВ'

  const subTotal = useMemo(() => {
    return cartItems.reduce((total, val) => total + val?.price, 0)
  }, [ cartItems ])

  const shouldPreventProceed = () => {
    if (!credentialsInfo) return true
    if (deliveryOption === 'home' && !addressInfo) return true
    return deliveryOption === 'office' && !officeAddressInfo
  }

  useEffect(() => {
    setDisabled(shouldPreventProceed())
  }, [ deliveryOption, addressInfo, officeAddressInfo, credentialsInfo ])

  const calculateTotal = () => {
    if (locale === 'bg') {
      return subTotal >= 50 ? subTotal : subTotal + deliveryPrice
    } else {
      return subTotal >= 25 ? subTotal : subTotal + deliveryPrice
    }
  }

  const handleDeliveryOption = (option) => {
    if (!option) return
    setDeliveryOption(option)
  }

  const makePayment = async (event) => {
    const paymentData = {
      paymentMethod: event.target.name,
      products: cartItems,
      credentialsInfo,
      billingAddressInfo,
      addressInfo: deliveryOption !== 'home' ? officeAddressInfo : addressInfo,
      user,
      totalPrice: calculateTotal()
    }

    dispatch(handlePayment(paymentData))
  }

  console.log(cartItems,'cartItems')

  return (
    <Container>
      <div className="w-full py-12">
        <Wrapper>
          {cartItems && cartItems.length > 0 && (
            <>
              {/* HEADING AND PARAGRAPH START */}
              <div className="mx-auto max-w-[800px] text-center">
                <div className="font-semibold text-[28px] leading-tight text-offWhite md:text-[34px]">
                  {t('your_cart')}
                </div>
              </div>
              {/* HEADING AND PARAGRAPH END */}

              {/* CART CONTENT START */}
              <div className="flex flex-col lg:flex-row">
                {/* CART ITEMS START */}
                <div className="flex-1">
                  <div className="font-bold text-lg text-offWhite">
                    {t('products', { ns: 'cart' })}
                  </div>
                  <div className="mb-4">
                    {cartItems.map((item) => (
                      <CartItem key={item.id} data={item} />
                    ))}
                  </div>

                  <div className="flex flex-col gap-6">
                    <SelectAddress
                      onSelect={handleDeliveryOption}
                      selected={deliveryOption}
                    />
                    <div className="flex flex-col gap-6">
                      <CredentialsForm />
                      <BillingAddressForm />
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <AddressForm disabled={deliveryOption !== 'home'} />
                        <OfficeAddressForm
                          disabled={deliveryOption !== 'office'}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* CART ITEMS END */}

                {/* SUMMARY START */}
                <div className="flex-[1]">
                  <div className="font-bold text-lg text-offWhite">
                    {t('summary')}
                  </div>

                  <div className="bg-#393646/[0.05] my-5 rounded-xl p-5">
                    <div className="flex justify-between">
                      <div className="text-md font-normal uppercase text-offWhite md:text-lg">
                        {t('subtotal')}
                      </div>
                      <div className="text-md font-bold text-offWhite md:text-lg">
                        {subTotal} {currency}
                      </div>
                    </div>
                    <Divider />
                    <div className="flex justify-between">
                      <div className="text-md font-normal uppercase text-offWhite md:text-lg">
                        {t('shipping')}
                      </div>
                      <div
                        className={`text-md font-bold md:text-lg ${
                          (locale === 'bg' && subTotal >= 50) ||
                          (locale !== 'bg' && subTotal >= 25)
                            ? 'line-through'
                            : ''
                        }`}
                      >
                        {deliveryPrice} {currency}
                      </div>
                    </div>
                    <Divider />
                    <div className="flex justify-between">
                      <div className="text-md font-bold uppercase text-offWhite md:text-lg">
                        {t('total')}
                      </div>
                      <div className="text-md font-bold uppercase text-offWhite md:text-lg">
                        {calculateTotal()} {currency}
                      </div>
                    </div>
                    <Divider />

                    <Exclaimer />
                    <div className="md:text-md mt-5 py-5 text-sm text-offWhite">
                      <div className=" mb-6 flex flex-row items-center gap-2 rounded-md text-xl text-offWhite">
                        <Image
                          className="w-20"
                          alt="img"
                          width={600}
                          height={600}
                          src="/speedy-logo.jpeg"
                        />
                      </div>
                      {t('shipping_description')}
                    </div>
                    {/* BUTTON START */}
                    <div className="flex flex-row justify-between space-x-3">
                      <button
                        disabled={isDisabled}
                        name="arrive"
                        className={`w-full rounded-md py-4 transition ease-in-out ${
                          isDisabled
                            ? 'disabled pointer-events-none'
                            : 'bg-gradient-to-r from-[#0ba360] to-[#3cba92]'
                        } text-md mb-3 flex items-center justify-center gap-2 font-medium text-offWhite hover:opacity-75 active:scale-95`}
                        onClick={(e) => {
                          if (isDisabled) setShowError(true)
                          else makePayment(e)
                        }}
                      >
                        {t('pay_arrival', { ns: 'buttons' })}
                        <FontAwesomeIcon icon={faTruckArrowRight} />
                      </button>
                      <button
                        name="card"
                        disabled={isDisabled}
                        className={`w-full rounded-md py-4 transition ease-in-out ${
                          isDisabled
                            ? 'disabled pointer-events-none'
                            : 'bg-gradient-to-r from-[#0ba360] to-[#3cba92]'
                        } text-md mb-3 flex items-center justify-center gap-2 font-medium text-offWhite hover:opacity-75 active:scale-95`}
                        onClick={(e) => {
                          if (isDisabled) setShowError(true)
                          else makePayment(e)
                        }}
                      >
                        {t('pay_card', { ns: 'buttons' })}
                        <FontAwesomeIcon icon={faCreditCard} />
                      </button>
                    </div>
                  </div>
                  {showError && (
                    <div className="mt-1 text-errorYellow">
                      {t('address_error', { ns: 'forms' })}
                    </div>
                  )}
                  {/* BUTTON END */}
                </div>
                {/* SUMMARY END */}
              </div>
              {/* CART CONTENT END */}
            </>
          )}

          {/* This is empty screen */}
          {cartItems.length < 1 && (
            <div className="flex flex-1 flex-col items-center">
              <FontAwesomeIcon
                color="#EEEEEE"
                icon={faCartShopping}
                className="flex w-20 flex-1 pb-4 md:w-40"
              />
              <span className="font-bold text-xl text-offWhite">
                {t('empty')}
              </span>
              <span className="mt-4 max-w-md text-center text-offWhite">
                {t('empty_description')}
              </span>
              <Link
                href="/"
                className="
                mb-3
                mt-8
                rounded-full
              bg-gradient-to-r from-[#0ba360] to-[#3cba92]
              px-8
                py-4
                font-semibold
                text-offWhite
                transition
                ease-in-out
                hover:opacity-75
                active:scale-95"
              >
                {t('continue', { ns: 'buttons' })}
              </Link>
            </div>
          )}
        </Wrapper>
      </div>
    </Container>
  )
}

export default memo(Cart)

export async function getServerSideProps(ctx) {
  const { locale } = ctx
  const user = getUser(ctx)

  return {
    props: {
      user,
      ...(await serverSideTranslations(locale, [
        'cart',
        'footer',
        'nav',
        'buttons',
        'forms',
        'common',
        'banner'
      ]))
    }
  }
}
