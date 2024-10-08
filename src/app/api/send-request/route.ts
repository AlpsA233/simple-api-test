import { NextResponse } from 'next/server'
import { parseHeaders } from '../../lib/utils'

export async function POST(request: Request) {
  const { url, method, headers, body } = await request.json()
  
  try {
    const fetchOptions: RequestInit = {
      method,
      headers: (headers && Object.keys(headers).length > 0) ? parseHeaders(headers) : undefined,
    }

    if (method !== 'GET' && body) {
      fetchOptions.body = body
    }

    const response = await fetch(url, fetchOptions)
    console.log('response', response);
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