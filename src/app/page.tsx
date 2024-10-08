import RequestForm from './components/RequestForm'
import ResponseDisplay from './components/ResponseDisplay'

export default function Home() {
  return (
    <main className="flex-1 flex">
      <div className="flex-1 p-4">
        <RequestForm />
      </div>
      <div className="flex-1 p-4">
        <ResponseDisplay />
      </div>
    </main>
  )
}