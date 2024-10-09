import { NextResponse } from 'next/server'
import { parseHeaders } from '../../lib/utils'

export async function POST(request: Request) {
  const { url, method, headers, body } = await request.json()
  
  try {
    const fetchOptions: RequestInit = {
      method,
      headers: (headers && Object.keys(headers).length > 0) ? headers : {},
    }

    if (method !== 'GET' && body) {
      fetchOptions.body = body
      // 如果存在body，则应该设置content-type
      fetchOptions.headers = { ...fetchOptions.headers, 'Content-Type': 'application/json' }
    }

    const response = await fetch(url, fetchOptions)
    const responseHeaders: Record<string, string> = {}
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value
    })

    const responseBody = await response.text()
    

    return NextResponse.json({
      status: response.status,
      headers: responseHeaders,
      body: responseBody,
    })
  } catch (error) {
    console.error('Error sending request:', error)
    return NextResponse.json({ error: 'Failed to send request' }, { status: 500 })
  }
}