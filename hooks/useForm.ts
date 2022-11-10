import { useState } from "react"


const useForm = (initialState: any) => {
    const [form, setForm] = useState(initialState)
    
    

    const handleInputChange = (event: any) => {
        const { name, value } = event.target
        console.log(name, value)
        setForm({ ...form, [name]: value })
    }

    const clear = () => {
        setForm(initialState)
    }

    const setNewState = (newState: any) => {
        setForm(newState)
    }
    

    return [form, handleInputChange, clear, setNewState]
}

export default useForm