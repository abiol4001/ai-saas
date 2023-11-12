import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Button variant="secondary">
        <Link href="/sign-in">
          Log in
        </Link>
      </Button>
      <Button variant="outline">
      <Link href="/sign-up">
        Reg
      </Link>
      </Button>
    </div>
  )
}
