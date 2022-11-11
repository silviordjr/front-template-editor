import useForm from "../hooks/useForm"
import { useEffect } from 'react';
import { useState } from 'react';

const getCurrentUser = async () => {
    const token = localStorage.getItem('token');
    
    const content = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        method: 'GET',
      }

      const data = await fetch (`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/current`, content)
      const response = await data.json()

      return response
}

export default function Profile () {
    const [form, onchange, clear, setNewState] = useForm({name: '', email: '', registration: '', departament: '', role: ''})
    const [userId, setUserId] = useState('')
    const [role, setRole] = useState('')
    const [modified, setModified] = useState(false)


    useEffect(() => {
        getCurrentUser()
        .then((response) => {
            setNewState({
                name: response.name,
                email: response.email,
                registration: response.registration,
                departament: response.departament,
                role: response.role
            })

            setUserId(response.id)
            setRole(response.role)
        })
    }, [])

    const onSubmitForm = async (e: any) => {
        e.preventDefault()

        const token = localStorage.getItem('token');
        
        const content = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            method: 'PUT',
            body: JSON.stringify(form)
        }

        const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/users/${userId}`, content)
        const response = await data.json()
        console.log(response)
        if (response){
            setModified(true)
        }
    }

    return (
        <>
            <main className="px-4 lg:px-0 max-w-screen-xl mx-auto my-10 min-h-screen flex flex-col items-center justify-start gap-8">
                <h1 className='text-2xl font-mono antialiased font-semibold ml-4 mt-8'>Edite os dados do usuário</h1>
                <form className='w-full flex flex-col items-start justify-start md:grid md:grid-cols-2 gap-8 shadow-xl rounded-xl px-8 py-16 mt-16' onSubmit={onSubmitForm}> 
                    <div className="flex flex-col items-start md:flex-row md:items-center justify-start w-full">
                        <label htmlFor="name" className="font-mono text-md font-light">Nome Completo: </label>
                        <input type="text" name="name" id="name" value={form.name} onChange={onchange} className='bg-gray-200 w-full mt-4 md:mt-0 md:w-2/3 h-12 md:h-8 rounded-lg md:ml-4' required />
                    </div>

                    <div className="flex flex-col items-start md:flex-row md:items-center justify-start w-full">
                        <label htmlFor="email" className="font-mono text-md font-light">Email: </label>
                        <input type="email" name="email" id="email" value={form.email} onChange={onchange} className='bg-gray-200 w-full mt-4 md:mt-0 md:w-2/3 h-12 md:h-8 rounded-lg md:ml-4' required />
                    </div>

                    <div className="flex flex-col items-start md:flex-row md:items-center justify-start w-full">
                        <label htmlFor="registration" className="font-mono text-md font-light">Matrícula: </label>
                        <input type="text" name="registration" id="registration" value={form.registration} onChange={onchange} className='bg-gray-200 w-full mt-4 md:mt-0 md:w-2/3 h-12 md:h-8 rounded-lg md:ml-4' required />
                    </div>

                    <div className="flex flex-col items-start md:flex-row md:items-center justify-start w-full">
                        <label htmlFor="departament" className="font-mono text-md font-light">Setor: </label>
                        <input type="text" name="departament" id="departament" value={form.departament} onChange={onchange} className='bg-gray-200 w-full mt-4 md:mt-0 md:w-2/3 h-12 md:h-8 rounded-lg md:ml-4' required />
                    </div>

                    <div className="flex flex-col items-start md:flex-row md:items-center justify-start w-full">
                        <label htmlFor="role" className="font-mono text-md font-light">Função: </label>
                        { role === 'ADMIN' ?
                        <select name="role" id="role" className='bg-gray-200 w-44 rounded-lg ml-2 cursor-pointer' onChange={onchange} value={form.role} required>
                            <option value=""></option>
                            <option value="ADMIN">Administrador</option>
                            <option value="USER">Usuário</option>
                        </select>
                        :
                        <select name="role" id="role" className='bg-gray-200 w-44 rounded-lg ml-2 cursor-not-allowed' onChange={onchange} value={form.role} required disabled> 
                            <option value=""></option>
                            <option value="ADMIN">Administrador</option>
                            <option value="USER">Usuário</option>
                        </select>
                        }
                    </div>
                    <div className="w-full flex items-center justify-center">
                        <button className="bg-gray-200 hover:bg-gray-400 font-mono text-md font-light w-full h-12 md:py-1 md:px-8 rounded-lg" type='submit'>Enviar</button>
                    </div>
                </form>
                {
                    modified &&
                    <h1 className='text-2xl font-mono antialiased font-semibold ml-4 mt-8'>Usuário Atualizado com sucesso.</h1>
                }
            </main>
        </>
    )
}