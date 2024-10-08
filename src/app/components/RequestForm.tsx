'use client'

import { useState } from 'react'
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

interface RequestFormProps {
  onResponse: (response: Response) => void
}

type HeaderParam = { key: string; value: string }

export default function RequestForm({ onResponse }: RequestFormProps) {
  const [url, setUrl] = useState('')
  const [method, setMethod] = useState('GET')
  const [headers, setHeaders] = useState<HeaderParam[]>([{ key: '', value: '' }])
  const [queryParams, setQueryParams] = useState<HeaderParam[]>([{ key: '', value: '' }])
  const [body, setBody] = useState('')
  const { toast } = useToast()

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
        title: "请求发送成功",
        description: `状态码: ${data.status}`,
      })
    } catch (error) {
      console.error('Error sending request:', error)
      toast({
        title: "请求发送失败",
        description: "发生错误，请检查控制台以获取更多信息",
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
        placeholder="输入URL"
        required
      />
      <Select value={method} onValueChange={setMethod}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="选择请求方法" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="GET">GET</SelectItem>
          <SelectItem value="POST">POST</SelectItem>
          <SelectItem value="PUT">PUT</SelectItem>
          <SelectItem value="DELETE">DELETE</SelectItem>
        </SelectContent>
      </Select>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">查询参数</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>键</TableHead>
              <TableHead>值</TableHead>
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
        <Button type="button" onClick={() => addRow(setQueryParams)} className="mt-2"><Plus size={16} className="mr-2" /> 添加参数</Button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">请求头</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>键</TableHead>
              <TableHead>值</TableHead>
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
        <Button type="button" onClick={() => addRow(setHeaders)} className="mt-2"><Plus size={16} className="mr-2" /> 添加请求头</Button>
      </div>

      <Textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="输入请求体"
      />
      <Button type="submit">发送请求</Button>
    </form>
  )
}