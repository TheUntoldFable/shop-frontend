/* eslint-disable react/prop-types */
import { Analytics } from '@vercel/analytics/react'

function Layout(props) {
  const Component = props.component
  return (
    <>
      <Component {...props.pageProps} />
      {process.env.NODE_ENV !== 'development' && <Analytics />}
    </>
  )
}

export default Layout
