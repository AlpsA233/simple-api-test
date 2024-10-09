import { useTranslations } from 'next-intl'

export default function Header() {
  const t = useTranslations()
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <a className="flex items-center">
          <img src="/logo.svg" alt="SimpleApiTest Logo"  className="w-60 h-16" />
        </a>
        <nav>
          <ul className="flex space-x-4 text-white">
            <li><a href="#" className="hover:text-blue-200 transition-colors">{t('home')}</a></li>
            <li><a href="#" className="hover:text-blue-200 transition-colors">{t('about')}</a></li>
            <li><a href="#" className="hover:text-blue-200 transition-colors">{t('contact')}</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}