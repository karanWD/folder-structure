import Head from 'next/head'
import Sidebar from "@/components/sidebar";
import Content from "@/components/content";


export default function Home() {
  return (
    <>
      <Head>
        <title>File Structure</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen relative bg-gray-800 w-full ">
        <Sidebar/>
        <Content/>

      </main>
    </>
  )
}
