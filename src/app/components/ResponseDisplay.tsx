'use client'

import { useState, useEffect } from 'react'
import { Response } from '../lib/types'

interface ResponseDisplayProps {
  response: Response | null
}

export default function ResponseDisplay( props: ResponseDisplayProps) {
  const [response, setResponse] = useState<Response | null>(props.response || null)

  // 这个函数将被用来更新响应数据
  const updateResponse = (newResponse: Response) => {
    setResponse(newResponse)
  }

  useEffect(() => {
    // 这里可以添加逻辑来监听或获取响应数据
    console.log('props', props);
    if (props.response) {
      updateResponse(props.response);
    }
  }, [props])

  if (!response) {
    return <div className="text-gray-500">等待响应...</div>
  }

  const isHtml = response.headers['content-type']?.includes('text/html')

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">状态码：</h2>
        <p>{response.status}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold">响应头：</h2>
        <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-40">
          {JSON.stringify(response.headers, null, 2)}
        </pre>
      </div>
      <div>
        <h2 className="text-lg font-semibold">响应体：</h2>
        {isHtml ? (
          <div className="border rounded p-4 overflow-auto max-h-96">
            <iframe
              srcDoc={response.body}
              className="w-full h-full"
              sandbox="allow-same-origin"
              title="Response Content"
            />
          </div>
        ) : (
          <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-96">
            {response.body}
          </pre>
        )}
      </div>
    </div>
  )
}