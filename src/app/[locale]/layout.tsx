import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import {unstable_setRequestLocale} from 'next-intl/server'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SimpleApiTest',
  description: 'A simple web-based tool for API testing',
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ja' }, { locale: 'de' }]
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const locale = params.locale || 'en';
  unstable_setRequestLocale(locale);
  let messages;
  try {
    
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error('Error loading messages:', error);
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}