import { Inter } from 'next/font/google'
import "./globals.css"
import Navbar from "./Components/Navbar"
import ParticleBackground from "./Components/ParticleBackground"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Kelechi Ugoh",
  description: "Welcome to my portfolio",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
<body className={`${inter.className} relative min-h-screen `}>
        <ParticleBackground className='' />
        <Navbar />
        <div className="relative z-10 cc-blur">
          {children}
        </div>
      </body>
    </html>
  )
}

