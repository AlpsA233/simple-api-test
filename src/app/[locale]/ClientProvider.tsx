'use client'

import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'

type ClientProviderProps = {
    children: React.ReactNode
    locale: string
    messages: AbstractIntlMessages
}
  
export default function ClientProvider({ children, locale, messages }: ClientProviderProps) {
    return (
        <NextIntlClientProvider locale={locale} messages={messages} timeZone="America/New_York">
        {children}
        </NextIntlClientProvider>
    )
}
