import React from 'react'
import { Routes, Route } from 'react-router-dom'

/**
 *  Importing Auth
 * 
 */

import Login from './auth/login.jsx'
import Register from './auth/register.jsx'

/**
 *  Importing Views
 * 
 */

import Home from './landing-page/index.jsx'
import Dashboard from './app/dashboard.jsx'
import ManageAccount from './app/manageAccount.jsx'
import Account from './settings/settings.jsx'

const App = () => {
    // if (localStorage.getItem('token') === null) {
    //     return (
    //         <>
    //             <Routes>
    //                 <Route path='/' element={<Home />} />
    //                 <Route path='/login' element={<Login />} />
    //                 <Route path='/register' element={<Register />} />
    //             </Routes>
    //         </>
    //     )
    // }
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/manageAccount' element={<ManageAccount />} />
                <Route path='/account' element={<Account />} />
            </Routes>
        </>
    )
}

export default App