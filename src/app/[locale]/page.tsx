'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import RequestForm from '../components/RequestForm'
import ResponseDisplay from '../components/ResponseDisplay'
import { Response } from '../lib/types'
import { Toaster } from "@/components/ui/toaster"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  const [response, setResponse] = useState<Response | null>(null)
  const [language, setLanguage] = useState(locale)
  const t = useTranslations()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setLanguage(locale)
  }, [locale])

  const handleLanguageChange = (newLanguage: string) => {
    const segments = pathname.split('/');
    segments[1] = newLanguage;
    const newPathname = segments.join('/');
    router.push(newPathname);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8 flex justify-end">
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px] bg-primary text-text border-2 border-secondary focus:border-text">
              <SelectValue placeholder={t('selectLanguage')} />
            </SelectTrigger>
            <SelectContent className="bg-primary text-text">
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ja">日本語</SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="bg-primary shadow-xl rounded-lg overflow-hidden">
          <div className="bg-secondary p-4">
            <h1 className="text-2xl font-bold text-text">{t('apiTestTitle')}</h1>
          </div>
          <div className="p-6">
            <RequestForm onResponse={setResponse} />
          </div>
        </div>
        {response && (
          <div className="mt-8 bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-4">
              <h2 className="text-xl font-semibold text-white">{t('responseTitle')}</h2>
            </div>
            <div className="p-6">
              <ResponseDisplay response={response} />
            </div>
          </div>
        )}
      </main>  
      <Toaster />
    </div>
  )
}