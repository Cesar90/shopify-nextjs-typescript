import Nav from "./Nav"
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout ({ children }: LayoutProps) {
  return (
    <div className="flex flex-col justify-between main-h-screen">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  )
}