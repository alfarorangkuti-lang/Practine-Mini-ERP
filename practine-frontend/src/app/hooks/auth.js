'use client'

import useSWR from "swr";
import axiosClient from "../lib/axios";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export const useAuth = ({middleware, redirectIfAuthenticated} = {}) => {
    const params = useParams()
    const router = useRouter()
    
    const {data: user, error, mutate} = useSWR('/api/user', () =>
    axiosClient.get('api/user')
    .then(res => res.data)
    .catch(error => {
        if (error.response.status !== 409) throw error
        
        router.push('/verify-email')
    }),    
    )

    const csrf = () => axiosClient.get('/sanctum/csrf-cookie')

    const login = async ({ setErrors, setStatus, ...props}) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axiosClient.post('/login', props).then(() => mutate()).catch(error => { 
            if (error.response.status !== 422) throw error
            setErrors(error.response.data.errors)
        })
    }

    const logout = async() => {
        await csrf()
        axiosClient.post('/logout')
        .then(() => {
            mutate()
            window.location.pathname = '/login'

        })
        .catch(error => {
            throw error
        })


    }

    useEffect(() => {
        if(middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)

        if(middleware === 'auth' && !user)
            router.push('/login')
    }, [user, error])

    return {
        user, login,logout
    }
}