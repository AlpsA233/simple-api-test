'use client'

import { useState } from 'react'
import RequestForm from './components/RequestForm'
import ResponseDisplay from './components/ResponseDisplay'
import { Response } from './lib/types'
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  const [response, setResponse] = useState<Response | null>(null)

  return (
    <>
      <main className="flex-1 flex flex-col p-4 max-w-6xl mx-auto">
        <div className="mb-8">
          <RequestForm onResponse={setResponse} />
        </div>
        <div>
          <ResponseDisplay response={response} />
        </div>
      </main>  
      <Toaster />
    </>
  )
}