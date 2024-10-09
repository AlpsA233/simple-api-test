import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function Header() {
  const t = useTranslations()
  return (
    <header className="bg-primary text-text shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo.svg" alt="SimpleApiTest Logo" className="w-60 h-16" />
        </Link>
        <nav>
          <ul className="flex space-x-6 text-lg">
            <li><Link href={`/${t('locale')}`} className="hover:text-secondary transition-colors">{t('home')}</Link></li>
            <li><Link href={`/${t('locale')}/about`} className="hover:text-secondary transition-colors">{t('about')}</Link></li>
            <li><Link href={`/${t('locale')}/contact`} className="hover:text-secondary transition-colors">{t('contact')}</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}