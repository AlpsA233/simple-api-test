import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations()
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto text-center">
        <p className="mb-2">{t('footerText')}</p>
        <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} SimpleApiTest. {t('allRightsReserved')}</p>
      </div>
    </footer>
  )
}