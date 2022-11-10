import word from '../img/word_icon.png'
import Image from "next/image";
import { useState } from 'react';

export default function FilesCard (props:any){
    const pages = Math.ceil(props.count / 10) 
    const [page, setPage] = useState(1)
    const [filesInPage, setFilesInPage] = useState(props.files)

    let renderFiles 
    
    if (page === 1 || !page) {
        renderFiles = props.files.map((file: any) => {
            const token = localStorage.getItem('token')
            return (
              <>
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
              </>
            )
        })
    } else {
        renderFiles = filesInPage.map((file: any) => {
            const token = localStorage.getItem('token')
            return (
              <>
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
              </>
            )
        })
    }

    const getOtherPage = async (otherPage: number) => {
        const token = localStorage.getItem('token')?.toString()

        const content = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        method: 'GET',
        }

        const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/files/${props.user.id}?page=${otherPage}`, content)
        const response = await data.json()

        setPage(otherPage)
        setFilesInPage(response.files)
    }

    const renderPagesNav = () => {
        if (pages <= 1){
            return (
                <></>
            )
        } else if (pages <= 5){
            const showInNav = []

            for (let i = 1; i <= pages; i++){
                showInNav.push(i)
            }

            const displayElements = showInNav.map((element) => {
                return(
                    <>
                        <p className='cursor-pointer hover:text-blue-700' onClick={() => getOtherPage(element)}>{element}</p>
                    </>
                )
            })

            return(
                <>
                    <div className='flex items-center justify-center gap-2'>
                        {displayElements}
                    </div>
                </>
            )
        } else {
            let showInNav: any[] = []

            if (page === 1){
                showInNav = []
            } else {
                showInNav = ['...', `${page - 1}`]
            }

            for (let i = page; showInNav.length <= 5; i++){
                if (showInNav.length === 4){
                    showInNav.push('...')
                } else {
                    showInNav.push(i)
                }
            }

            const displayElements = showInNav.map((element) => {
                if (element !== '...'){
                    return(
                        <>
                            <p className='cursor-pointer hover:text-blue-700' onClick={() => getOtherPage(element)}>{element}</p>
                        </>
                    )
                } else {
                    return(
                        <>
                            <p className='cursor-pointer hover:text-blue-700'>{element}</p>
                        </>
                    )
                }
            })

            return(
                <>
                    <div className='flex items-center justify-center gap-2'>
                        {displayElements}
                    </div>
                </>
            )
        }
    }
    return (
        <>
            { props.user.name &&
            <div className="w-fit h-fit shadow-xl flex flex-col justify-between py-8 px-8 rounded-xl">
            <h1 className="font-sans text-base font-medium my-4">Ultimos arquivos de {props.user.name.split(' ')[0]}</h1>
            {props.files && renderFiles}
            <div className='grid grid-cols-4 gap-4 mt-4'>
                {page - 1 > 0 ?
                <div className='flex flex-col items-center justify-center cursor-pointer hover:text-blue-700' onClick={() => getOtherPage(page - 1)}>
                    <p>←</p>
                    <p className="font-mono text-xs font-light">Anterior</p>
                </div>
                :
                <div className='flex flex-col items-center justify-center opacity-30 cursor-not-allowed'>
                    <p>←</p>
                    <p className="font-mono text-xs font-light">Anterior</p>
                </div>
                }
                <div className='col-start-2 col-end-4'>
                    {renderPagesNav()}
                </div>
                {page < pages ?
                <div className='flex flex-col items-center justify-center cursor-pointer hover:text-blue-700' onClick={() => getOtherPage(page + 1)}>
                    <p>→</p>
                    <p className="font-mono text-xs font-light">Próximo</p>
                </div>
                :
                <div className='flex flex-col items-center justify-center opacity-30 cursor-not-allowed'>
                    <p>→</p>
                    <p className="font-mono text-xs font-light">Próximo</p>
                </div>
                }
            </div>
            </div>
            }
        </>
    )
}