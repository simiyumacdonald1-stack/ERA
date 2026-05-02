import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Fixtures() {
  const [fixtures, setFixtures] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('http://localhost:4000/api/fixtures')
        const data = await res.json()
        setFixtures(data.fixtures || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div style={{ padding: 24 }}>
      <h1>Fixtures</h1>
      {loading && <p>Loading...</p>}
      {!loading && fixtures.length === 0 && <p>No fixtures found.</p>}
      <ul>
        {fixtures.map((f) => (
          <li key={f.id} style={{ marginBottom: 12 }}>
            <Link href={`/match/${f.id}`}><a>{f.teams} — {new Date(f.start).toLocaleString()}</a></Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
