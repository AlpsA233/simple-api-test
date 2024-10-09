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
    <>
      <main className="flex-1 flex flex-col p-8 max-w-6xl mx-auto">
        <div className="mb-8 flex justify-end">
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px] bg-white shadow-sm">
              <SelectValue placeholder={t('selectLanguage')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ja">日本語</SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">{t('apiTestTitle')}</h1>
          <RequestForm onResponse={setResponse} />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('responseTitle')}</h2>
          <ResponseDisplay response={response} />
        </div>
      </main>  
      <Toaster />
    </>
  )
}