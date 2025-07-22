import React, { useState, useEffect } from 'react'
import process from 'process'
import axios from 'axios'
import Toast from '../components/toast.jsx'
// import { useNavigate } from 'react-router-dom'

const AccountInfo = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    // const navigate = useNavigate()

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const [showToast, setShowToast] = useState(false)
    const [toastInfo, setToastPassword] = useState({ type: '', message: '' })

    const handleShowToast = () => {
        setShowToast(true)
    }

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

    const handleSaveChanges = async (e) => {
        e.preventDefault()
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
        axios.post('http://127.0.0.1:3333/users/update-password', {
            'newPassword': password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                console.log(response.data)
                handleToast('success', 'Password changed')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:3333/users/read', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                setUsername(response.data.id)
                setEmail(response.data.email)
            })
            .catch((error) => {
                console.log(error)
            }) 
    }, [])

    // const handleSaveChanges = () => {
    //     axios.post('http://127.0.0.1:3333/users/update-password', {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem('token')}`
    //         },
    //         param: {
    //             newPassword: password
    //         }
    //     })
    //         .then((response) => {
    //             console.log(response)
    //         })
    //         .catch((error) => {

    //             console.log(error)
    //         })
    // }
  
    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <div className='flex flex-col items-center py-5'>
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={process.env.PUBLIC_URL + '/Img/profilepicdefault.png'} alt="profile picture"/>
            </div>
            <h2 className="text-2xl font-semibold mb-6 text-center">Profile Settings</h2>
            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-600 text-sm font-medium mb-2">
                    Numéro de client
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-purple-500"
                    disabled
                />
            </div>
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
                    disabled
                />
            </div>
            <form>
                <div className='my-4'>
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
                <button
                    type="button"
                    onClick={handleSaveChanges}
                    className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                >
            Save Changes
                </button>
                
            </form>
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

export default AccountInfo