'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Response } from '../lib/types'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ResponseDisplayProps {
  response: Response | null
}

export default function ResponseDisplay({ response }: ResponseDisplayProps) {
  const t = useTranslations()
  const [currentResponse, setCurrentResponse] = useState<Response | null>(response)

  useEffect(() => {
    setCurrentResponse(response)
  }, [response])

  if (!currentResponse) {
    return <div className="text-gray-500">{t('waitingResponse')}</div>
  }

  const isSuccess = currentResponse.status >= 200 && currentResponse.status < 300
  const statusColor = isSuccess ? 'text-green-600' : 'text-red-600'

  const isHtml = currentResponse.headers['content-type']?.includes('text/html')

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold">{t('statusCode')}:</h2>
        <p className={`text-2xl font-bold ${statusColor}`}>{currentResponse.status}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">{t('responseHeaders')}:</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">{t('key')}</TableHead>
              <TableHead>{t('value')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(currentResponse.headers).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell className="font-medium">{key}</TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">{t('responseBody')}:</h2>
        {isHtml ? (
          <div className="border rounded p-4 overflow-auto" style={{ height: '50vh' }}>
            <iframe
              srcDoc={currentResponse.body}
              className="w-full h-full"
              sandbox="allow-same-origin"
              title="Response Content"
            />
          </div>
        ) : (
          <pre className="bg-gray-100 p-4 rounded overflow-auto" style={{ maxHeight: '50vh' }}>
            {currentResponse.body}
          </pre>
        )}
      </div>
    </div>
  )
}