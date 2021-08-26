import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const AddExample = () => {
    const { register, handleSubmit } = useForm()
    const [result, setResult] = useState('')
    const onSubmit = (data) => setResult(JSON.stringify(data))

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('firstName')} placeholder='First Name' />
            <input {...register('lastName')} placeholder='Last Name' />
            <select {...register('category')}>
                <option value=''>Select...</option>
                <option value='A'>Category A</option>
                <option value='B'>Category B</option>
            </select>
            <p>{result}</p>
            <input type='submit' />
        </form>
    )
}

export default AddExample
