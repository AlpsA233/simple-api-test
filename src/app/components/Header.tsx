'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { LanguagesIcon } from 'lucide-react'

export default function Header() {
  const t = useTranslations()
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (newLanguage: string) => {
    const segments = pathname.split('/');
    segments[1] = newLanguage;
    const newPathname = segments.join('/');
    router.push(newPathname);
  }

  const languageList = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'ja', label: '日本語', flag: '🇯🇵' },
    { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
  ]

  return (
    <header className="bg-primary text-text shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={`/${t('locale')}`} className="flex items-center space-x-2">
          <img src="/logo.svg" alt="SimpleApiTest Logo" className="w-60 h-16" />
        </Link>
        <nav className="flex items-center space-x-6">
          <ul className="flex space-x-6 text-lg">
            <li><Link href={`/${t('locale')}`} className="hover:text-secondary transition-colors">{t('home')}</Link></li>
            <li><Link href={`/${t('locale')}/about`} className="hover:text-secondary transition-colors">{t('about')}</Link></li>
            <li><Link href={`/${t('locale')}/contact`} className="hover:text-secondary transition-colors">{t('contact')}</Link></li>
          </ul>
          <Popover>
            <PopoverTrigger>
              <Button variant="ghost"><LanguagesIcon className='mr-2 w-4 h-4' /></Button>
            </PopoverTrigger>
            <PopoverContent className='bg-primary w-32 rounded-xl shadow-neutral-600'>
                {languageList.map((language) => (
                  <div>
                    <Button className='w-full text-black' variant="link" key={language.value} onClick={() => handleLanguageChange(language.value)}>
                      <p className='mr-1'>{language.flag}</p>{language.label}
                    </Button>
                  </div>
                ))}
            </PopoverContent>
          </Popover>
        </nav>
      </div>
    </header>
  )
}