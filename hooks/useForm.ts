import { useState } from "react"


const useForm = (initialState: any) => {
    const [form, setForm] = useState(initialState)
    
    

    const handleInputChange = (event: any) => {
        const { name, value } = event.target
        setForm({ ...form, [name]: value })
    }

    const clear = () => {
        setForm(initialState)
    }
    

    return [form, handleInputChange, clear]
}

export default useForm