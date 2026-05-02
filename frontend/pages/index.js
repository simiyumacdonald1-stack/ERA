# Add a link to the fixtures, match, jokes, streams and home in the frontend index
import React from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <div style={{padding: 24}}>
      <h1>ERA — sports, AI prediction & streams</h1>
      <p>Frontend skeleton. Connect to backend at <code>/api</code>.</p>
      <ul>
        <li><Link href="/fixtures"><a>Fixtures</a></Link></li>
        <li><Link href="/jokes"><a>Random Jokes</a></Link></li>
        <li><Link href="/streams"><a>Streams & Music</a></Link></li>
      </ul>
    </div>
  )
}
