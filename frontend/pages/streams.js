import React from 'react'

export default function Streams() {
  const streams = [
    {
      id: 'yt1',
      title: 'Official YouTube Live - Sample Match Cam',
      provider: 'YouTube',
      url: 'https://www.youtube.com/watch?v=5qap5aO4i9A'
    },
    {
      id: 'twitch1',
      title: 'Twitch Channel Sample',
      provider: 'Twitch',
      url: 'https://www.twitch.tv/videos/1064007405'
    }
  ]

  const spotifyExample = {
    embedUrl: 'https://open.spotify.com/embed/track/3n3Ppam7vgaVa1iaRUc9Lp'
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Streams & Music</h1>

      <section style={{ marginTop: 16 }}>
        <h2>Music (Spotify embed)</h2>
        <iframe src={spotifyExample.embedUrl} width="300" height="80" frameBorder="0" allow="encrypted-media"></iframe>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Live streams (link-outs only)</h2>
        <p>These links point back to the original streamer. ERA does not host or redistribute streams.</p>
        <ul>
          {streams.map(s => (
            <li key={s.id} style={{ marginBottom: 12 }}>
              <a href={s.url} target="_blank" rel="noreferrer">{s.title} ({s.provider})</a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
