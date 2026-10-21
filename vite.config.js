import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'

const previewHeaders = Object.fromEntries(
  readFileSync(new URL('./public/_headers', import.meta.url), 'utf8')
    .split(/\r?\n/)
    .filter((line) => line.startsWith('  '))
    .map((line) => {
      const separator = line.indexOf(':')
      return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()]
    }),
)

export default defineConfig({
  plugins: [react()],
  base: '/',
  preview: { headers: previewHeaders },
})
