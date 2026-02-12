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
        if (error.response.status !== 401) throw error
        setErrors(error.response)
    }),    
    )

    const csrf = () => axiosClient.get('/sanctum/csrf-cookie')

    const register = async({setErrors, ...props}) => {
        await csrf();
        setErrors([])
        axiosClient.post('/register', props)
        .then(() => mutate())
        .catch(error => {
            if (error.response.status !== 422 && error.response.status !== 401) throw error
            setErrors(error.response.data.errors)
        })
    }

    const getToken = async() =>{
        await csrf()
        const res = await axiosClient.get('/api/MidtransToken')
        const token = await res;
        return token.data.snap_token
    }

    const login = async ({ setErrors, setStatus, ...props}) => {
        await csrf()

        setErrors([])
        setStatus(null)
        try {
            await axiosClient.post('/login', props)
            await mutate()
            return true
        }
        catch(error)  { 
            if (error.response.status == 422){
                setErrors(error.response.data.errors)
                return false
            }
        }
    }

    const resendEmailVerification = ({ setStatus }) => {
        axiosClient
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    
    const logout = async() => {
        await csrf()

        try {
            await axiosClient.post('/logout')
            await mutate()
            window.location.pathname = '/login'
        } catch (error) {
            throw error
        }


    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)

        if (middleware === 'auth' && (user && !user.email_verified_at))
            router.push('/verify')
        
        if (
            window.location.pathname === '/verify' &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) router.push('/login')
           

    }, [user, error])

    return {
        user,register,getToken ,login,resendEmailVerification,logout
    }
}