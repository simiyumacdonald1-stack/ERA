import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import io from 'socket.io-client'

let socket

export default function MatchPage() {
  const router = useRouter()
  const { id } = router.query
  const [match, setMatch] = useState(null)
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (!id) return
    async function load() {
      try {
        const res = await fetch(`http://localhost:4000/api/match/${id}`)
        const data = await res.json()
        setMatch(data)
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [id])

  useEffect(() => {
    // connect to socket.io live namespace
    socket = io('http://localhost:4000/live')
    socket.on('connect', () => {
      console.log('connected to live')
      if (id) socket.emit('join', { matchId: id })
    })
    socket.on('snapshot', (s) => {
      console.log('snapshot', s)
      setEvents((ev) => [ { type: 'snapshot', data: s }, ...ev ])
    })
    socket.on('ball', (b) => {
      console.log('ball event', b)
      setEvents((ev) => [ { type: 'ball', data: b }, ...ev ])
    })

    return () => {
      if (socket) socket.disconnect()
    }
  }, [id])

  return (
    <div style={{ padding: 24 }}>
      <h1>Match {id}</h1>
      {match ? (
        <div>
          <p>Score: {match.score} — Overs: {match.overs}</p>
        </div>
      ) : (
        <p>Loading match...</p>
      )}

      <h2>Live events</h2>
      <div style={{ maxHeight: 400, overflow: 'auto', border: '1px solid #eee', padding: 12 }}>
        {events.map((e, idx) => (
          <div key={idx} style={{ marginBottom: 8 }}>
            <strong>{e.type}</strong>: {JSON.stringify(e.data)}
          </div>
        ))}
      </div>

    </div>
  )
}
