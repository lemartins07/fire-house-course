import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col">
      HOME PAGE
      <div>
        <Link href="/estudo.md">Dowload</Link>
      </div>
    </div>
  )
}
