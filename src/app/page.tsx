'use client'

import { useState } from 'react'
import RequestForm from './components/RequestForm'
import ResponseDisplay from './components/ResponseDisplay'
import { Response } from './lib/types'

export default function Home() {
  const [response, setResponse] = useState<Response | null>(null)

  return (
    <main className="flex-1 flex">
      <div className="flex-1 p-4">
        <RequestForm onResponse={setResponse} />
      </div>
      <div className="flex-1 p-4">
        <ResponseDisplay response={response} />
      </div>
    </main>
  )
}