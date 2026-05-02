import React, { useState } from 'react'

export default function Jokes() {
  const [joke, setJoke] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchJoke() {
    setLoading(true)
    setError(null)
    try {
      // Adjust the URL if your backend runs elsewhere
      const res = await fetch('http://localhost:4000/api/joke')
      if (!res.ok) throw new Error('Network response was not ok')
      const data = await res.json()
      setJoke(data.joke)
    } catch (err) {
      setError('Failed to fetch joke')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Random Joke Generator</h1>
      <p>Click the button to fetch a random joke from an external API (icanhazdadjoke).</p>
      <button onClick={fetchJoke} disabled={loading} style={{ padding: '8px 12px', fontSize: 16 }}>
        {loading ? 'Loading...' : 'Get a joke'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {joke && (
        <div style={{ marginTop: 16, padding: 12, border: '1px solid #eee', borderRadius: 6 }}>
          <p>{joke}</p>
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        <p>Note: Backend proxy is used to avoid CORS issues in development.</p>
      </div>
    </div>
  )
}
