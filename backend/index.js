const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const { execFile } = require('child_process')

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

app.use(express.json())

// Simple CORS middleware so frontend can call this backend during development
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})

// Configurable cricket data provider proxy. If CRICKET_API_URL is set, backend will try to fetch from it.
const CRICKET_API_URL = process.env.CRICKET_API_URL || ''
const CRICKET_API_KEY = process.env.CRICKET_API_KEY || ''

async function fetchFromProvider(path) {
  if (!CRICKET_API_URL) return null
  try {
    const url = new URL(path, CRICKET_API_URL).toString()
    const headers = { Accept: 'application/json' }
    if (CRICKET_API_KEY) headers['Authorization'] = `Bearer ${CRICKET_API_KEY}`
    const resp = await fetch(url, { headers })
    if (!resp.ok) return null
    return await resp.json()
  } catch (err) {
    console.error('provider fetch error', err)
    return null
  }
}

app.get('/api/fixtures', async (req, res) => {
  // Try provider first, fall back to mock
  const provider = await fetchFromProvider('/fixtures')
  if (provider) return res.json(provider)

  res.json({ fixtures: [
    { id: 'match1', teams: 'Team A vs Team B', start: Date.now() + 3600_000 },
    { id: 'match2', teams: 'Team C vs Team D', start: Date.now() + 7200_000 }
  ]})
})

app.get('/api/match/:id', async (req, res) => {
  const { id } = req.params
  const provider = await fetchFromProvider(`/match/${id}`)
  if (provider) return res.json(provider)

  // Mock match detail
  res.json({ id, score: '120/3', overs: '15.0', innings: [ { team: 'Team A', runs: 120 } ] })
})

// Prediction endpoint - calls a C++ inference binary if configured, otherwise returns a mock prediction
app.post('/api/predict', async (req, res) => {
  const binPath = process.env.ERA_INFERENCE_BIN || ''
  const inputData = req.body || {}
  if (!binPath) {
    // Return a mock prediction
    return res.json({ prediction: { winProbabilityA: 0.63, winProbabilityB: 0.37 }, features: { recentForm: 0.6 } })
  }

  // Spawn the C++ binary and pass JSON via stdin
  const child = execFile(binPath, [], { maxBuffer: 10 * 1024 * 1024 }, (err, stdout, stderr) => {
    if (err) {
      console.error('inference binary error', err, stderr)
      return res.status(500).json({ error: 'inference failed' })
    }
    try {
      const out = JSON.parse(stdout)
      return res.json(out)
    } catch (e) {
      console.error('invalid inference output', e)
      return res.status(502).json({ error: 'invalid inference output' })
    }
  })
  // write input JSON to stdin of child process
  child.stdin.write(JSON.stringify(inputData))
  child.stdin.end()
})

io.of('/live').on('connection', (socket) => {
  console.log('client connected to /live')

  socket.on('join', (data) => {
    const { matchId } = data || {}
    if (!matchId) return
    socket.join(matchId)
    console.log(`socket joined room ${matchId}`)
    // Send current state once
    socket.emit('snapshot', { matchId, score: '120/3', overs: '15.0' })
  })

  // Simulate ball events per room every 5 seconds (for demo only)
  const iv = setInterval(() => {
    // emit to all connected rooms - in a real system you'd emit to specific match rooms
    const event = { matchId: 'match1', ball: '14.3', outcome: '4', timestamp: Date.now() }
    io.of('/live').to('match1').emit('ball', event)
  }, 5000)

  socket.on('disconnect', () => {
    console.log('socket disconnected')
    clearInterval(iv)
  })
})

const PORT = process.env.PORT || 4000
server.listen(PORT, () => console.log(`Backend mock API listening on ${PORT}`))
