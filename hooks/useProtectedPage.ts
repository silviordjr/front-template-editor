import { useEffect } from 'react'
import { useRouter } from 'next/dist/client/router';

const useProtectedPage = () => {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            router.push('/login')
        }
    }, [router])
}

export default useProtectedPage