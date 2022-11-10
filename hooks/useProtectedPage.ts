import { useEffect } from 'react'
import { useRouter } from 'next/dist/client/router';

const useProtectedPage = () => {
    const router = useRouter()

    const validateToken = async (token: string | undefined) => {
        if (typeof token === 'undefined'){
            return {
                validToken: false
            }
        }

        const content = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            method: 'GET',
          }

          const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/token`, content)
          const response = await data.json()

          return response
    }

    useEffect(() => {
        const token = localStorage.getItem('token')?.toString()

        validateToken(token)
        .then((res) => {
            if (!res.validToken){
                router.push('/login')
            }
        })
        
    }, [router])
}

export default useProtectedPage