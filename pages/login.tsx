import Image from 'next/image';
import logoCasal from '../img/casal_logo.png'
import useForm from './../hooks/useForm';
import Head from "next/head";
import visibilityOn from '../img/visibility_on.png'
import visibilityOff from '../img/visibility_off.png'
import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';

export default function Login () {
    const [form, onChange, clear] = useForm({ email: "", password: "" })
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const [invalidLogin, setInvalidLogin] = useState(false)

    const router = useRouter()

    const onSubmitLogin = async (event: any) => {
        event.preventDefault()
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL

        const payload = {
            email: form.email,
            password: form.password
        }

        const content = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(payload)
        }


        const login = await fetch(`${baseUrl}/login`, content)
        const response = await login.json()

        if (response.token){
            localStorage.setItem("token", response.token)
            clear()
            router.push('/')
        }else {
            setInvalidLogin(true)
        }
    }

    const changePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility)
    }

    const renderVisibility = () => {
        if (passwordVisibility) {
            return (
                <div className='pr-4 cursor-pointer opacity-30 flex items-center hover:opacity-60' onClick={() => changePasswordVisibility()}>
                    <Image
                        src={visibilityOff}
                        alt={'esconder senha'}
                        layout="fixed"
                        unoptimized={true}
                        height='30'
                        width='30'
                        className=""
                    />
                </div>
            )
        } else {
            return (
                <div className='pr-4 cursor-pointer opacity-30 flex items-center hover:opacity-60' onClick={() => changePasswordVisibility()}>
                    <Image
                        src={visibilityOn}
                        alt={'ver senha'}
                        layout="fixed"
                        unoptimized={true}
                        height='30'
                        width='30'
                        className=""
                    />
                </div>
            )
        }
    }

    return (
        <>
            <Head>
                <title>Gerador de Documentos | Casal | Login</title>
                <meta name="description" content="Intranet da Companhia de Saneamento de Alagoas" />
                <link rel="icon" href="/casal_favicon.png" />
            </Head>
            <main className="px-4 lg:px-0 max-w-screen-xl mx-auto my-10 flex flex-col items-center min-h-screen xl:py-20">
                <form className=" shadow-xl rounded-xl xl:w-1/3 flex flex-col items-center justify-center min-h-fit px-8 pb-8" onSubmit={onSubmitLogin}>
                    <div className="mt-8">
                        <Image
                            src={logoCasal}
                            alt={'Logo Casal'}
                            layout="fixed"
                            unoptimized={true}
                            height='110'
                            width='240'
                            className=""
                        />
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <input type="text" name="email" value={form.email} onChange={onChange} placeholder="Email" required id="email" className='h-16 w-full rounded-xl mt-8 bg-gray-200 px-4' />
                        <div className='h-16 w-full rounded-xl mt-2 bg-gray-200 flex items-center justify-between'>
                            <input type={passwordVisibility ? 'text' : 'password'} name="password" value={form.password} onChange={onChange} placeholder="Senha" required id="password" className='h-16 w-full rounded-xl bg-gray-200 px-4' />
                            {renderVisibility()}
                        </div>
                        <button className='mt-8 h-16 w-full px-4 bg-gray-200 hover:bg-gray-400 rounded-xl' type='submit'>Entrar</button>
                        {
                            invalidLogin &&
                            <p className="font-mono text-xs font-light text-red-400 mt-4">Usuário ou senha incorreto. Tente Novamente.</p>
                        }
                    </div>
                </form>
            </main>
        </>
    )
}