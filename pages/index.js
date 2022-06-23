import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1>Welcome to my webapp</h1>
      <Link href="/signin"><a>Sign in to your webapp</a></Link>
    </>
  )
}
