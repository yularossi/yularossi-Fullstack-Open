import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

afterEach(() => {
  cleanup()
  // reset any fetch mocks
  if (globalThis.fetch && globalThis.fetch.mockClear) globalThis.fetch.mockClear()
})
