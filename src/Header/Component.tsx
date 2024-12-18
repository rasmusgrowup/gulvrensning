import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { HeaderClient } from './Component.client'
import type { Header } from '@/payload-types'

export async function Header({ hasHero }: { hasHero: boolean }) {
  const header: Header = await getCachedGlobal('header', 1)()

  return <HeaderClient header={header} hasHero={hasHero}/>
}