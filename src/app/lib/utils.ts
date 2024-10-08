export function parseHeaders(headersString: string | undefined): Record<string, string> {
  if (!headersString) return {}
  return headersString.split('\n').reduce((acc: Record<string, string>, header: string) => {
    const [key, value] = header.split(':')
    if (key && value) {
      acc[key.trim()] = value.trim()
    }
    return acc
  }, {})
}