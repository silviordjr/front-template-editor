import word from '../img/word_icon.png'
import Image from "next/image";

export default function FilesCard (props:any){
    
    const renderFiles = props.files.map((file: any) => {
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
    return (
        <>
            { props.user.name &&
            <div className="w-fit h-fit shadow-xl flex flex-col justify-between py-8 px-8 rounded-xl">
            <h1 className="font-sans text-base font-medium my-4">Ultimos arquivos de {props.user.name.split(' ')[0]}</h1>
            {props.files && renderFiles}
            </div>
            }
        </>
    )
}