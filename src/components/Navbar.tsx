import { UserButton } from '@clerk/nextjs'
import MobileSidebar from './MobileSidebar'
import { getApiLimit } from '@/lib/api-limit'

type Props = {}

const Navbar = async (props: Props) => {

  const apiLimitCount = await getApiLimit()
  return (
    <div className='flex items-center p-4 '>
      <MobileSidebar apiLimitCount={apiLimitCount} />
        <div className='flex w-full justify-end'>
            <UserButton afterSignOutUrl='/'/>
        </div>
    </div>
  )
}

export default Navbar