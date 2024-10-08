'use client'

import { useState, useEffect } from 'react'
import { Response } from '../lib/types'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ResponseDisplayProps {
  response: Response | null
}

export default function ResponseDisplay({ response }: ResponseDisplayProps) {
  const [currentResponse, setCurrentResponse] = useState<Response | null>(response)

  useEffect(() => {
    setCurrentResponse(response)
  }, [response])

  if (!currentResponse) {
    return <div className="text-gray-500">等待响应...</div>
  }

  const isSuccess = currentResponse.status >= 200 && currentResponse.status < 300
  const statusColor = isSuccess ? 'text-green-600' : 'text-red-600'

  const isHtml = currentResponse.headers['content-type']?.includes('text/html')

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold">状态码：</h2>
        <p className={`text-2xl font-bold ${statusColor}`}>{currentResponse.status}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">响应头：</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">键</TableHead>
              <TableHead>值</TableHead>
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
        <h2 className="text-lg font-semibold mb-2">响应体：</h2>
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