import useForm from "../hooks/useForm"
import { useState } from 'react';
import word from '../img/word_icon.png'
import Image from "next/image";
import Papa from 'papaparse'
import csvLogo from '../img/csv.png'


export default function ExampleForm (props: any) {
    const [created, setCreated] = useState(false)
    const [file, setFile] = useState<any>({})
    const [csvFile, setCsvFile] = useState<any>()
    const token = localStorage.getItem('token')
    const fileReader = new FileReader()

    const [form, onchange, clear, setNew] = useForm({
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

    const handleChangeCsv = (e: any) => {
        setCsvFile(e.target.files[0])
    }

    const onSubmitCsv = (e: any) => {
        e.preventDefault()

        Papa.parse(csvFile, {
            header: true,
            skipEmptyLines: true,
            complete: function (results: any){
                setNew(results.data[0])
            }
        })
    }

    return (
        <>
        { !created ?
        <>
            <div className="w-full flex items-center justify-between lg:ml-4 mt-8 py-8 gap-4 lg:gap-8 border-y-2 px-4 lg:px-0" onSubmit={onSubmitCsv}>
                <a href={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/models/download/${props.model}/${token}`} target="_blank" rel="noreferrer">
                    <div className="bg-gray-200 hover:bg-gray-400 font-mono text-md font-light py-2 px-4 rounded-lg cursor-pointer flex flex-col items-center justify-center lg:flex-row lg:items-center lg:justify-between lg:gap-x-2">
                        <p>↓</p>
                        <p className="text-center">Importar Modelo</p>
                    </div>
                </a>
                <label htmlFor="upload_csv" className="cursor-pointer bg-gray-200 hover:bg-gray-400 font-mono text-md font-light py-2 px-4 rounded-lg flex flex-col items-center justify-center lg:flex-row lg:items-center lg:justify-center">
                    <Image 
                        src={csvLogo}
                        alt={'Logo CSV'}
                        layout="fixed"
                        unoptimized={true}
                        height='50'
                        width='50'
                        className=""
                    />
                    <p className="text-center">Enviar Arquivo</p>
                </label>
                <form onSubmit={onSubmitCsv}>
                    <input type="file" name="upload_csv" id="upload_csv" accept=".csv" onChange={handleChangeCsv} className="hidden"  />
                    <button className="bg-gray-200 hover:bg-gray-400 font-mono text-md font-light py-2 px-4 rounded-lg" type='submit'>↑ Exportar</button>
                </form>
            </div>
            <form onSubmit={onSubmitForm} className="lg:ml-4 mt-8 flex flex-col items-start justify-start lg:flex-row lg:flex-wrap gap-8">
                <div className="flex flex-col items-start justify-start lg:flex-row lg:items-center lg:justify-center w-full lg:w-fit px-4 lg:px-0">
                    <label htmlFor="first_name" className="font-mono text-md font-light">Primeiro Nome: </label>
                    <input type="text" name="first_name" id="first_name" value={form.first_name} onChange={onchange} className='bg-gray-200 w-full lg:w-44 h-6 rounded-lg lg:ml-4' required />
                </div>

                <div className="flex flex-col items-start justify-start lg:flex-row lg:items-center lg:justify-center w-full lg:w-fit px-4 lg:px-0">
                    <label htmlFor="last_name" className="font-mono text-md font-light">Ultimo Nome: </label>
                    <input type="text" name="last_name" id="last_name" value={form.last_name} onChange={onchange} className='bg-gray-200 w-full lg:w-44 h-6 rounded-lg lg:ml-4' required />
                </div>

                <div className="flex flex-col items-start justify-start lg:flex-row lg:items-center lg:justify-center w-full lg:w-fit px-4 lg:px-0">
                    <label htmlFor="phone" className="font-mono text-md font-light">Telefone: </label>
                    <input type="tel" name="phone" id="phone" value={form.phone} onChange={onchange} className='bg-gray-200 lg:w-44 h-6 rounded-lg lg:ml-4 w-full' required />
                </div>

                <div className="flex flex-col items-start justify-start lg:flex-row lg:items-center lg:justify-center w-full px-4 lg:px-0">
                    <label htmlFor="departament" className="font-mono text-md font-light">Departamento: </label>
                    <input type="tel" name="departament" id="departament" value={form.departament} onChange={onchange} className='bg-gray-200 w-full h-6 rounded-lg lg:ml-4' required />
                </div>

                <div className="flex flex-col items-start justify-start lg:flex-row lg:items-center lg:justify-center px-4 lg:px-0">
                    <label htmlFor="description" className="font-mono text-md font-light">Descrição: </label>
                    <textarea name="description" id="description" value={form.description} onChange={onchange} className='bg-gray-200 rounded-lg lg:ml-4 w-full lg:w-fit' rows={4} cols={100} required />
                </div>

                <div className="w-full flex items-center justify-center">
                    <button className="bg-gray-200 hover:bg-gray-400 font-mono text-md font-light py-4 px-8 rounded-lg" type='submit'>Enviar</button>
                </div>
            </form>
        </>
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