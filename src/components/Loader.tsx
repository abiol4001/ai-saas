import { Loader2 } from 'lucide-react'
import React from 'react'

type Props = {}

const Loader = (props: Props) => {
  return (
    <div className='h-full flex flex-col justify-center items-center'>
        <div className='w-10 h-10 animate-spin relative'>
            <Loader2 className='w-full h-full' />
        </div>
        <p className='text-sm text-muted-foreground'>AI is thinking...</p>
    </div>
  )
}

export default Loader