export function parseHeaders(headersString: string): Record<string, string> {
  return headersString.split('\n').reduce((acc: Record<string, string>, header: string) => {
    const [key, value] = header.split(':')
    if (key && value) {
      acc[key.trim()] = value.trim()
    }
    return acc
  }, {})
}