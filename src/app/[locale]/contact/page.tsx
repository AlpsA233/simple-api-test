'use client'
import { useTranslations } from 'next-intl'

export default function Contact() {
  const t = useTranslations('Contact')

  return (
    <div className="container mx-auto px-4 py-8 flex-grow">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
      <div className="prose max-w-none">
        <p>{t('description')}</p>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">{t('contactInfo')}</h2>
          <p>{t('email')}: contact@simpleapitest.com</p>
          <p>{t('phone')}: +1 (123) 456-7890</p>
          <p>{t('address')}: 123 API Street, Test City, 12345</p>
        </div>
      </div>
    </div>
  )
}