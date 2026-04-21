import { useEffect, useState } from 'react'

/**
 * Debounces string updates for smoother UI (e.g. catalog filtering).
 * Clears immediately when the value is empty or whitespace-only so the UI resets without delay.
 */
export function useDebouncedString(value: string, delayMs: number): string {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    if (value.trim() === '') {
      setDebounced('')
      return
    }
    const t = window.setTimeout(() => setDebounced(value), delayMs)
    return () => window.clearTimeout(t)
  }, [value, delayMs])

  return debounced
}
