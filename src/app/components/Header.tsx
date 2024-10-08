import { useTranslations } from 'next-intl'

export default function Header() {
  const t = useTranslations()
  return (
    <header className="bg-blue-600 text-white p-4">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
    </header>
  )
}