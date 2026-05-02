const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

// Simple CORS middleware so frontend can call this backend during development
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})

app.get('/api/fixtures', (req, res) => {
  res.json({ fixtures: [{ id: 'match1', teams: 'A vs B', start: Date.now() }] })
})

app.get('/api/match/:id', (req, res) => {
  res.json({ id: req.params.id, score: '120/3', overs: '15.0' })
})

// Joke proxy endpoint - fetches a random joke from icanhazdadjoke.com
app.get('/api/joke', async (req, res) => {
  try {
    const resp = await fetch('https://icanhazdadjoke.com/', {
      headers: { Accept: 'application/json', 'User-Agent': 'ERA-Joke-Generator/1.0' }
    })
    if (!resp.ok) return res.status(502).json({ error: 'upstream error' })
    const data = await resp.json()
    // data has { id, joke }
    res.json({ joke: data.joke })
  } catch (err) {
    console.error('joke fetch error', err)
    res.status(500).json({ error: 'failed to fetch joke' })
  }
})

io.of('/live').on('connection', (socket) => {
  console.log('client connected to /live')
  // Emit a mock event every 5 seconds
  const iv = setInterval(() => {
    socket.emit('ball', { matchId: 'match1', ball: '14.3', outcome: '4' })
  }, 5000)

  socket.on('disconnect', () => {
    clearInterval(iv)
  })
})

const PORT = process.env.PORT || 4000
server.listen(PORT, () => console.log(`Backend mock API listening on ${PORT}`))
