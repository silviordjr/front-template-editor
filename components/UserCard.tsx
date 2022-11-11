import { useRouter } from "next/router"

export default function UserCard (props: any){
    const router = useRouter()

    const goToProfile = () => {
        router.push('/profile')
    }
    return (
        <>
            <div className="w-full md:w-80 lg:w-96 h-fit shadow-xl flex flex-col justify-between py-8 px-8 rounded-xl">
                <h1 className="font-sans text-base font-medium my-4">{props.user.name}</h1>
                <p className="font-mono text-xs font-light">{props.user.email}</p>
                <p className="font-mono text-xs font-light">{props.user.departament}</p>
                <p className="font-mono text-xs font-light">Matrícula: {props.user.registration}</p>
                {
                props.current &&
                <div className="w-full flex items-center justify-center mt-8">
                    <button className="w-full h-12 bg-gray-200 hover:bg-gray-400 font-mono text-md font-light rounded-lg" onClick={() => goToProfile()}>Editar Informações</button>
                </div>
                }
            </div>
        </>
    )
}