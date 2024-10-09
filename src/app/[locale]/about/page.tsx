'use client'
import { useTranslations } from 'next-intl'

export default function About() {
  const t = useTranslations('About')

  return (
    <div className="container mx-auto px-4 py-8 flex-grow">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
      <div className="prose max-w-none">
        <p>{t('description')}</p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">{t('features')}</h2>
        <ul>
          <li>{t('feature1')}</li>
          <li>{t('feature2')}</li>
          <li>{t('feature3')}</li>
        </ul>
      </div>
    </div>
  )
}