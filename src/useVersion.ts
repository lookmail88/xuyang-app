import { useState, useEffect } from 'react'
import { API } from './api'

export function useVersion() {
  const [version, setVersion] = useState<string | null>(null)

  useEffect(() => {
    fetch(API.version)
      .then((res) => res.text())
      .then((data) => setVersion(data))
      .catch(() => {})
  }, [])

  return version
}
