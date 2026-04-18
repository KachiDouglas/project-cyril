import { getSessionUserFromCookies } from '@/lib/security/session'
import HomeTemplate from '@/modules/home/templates'
import { cookies } from 'next/headers'

const HomePage = async () => {
  const sessionUser = getSessionUserFromCookies(await cookies())

  return <HomeTemplate sessionUser={sessionUser} />
}

export default HomePage
