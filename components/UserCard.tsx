export default function UserCard (props: any){
    return (
        <>
            <div className="w-full md:w-96 h-fit shadow-xl flex flex-col justify-between py-8 px-8 rounded-xl">
                <h1 className="font-sans text-base font-medium my-4">{props.user.name}</h1>
                <p className="font-mono text-xs font-light">{props.user.email}</p>
                <p className="font-mono text-xs font-light">{props.user.departament}</p>
                <p className="font-mono text-xs font-light">Matrícula: {props.user.registration}</p>
            </div>
        </>
    )
}