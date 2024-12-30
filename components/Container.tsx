import Banner from './Banner'
import Footer from './Footer'
import Navigation from './navigation/Navigation'

interface ContainerProps {
  className?: string;
  children: JSX.Element | JSX.Element[];
}

export default function Container({ className, children }: ContainerProps) {
  return (
    <div className="between flex h-screen flex-1 flex-col justify-between ">
      <Navigation />
      <div className={`${className ?? 'mt-12 md:mt-44'}`}>{children}</div>
      <Banner />
      <Footer />
    </div>
  )
}
