import React, { useState, useEffect } from 'react'
import NavigationWeb from '../components/navigation-web.jsx'
import { useNavigate } from 'react-router-dom'
import Toast from '../components/toast.jsx'
import axios from 'axios'
import process from 'process'

const registerGoogle = async () => {
    const navigate = useNavigate()
    try {
        const response = await axios.get('http://127.0.0.1:3333/login/google', {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        }, {
            timeout: 3000,
        })
        console.log(response)
        if (response.status === 200) {
            console.log(response.data.token.token)
            localStorage.setItem('token', response.data.token.token)
            navigate('/dashboard')
        } else {
            console.error('Error code login:', response)
        }
    } catch (error) {
        console.error('Error during login:', error)
    }
}

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const [showToast, setShowToast] = useState(false)
    const [toastInfo, setToastPassword] = useState({ type: '', message: '' })

    const handleShowToast = () => {
        setShowToast(true)
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            navigate('/dashboard')
        }
    }, [])

    const handleHideToast = () => {
        setShowToast(false)
    }

    const handleToast = (type, message) => {
        setToastPassword({ type: type, message: message })
        handleShowToast()
    }

    const setPasswordStyle = () => {
        let style = 'border rounded-md focus:outline-none focus:border-'
    
        if (password.length >= 8 && password.search(/[a-z]/i) >= 0 && password.search(/[0-9]/) >= 0 && password.search(/[!@#$%^&*]/) >= 0 && password.search(/[A-Z]/) >= 0 && password.search(/[a-z]/) >= 0) {
            style += 'green-500' // Password meets all criteria
        } else {
            style += 'red-500' // Password does not meet all criteria
        }

        return style
    }

    const handleregister = async (e) => {
        e.preventDefault()
        if (confirmPassword !== password) {
            handleToast('error', 'password must be the same')
            handleShowToast()
        }
        if (password.length < 8) {
            handleToast('error', 'password must be at least 8 characters long')
            handleShowToast()
        }
        if (password.search(/[a-z]/i) < 0) {
            handleToast('error', 'password must contain at least one letter')
            handleShowToast()
        }
        if (password.search(/[0-9]/) < 0) {
            handleToast('error', 'password must contain at least one digit')
            handleShowToast()
        }
        if (password.search(/[!@#$%^&*]/) < 0) {
            handleToast('error', 'password must contain at least one special character')
            handleShowToast()
        }
        if (password.search(/[A-Z]/) < 0) {
            handleToast('error', 'password must contain at least one uppercase letter')
            handleShowToast()
        }
        if (password.search(/[a-z]/) < 0) {
            handleToast('error', 'password must contain at least one lowercase letter')
            handleShowToast()
        }
        try {
            const response = await axios.post('http://127.0.0.1:3333/users/register', {
                email: email,
                password: password,
            }, {
                timeout: 3000,
            })

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token.token)
                navigate('/dashboard')
            } else {
                console.error('Error code login:', response)
            }
        } catch (error) {
            console.error('Error during login:', error)
        }
    }

    return (
        <div className="mb-4">
            <NavigationWeb/>
            <div className='pt-16'>
                <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-lg border">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
                    <form onSubmit={handleregister}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-purple-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full px-3 py-2 ${setPasswordStyle()}`}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={toggleShowPassword}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-zinc-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                     
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-zinc-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>

                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
                                Confirm password
                            </label>
                            <input
                                type="password"
                                id="comfirmPassword"
                                name="comfirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-purple-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            onClick={handleregister}
                            className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                        >
                            Register
                        </button>
                    </form>
                    <div className='grid grid-cols-2 mt-10'>
                        <div onClick={registerGoogle} className='col-span-1 border mx-3 rounded-lg hover:bg-slate-100 flex justify-center items-center'>
                            <img src={process.env.PUBLIC_URL + '/Img/services/gmail.png'} width={70} alt="" srcSet="" />
                        </div>
                        <div className='col-span-1 border mx-3 rounded-lg hover:bg-slate-100 flex justify-center items-center'>
                            <img src={process.env.PUBLIC_URL + '/Img/services/Facebook.svg'} width={70} alt="" srcSet="" />
                        </div>
                        {/* <div className='col-span-1 border mx-3 rounded-lg hover:bg-slate-100 flex justify-center items-center'>
                            <img src={process.env.PUBLIC_URL + '/Img/services/discord.png'} width={70} alt="" srcSet="" />
                        </div> */}
                    </div>
                </div>
            </div>
            {showToast && (
                <Toast
                    type={toastInfo.type}
                    message={toastInfo.message}
                    onClose={handleHideToast}
                />
            )}
        </div>
    )
}

export default Register
