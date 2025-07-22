import React, { useState } from 'react'
import NavigationApp from '../components/navigation-app.jsx'
import SwitchButton from './../components/switch-button.jsx'
import AccountInfo from './account.jsx'

const Account = () => {
    const [selectedAction, setSelectedAction] = useState('accountInfo')
    const [Action, setAction] = useState(true)

    const handleActionDakChange = () => {
        setAction(!Action)
    }    

    const handleActionChange = (action) => {
        setSelectedAction(action)
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.href = '/'
    }

    const renderMainContent = () => {
        switch (selectedAction) {
        case 'accountInfo':
            return <AccountInfo />
        case 'settings':
            return (
                <div>
                    <h2 className='text-4xl font-extrabold dark:text-white my-5'>Settings</h2>
                    <div className='flex flex-col'>
                        <h3 className='text-2xl font-bold dark:text-white my-5'>Customize interface</h3>
                        <div className='flex flex-col md:flex-row'>
                            <div className='flex flex-col md:flex-row' onClick={handleActionDakChange}> 
                                <label  className='text-xl font-bold dark:text-white my-5 mr-3'>Dark Mode</label>
                                <div className='flex align-middle self-center items-center'>
                                    <SwitchButton init={Action} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        default:
            return null
        }
    }

    return (
        <div className='overflow-y-scroll no-scrollbar h-screen'>
            <NavigationApp />
            <div className='grid max-h-full grid-cols-1 md:grid-cols-12 gap-4 h-full pt-16'>
                <div className='md:col-span-2 bg-black text-white h-full'>
                    <div className='flex flex-col items-start md:items-center justify-between h-full p-4'>
                        <div>
                            <h2 className='text-2xl font-bold mb-10'>Setting</h2>
                            <button
                                className={`py-2 px-4 text-white rounded-md mb-2 ${
                                    selectedAction === 'accountInfo' ? 'bg-purple-600 hover:bg-purple-800' : 'bg-gray-800 hover:bg-gray-700'
                                }`}
                                onClick={() => handleActionChange('accountInfo')}
                            >
                                Account Info
                            </button>
                            <button
                                className={`py-2 px-4 text-white rounded-md mb-2 ${
                                    selectedAction === 'settings' ? 'bg-purple-600 hover:bg-purple-800' : 'bg-gray-800 hover:bg-gray-700'
                                }`}
                                onClick={() => handleActionChange('settings')}
                            >
                                Settings
                            </button>
                        </div>
                        <button onClick={handleLogout} className='hidden md:block py-2 px-4 bg-black hover:text-white text-red-600 border border-red-600 rounded-md hover:bg-red-600'>
                            Logout
                        </button>
                    </div>
                </div>
                {/* Contenu principal */}
                <div className='md:col-span-10 p-4'>{renderMainContent()}</div>
                <button onClick={handleLogout} className='md:hidden py-2 px-4 bg-white text-red-600 hover:text-red-600 border border-red-600 mx-6 mb-10 mt-4 rounded-md hover:bg-red-600'>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Account
