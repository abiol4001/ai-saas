'use client'

import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web"

type Props = {}

const CrispChat = (props: Props) => {

    useEffect(()=> {
        Crisp.configure("ab287b2a-444c-405e-9325-5452a7cf3a4c")
    },[])
  return null
}

export default CrispChat