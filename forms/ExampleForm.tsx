import useForm from "../hooks/useForm"
import { useState } from 'react';
import word from '../img/word_icon.png'
import Image from "next/image";


export default function ExampleForm (props: any) {
    const [created, setCreated] = useState(false)
    const [file, setFile] = useState<any>({})
    const token = localStorage.getItem('token')

    const [form, onchange, clear] = useForm({
        first_name: '',
        last_name: '',
        phone: '',
        description: '', 
        departament: props.departament
    })
    
    const onSubmitForm = async (e: any) => {
        e.preventDefault()

        const body = {
            ...form,
            name: props.fileName,
            protected: props.protectedFile,
        }

        const content = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            method: 'POST',
            body: JSON.stringify(body)
        }

        const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/files/${props.model}`, content)
        const response = await data.json()

        if (response){
            setCreated(true)
            setFile(response.file)
        }
    }

    return (
        <>
        { !created ?
        <form onSubmit={onSubmitForm} className="ml-4 mt-8 flex flex-wrap gap-8">
            <div className="flex items-center justify-center">
                <label htmlFor="first_name" className="font-mono text-md font-light">Primeiro Nome: </label>
                <input type="text" name="first_name" id="first_name" value={form.first_name} onChange={onchange} className='bg-gray-200 w-44 h-6 rounded-lg ml-4' required />
            </div>

            <div className="flex items-center justify-center">
                <label htmlFor="last_name" className="font-mono text-md font-light">Ultimo Nome: </label>
                <input type="text" name="last_name" id="last_name" value={form.last_name} onChange={onchange} className='bg-gray-200 w-44 h-6 rounded-lg ml-4' required />
            </div>

            <div className="flex items-center justify-center">
                <label htmlFor="phone" className="font-mono text-md font-light">Telefone: </label>
                <input type="tel" name="phone" id="phone" value={form.phone} onChange={onchange} className='bg-gray-200 w-44 h-6 rounded-lg ml-4' required />
            </div>

            <div className="flex items-center justify-center w-full">
                <label htmlFor="departament" className="font-mono text-md font-light">Departamento: </label>
                <input type="tel" name="departament" id="departament" value={form.departament} onChange={onchange} className='bg-gray-200 w-full h-6 rounded-lg ml-4' required />
            </div>

            <div className="flex items-center justify-center">
                <label htmlFor="description" className="font-mono text-md font-light">Descrição: </label>
                <textarea name="description" id="description" value={form.description} onChange={onchange} className='bg-gray-200 rounded-lg ml-4' rows={4} cols={100} required />
            </div>

            <div className="w-full flex items-center justify-center">
                <button className="bg-gray-200 hover:bg-gray-400 font-mono text-md font-light py-4 px-8 rounded-lg" type='submit'>Enviar</button>
            </div>
        </form>
        :
        <div className="flex flex-col items-center justify-center ml-4 mt-8 gap-8 w-full">
            <h1 className='text-2xl font-mono antialiased font-semibold ml-4'>Tudo certo com seu arquivo!</h1>
            <p className="font-mono text-md font-light">Clique para fazer o download.</p>

            <a href={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/download/${file.id}/${token}`} target="_blank" rel="noreferrer">
                <div className="flex items-center justify-start mb-2 cursor-pointer hover:text-blue-700">
                    <Image 
                        src={word}
                        alt={'Logo Microsoft Word'}
                        layout="fixed"
                        unoptimized={true}
                        height='20'
                        width='20'
                        className=""
                    />
                    <p className="font-mono text-xs font-light ml-1">{file.name}.docx</p>
                </div>
            </a>
        </div>
        }
        </>
    )
}