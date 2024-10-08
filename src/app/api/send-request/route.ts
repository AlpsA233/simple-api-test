import { NextResponse } from 'next/server'
import { parseHeaders } from '../../lib/utils'

export async function POST(request: Request) {
  const { url, method, headers, body } = await request.json()

  try {
    const response = await fetch(url, {
      method,
      headers: parseHeaders(headers),
      body: method !== 'GET' ? body : undefined,
    })

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