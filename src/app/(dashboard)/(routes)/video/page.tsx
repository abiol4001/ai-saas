"use client"
import Heading from '@/components/Heading'
import { Music, Video } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { formSchema } from './constants'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Empty from '@/components/Empty'
import Loader from '@/components/Loader'
import { useProModal } from '@/hooks/useProModal'
import toast from 'react-hot-toast'

type Props = {}

const VideoPage = (props: Props) => {
    const [video, setVideo] = useState<string>()
    const router = useRouter()
    const proModal = useProModal()
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setVideo(undefined)

            const response = await axios.post("/api/video", values)
            console.log(JSON.stringify(response.data))
            setVideo(response.data[0])
            form.reset()
        } catch (error: any) {
            if (error?.response?.status === 403) {
                proModal.onOpen()
            }
            else {
                toast.error("Something went wrong")
            }
            console.log(error)
        } finally {
            //helps to get the recent update to server components
            router.refresh()
        }
    }
    return (
        <div>
            <Heading title="Video Generation" description="Turn your prompt into video" icon={Video} iconColor='text-orange-700' bgColor='bg-orange-700/10' />
            <div className='px-4 lg:px-8'>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'>
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className='col-span-12 lg:col-span-10'>
                                        <FormControl className='m-0 p-0'>
                                            <Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent' placeholder="Jaguar hunting for preys" {...field} disabled={isLoading} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className='col-span-12 lg:col-span-2' disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className='space-y-4 lg:space-y-6'>
                    {isLoading && (
                        <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
                            <Loader />
                        </div>
                    )}
                    {!video && !isLoading && (
                        <Empty label='No video generated.' />
                    )}
                    {video && (
                        <video controls className='w-full aspect-video rounded-lg border bg-black mt-8'>
                            <source src={video} />
                        </video>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VideoPage