import Footer from "./Footer";
import Header from "./Header";

interface ContainerProps {
  className?: string;
  children: JSX.Element | JSX.Element[];
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="flex flex-1 flex-col justify-between min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
