import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function Header() {
  const t = useTranslations()
  return (
    <header className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo.svg" alt="SimpleApiTest Logo" className="w-60 h-16" />
        </Link>
        <nav>
          <ul className="flex space-x-6 text-lg">
            <li><Link href="/" className="hover:text-yellow-300 transition-colors">{t('home')}</Link></li>
            <li><Link href="/about" className="hover:text-yellow-300 transition-colors">{t('about')}</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-300 transition-colors">{t('contact')}</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}