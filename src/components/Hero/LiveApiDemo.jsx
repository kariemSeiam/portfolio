import { useState, useEffect, useRef } from 'react'

/**
 * LiveApiDemo — Proof in motion.
 *
 * Shows a real-looking Geolink API call being made.
 * The visitor watches the request happen. That's the proof.
 * Not a screenshot. Not a mockup. A live demonstration.
 */

const DEMO_SEQUENCE = [
  { delay: 0,    type: 'req',  text: '$ curl https://api.geolink-eg.com/v1/geocode \\' },
  { delay: 80,   type: 'req',  text: '     -H "X-API-Key: gk_••••••••••••" \\' },
  { delay: 160,  type: 'req',  text: '     -d "q=Cairo, Egypt"' },
  { delay: 400,  type: 'dim',  text: '' },
  { delay: 450,  type: 'dim',  text: 'Connecting to api.geolink-eg.com ...' },
  { delay: 820,  type: 'dim',  text: 'HTTP/1.1 200 OK · 47ms · 1 credit' },
  { delay: 900,  type: 'dim',  text: '' },
  { delay: 950,  type: 'json', text: '{' },
  { delay: 990,  type: 'json', text: '  "status": "success",' },
  { delay: 1030, type: 'json', text: '  "lat": 30.0444,' },
  { delay: 1070, type: 'json', text: '  "lng": 31.2357,' },
  { delay: 1110, type: 'key',  text: '  "address": ', suffix: '"Cairo, Egypt",' },
  { delay: 1150, type: 'json', text: '  "confidence": 0.97,' },
  { delay: 1190, type: 'key',  text: '  "credits_remaining": ', suffix: '2999' },
  { delay: 1230, type: 'json', text: '}' },
  { delay: 1400, type: 'dim',  text: '' },
  { delay: 1450, type: 'stat', text: '5,200,000 requests this month · 52 active clients' },
]

export default function LiveApiDemo() {
  const [lines, setLines] = useState([])
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const containerRef = useRef(null)
  const timersRef = useRef([])

  const runDemo = () => {
    if (running) return
    setRunning(true)
    setDone(false)
    setLines([])
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []

    DEMO_SEQUENCE.forEach(({ delay, type, text, suffix }) => {
      const t = setTimeout(() => {
        setLines(prev => [...prev, { type, text, suffix }])
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
      }, delay)
      timersRef.current.push(t)
    })

    const totalDuration = DEMO_SEQUENCE[DEMO_SEQUENCE.length - 1].delay + 600
    const finishT = setTimeout(() => {
      setRunning(false)
      setDone(true)
    }, totalDuration)
    timersRef.current.push(finishT)
  }

  // Auto-run once on mount
  useEffect(() => {
    const t = setTimeout(runDemo, 800)
    return () => {
      clearTimeout(t)
      timersRef.current.forEach(clearTimeout)
    }
  }, [])

  const colorClass = {
    req:  'api-line-req',
    dim:  'api-line-dim',
    json: 'api-line-json',
    key:  'api-line-key',
    stat: 'api-line-stat',
  }

  return (
    <div className="api-demo-shell">
      {/* Title bar */}
      <div className="api-demo-bar">
        <div className="api-demo-dots">
          <span className="api-demo-dot api-demo-dot-r" />
          <span className="api-demo-dot api-demo-dot-a" />
          <span className="api-demo-dot api-demo-dot-g" />
        </div>
        <span className="api-demo-title">geolink-eg.com — live</span>
        <button
          onClick={runDemo}
          disabled={running}
          className="api-demo-replay"
          aria-label="Replay demo"
        >
          {running ? '●' : '↻'}
        </button>
      </div>

      {/* Output */}
      <div className="api-demo-output" ref={containerRef}>
        {lines.map((line, i) => (
          <div key={i} className={`api-line ${colorClass[line.type] || ''}`}>
            {line.type === 'key' ? (
              <>
                <span className="api-key-name">{line.text}</span>
                <span className="api-key-value">{line.suffix}</span>
              </>
            ) : (
              line.text
            )}
          </div>
        ))}
        {running && <span className="api-cursor">█</span>}
      </div>
    </div>
  )
}
