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

    const register = async({setErrors, ...props}) => {
        await csrf();
        setErrors([])
        axiosClient.post('/register', props)
        .then(() => mutate())
        .catch(error => {
            if (error.response.status !== 422) throw error
            setErrors(error.response.data.errors)
        })
    }

    const login = async ({ setErrors, setStatus, ...props}) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axiosClient.post('/login', props).then(() => mutate()).catch(error => { 
            if (error.response.status !== 422) throw error
            setErrors(error.response.data.errors)
        })
    }

    const resendEmailVerification = ({ setStatus }) => {
        axiosClient
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
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
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)

        if (middleware === 'auth' && (user && !user.email_verified_at))
            router.push('/verify-email')
        
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()
    }, [user, error])

    return {
        user,register ,login,resendEmailVerification,logout
    }
}