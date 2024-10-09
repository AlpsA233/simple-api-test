import { useTranslations } from 'next-intl'

export default function Header() {
  const t = useTranslations()
  return (
    <header className="bg-blue-600 p-4">
      <a><img src="/logo.svg" className='w-60 h-16'/></a>
    </header>
  )
}