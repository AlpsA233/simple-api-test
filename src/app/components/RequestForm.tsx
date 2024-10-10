'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2 } from 'lucide-react'
import { Response } from '../lib/types'
import { useToast } from '@/hooks/use-toast'
import dynamic from 'next/dynamic'

const JsonEditor = dynamic(() => import('./JsonEditor'), { ssr: false })

interface RequestFormProps {
  onResponse: (response: Response) => void
}

type HeaderParam = { key: string; value: string }

export default function RequestForm({ onResponse }: RequestFormProps) {
  const t = useTranslations()
  
  const [url, setUrl] = useState('')
  const [method, setMethod] = useState('GET')
  const [headers, setHeaders] = useState<HeaderParam[]>([{ key: '', value: '' }])
  const [queryParams, setQueryParams] = useState<HeaderParam[]>([{ key: '', value: '' }])
  const [body, setBody] = useState('{\n\t"example": "Paste your body JSON here"\n}')
  const { toast } = useToast()
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);

  useEffect(() => {
    setIsEditorLoaded(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const headersObject = headers.reduce((acc, { key, value }) => {
        if (key) acc[key] = value
        return acc
      }, {} as Record<string, string>)

      const queryString = queryParams
        .filter(({ key }) => key)
        .map(({ key, value }) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&')

      const fullUrl = `${url}${queryString ? `?${queryString}` : ''}`

      const response = await fetch('/api/send-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: fullUrl, method, headers: headersObject, body }),
      })
      const data = await response.json()
      onResponse(data)
      toast({
        title: t('requestSent'),
        description: `${t('statusCode')}: ${data.status}`,
      })
    } catch (error) {
      console.error('Error sending request:', error)
      toast({
        title: t('requestFailed'),
        description: t('errorCheckConsole'),
        variant: "destructive",
      })
    }
  }

  const addRow = (setter: React.Dispatch<React.SetStateAction<HeaderParam[]>>) => {
    setter(prev => [...prev, { key: '', value: '' }])
  }

  const removeRow = (index: number, setter: React.Dispatch<React.SetStateAction<HeaderParam[]>>) => {
    setter(prev => prev.filter((_, i) => i !== index))
  }

  const updateRow = (index: number, field: 'key' | 'value', value: string, setter: React.Dispatch<React.SetStateAction<HeaderParam[]>>) => {
    setter(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder={t('url')}
        required
        className="bg-primary text-text border-secondary"
      />
      <Select value={method} onValueChange={setMethod}>
        <SelectTrigger className="w-full bg-primary text-text border-secondary">
          <SelectValue placeholder={t('method')} />
        </SelectTrigger>
        <SelectContent className="bg-primary text-text rounded-md">
          <SelectItem value="GET">GET</SelectItem>
          <SelectItem value="POST">POST</SelectItem>
          <SelectItem value="PUT">PUT</SelectItem>
          <SelectItem value="DELETE">DELETE</SelectItem>
        </SelectContent>
      </Select>
      
      <div>
        <h3 className="text-lg font-semibold mb-2 text-text">{t('queryParams')}</h3>
        <Table className="bg-primary text-text">
          <TableHeader>
            <TableRow>
              <TableHead className="text-text">{t('key')}</TableHead>
              <TableHead className="text-text">{t('value')}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {queryParams.map((param, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input value={param.key} onChange={(e) => updateRow(index, 'key', e.target.value, setQueryParams)} />
                </TableCell>
                <TableCell>
                  <Input value={param.value} onChange={(e) => updateRow(index, 'value', e.target.value, setQueryParams)} />
                </TableCell>
                <TableCell>
                  <Button type="button" variant="ghost" onClick={() => removeRow(index, setQueryParams)}><Trash2 size={16} /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button type="button" onClick={() => addRow(setQueryParams)} className="ml-2 mt-2  bg-gray-900 hover:bg-gray-700 text-white rounded-md"><Plus size={16} className="mr-2" /> {t('addParam')}</Button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">{t('headers')}</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('key')}</TableHead>
              <TableHead>{t('value')}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {headers.map((header, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input value={header.key} onChange={(e) => updateRow(index, 'key', e.target.value, setHeaders)} />
                </TableCell>
                <TableCell>
                  <Input value={header.value} onChange={(e) => updateRow(index, 'value', e.target.value, setHeaders)} />
                </TableCell>
                <TableCell>
                  <Button type="button" variant="ghost" onClick={() => removeRow(index, setHeaders)}><Trash2 size={16} /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button type="button" onClick={() => addRow(setHeaders)} className="ml-2 mt-2  bg-gray-900 hover:bg-gray-700 text-white rounded-md"><Plus size={16} className="mr-2" /> {t('addHeader')}</Button>
      </div>

      {isEditorLoaded ? (
        <JsonEditor value={body} onChange={setBody} />
      ) : (
        <div>{t('loadingEditor')}</div>
      )}
      <Button type="submit" className='ml-2 mt-2 bg-gray-900 hover:bg-gray-700 text-white rounded-md'>{t('send')}</Button>
    </form>
  )
}