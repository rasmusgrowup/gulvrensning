import type { Metadata } from 'next'
import type { Viewport } from 'next'
import { Open_Sans, DM_Sans, Poppins, Mulish, Manrope, Schibsted_Grotesk, Jost, Inter, Rubik, Merriweather } from 'next/font/google'

import { cn } from 'src/utilities/cn'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import styles from './Layout.module.scss'
import { getServerSideURL } from '@/utilities/getURL'

const opensans = Open_Sans({
  subsets: ['latin'],
  display: 'swap'
})

const dmsans = DM_Sans({
  subsets: ['latin'],
  display: 'swap'
})

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

const mulish = Mulish({
  subsets: ['latin'],
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap'
})

const schibsted = Schibsted_Grotesk({
  subsets: ['latin'],
  display: 'swap'
})

const jost = Jost({
  subsets: ['latin'],
  display: 'swap'
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
})

const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap'
})

const merriweather = Merriweather({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '700', '900'],
})

export const viewport: Viewport = {
  themeColor: 'rgb(51, 149, 255)',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={dmsans.className} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className={styles.body}>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          <LivePreviewListener />
          <main className={styles.main}>
            {children}
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
