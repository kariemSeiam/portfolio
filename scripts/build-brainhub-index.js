/**
 * build-brainhub-index.js
 * 
 * Pre-processes all BrainHub markdown files into a searchable JSON index.
 * Run as part of the build process.
 * 
 * Usage: node scripts/build-brainhub-index.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BRAINHUB_DIR = path.resolve(__dirname, '..', 'BrainHub')
const OUTPUT_FILE = path.resolve(__dirname, '..', 'src', 'data', 'brainhub-index.json')

const categoryLabels = {
  '00-AI-INTEGRATION': 'AI Integration',
  '01-Core': 'Core Identity',
  '02-Knowledge-Domains': 'Knowledge Domains',
  '03-Projects-Deep-Dive': 'Projects Deep Dive',
  '04-Tech-Stack': 'Tech Stack',
  '05-Career-Journey': 'Career Journey',
  '06-Context-Maps': 'Context Maps',
  '07-Insights': 'Insights',
  '08-Future-Vision': 'Future Vision',
}

function extractTitle(content, filePath) {
  const headingMatch = content.match(/^#\s+(.+)/m)
  if (headingMatch) return headingMatch[1].trim()
  const filename = path.basename(filePath).replace(/\.md$/, '')
  return filename.replace(/^[\d-]+/, '').replace(/[-_]/g, ' ').trim()
}

function extractSnippet(content) {
  const lines = content.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('>') && 
        !trimmed.startsWith('---') && !trimmed.startsWith('```') && 
        !trimmed.startsWith('|') && !trimmed.startsWith('╔') && 
        !trimmed.startsWith('*') && trimmed.length > 30) {
      return trimmed.slice(0, 250)
    }
  }
  return ''
}

function extractCategory(filePath) {
  const relative = path.relative(BRAINHUB_DIR, filePath)
  const match = relative.match(/([\d]+-[^/\\]+)/)
  if (match) {
    return categoryLabels[match[1]] || match[1]
  }
  return 'General'
}

function walkDir(dir) {
  const results = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...walkDir(fullPath))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(fullPath)
    }
  }
  return results
}

// Build the index
const files = walkDir(BRAINHUB_DIR)
const docs = []

for (const filePath of files) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const relativePath = path.relative(path.resolve(__dirname, '..'), filePath)
    const id = relativePath.replace(/[^a-zA-Z0-9]/g, '_')

    docs.push({
      id,
      path: '/' + relativePath.replace(/\\/g, '/'),
      title: extractTitle(content, filePath),
      snippet: extractSnippet(content),
      category: extractCategory(filePath),
    })
  } catch (err) {
    console.warn(`Warning: Could not read ${filePath}: ${err.message}`)
  }
}

docs.sort((a, b) => {
  if (a.category !== b.category) return a.category.localeCompare(b.category)
  return a.title.localeCompare(b.title)
})

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(docs, null, 2), 'utf-8')
console.log(`✓ BrainHub index built: ${docs.length} documents → ${OUTPUT_FILE}`)
