"use client"
import Heading from '@/components/Heading'
import { Code } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { formSchema } from './constants'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { ChatCompletionRequestMessage } from 'openai-edge'
import { useState } from 'react'
import Empty from '@/components/Empty'
import Loader from '@/components/Loader'
import { cn } from '@/lib/utils'
import UserAvatar from '@/components/UserAvatar'
import BotAvatar from '@/components/BotAvatar'
import ReactMarkdown from 'react-markdown'
import { useProModal } from '@/hooks/useProModal'
import toast from 'react-hot-toast'

type Props = {}

const CodePage = (props: Props) => {
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])
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
            // console.log(values.prompt)
            const userMessage: ChatCompletionRequestMessage = {
                role: "user",
                content: values.prompt
            }
            const newMessages = [...messages, userMessage]

            const response = await axios.post("/api/code", {
                messages: newMessages
            })
            console.log(JSON.stringify(response.data))
            setMessages((current) => [...current, userMessage, response.data])
            form.reset()
        } catch (error: any) {
            if(error?.response?.status === 403) {
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
            <Heading title="Code Generation" description="Generate code using descriptive text" icon={Code} iconColor='text-green-600' bgColor='bg-green-600/10' />
            <div className='px-4 lg:px-8'>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'>
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className='col-span-12 lg:col-span-10'>
                                        <FormControl className='m-0 p-0'>
                                            <Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent' placeholder="Create a React functional Component" {...field} disabled={isLoading} />
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
                    {messages.length === 0 && !isLoading && (
                        <Empty label='No code generated.' />

                    )}
                    <div className='flex flex-col-reverse gap-y-4'>
                        {messages.map((message, index) => (
                            <div key={index} className={cn("p-8 w-full flex items-center gap-x-8 rounded-lg",
                            message.role === "user" ? "bg-white border border-black/10" : "bg-muted")}>
                                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                                    <ReactMarkdown
                                    components={{
                                        pre: ({node, ...props}) => (
                                            <div className='overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg'>
                                                <pre {...props} />
                                            </div>
                                        ),
                                        code: ({node, ...props}) => (
                                            <code className='bg-black/10 rounded-lg p-1' {...props} />
                                        )
                                    }}
                                    className="text-sm leading-7 overflow-hidden"
                                    >
                                        {message.content || ""}
                                    </ReactMarkdown>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodePage