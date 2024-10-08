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

export default function RequestForm() {
  const [url, setUrl] = useState('')
  const [method, setMethod] = useState('GET')
  const [headers, setHeaders] = useState('')
  const [body, setBody] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // 这里我们将调用服务器端API来发送请求
    const response = await fetch('/api/send-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, method, headers, body }),
    })
    const data = await response.json()
    // 处理响应数据...
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
      <Textarea
        value={headers}
        onChange={(e) => setHeaders(e.target.value)}
        placeholder="输入请求头（每行一个）"
      />
      <Textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="输入请求体"
      />
      <Button type="submit">发送请求</Button>
    </form>
  )
}