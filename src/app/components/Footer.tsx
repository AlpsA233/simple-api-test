import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function Footer() {
  const t = useTranslations()
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">SimpleApiTest</h2>
            <p className="text-gray-400">{t('footerText')}</p>
          </div>
          <div className="w-full md:w-1/3 text-center mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link href={`/${t('locale')}`} className="hover:text-purple-300 transition-colors">{t('home')}</Link></li>
              <li><Link href={`/${t('locale')}/about`} className="hover:text-purple-300 transition-colors">{t('about')}</Link></li>
              <li><Link href={`/${t('locale')}/contact`} className="hover:text-purple-300 transition-colors">{t('contact')}</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} SimpleApiTest. {t('allRightsReserved')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}