'use client'

import { useState } from 'react'
import { Response } from '../lib/types'

export default function ResponseDisplay() {
  const [response, setResponse] = useState<Response | null>(null)

  // 这个函数将被用来更新响应数据
  const updateResponse = (newResponse: Response) => {
    setResponse(newResponse)
  }

  if (!response) {
    return <div className="text-gray-500">等待响应...</div>
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">状态码：</h2>
        <p>{response.status}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold">响应头：</h2>
        <pre className="bg-gray-100 p-2 rounded">
          {JSON.stringify(response.headers, null, 2)}
        </pre>
      </div>
      <div>
        <h2 className="text-lg font-semibold">响应体：</h2>
        <pre className="bg-gray-100 p-2 rounded">
          {JSON.stringify(JSON.parse(response.body), null, 2)}
        </pre>
      </div>
    </div>
  )
}