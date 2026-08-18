import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
  // Clear all global fetch mocks
  if (globalThis.fetch && globalThis.fetch.mockClear) {
    globalThis.fetch.mockClear()
  }
})
