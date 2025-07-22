import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import process from 'process'

const NavigationWeb = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 border-b-2 fixed top-0 w-full z-50">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <NavLink to="/">
                    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={process.env.PUBLIC_URL + '/Img/logo.png'} className="h-10" alt="Logo" />
                    </a>
                </NavLink>
                <div className='grid'>
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? '' : 'hidden'}`} id="navbar-user">
                            <Link className='px-5 py-1.5 mx-2 text-right rounded-md focus:outline-none transition duration-300 border border-purple-500 text-purple-500 hover:bg-white-700' to="/login">Login</Link>
                            <Link className='px-5 py-1.5 mx-2 text-right rounded-md focus:outline-none transition duration-300 border bg-purple-500 border-purple-500  text-white hover:bg-purple-700' to="/Register">Register</Link>
                        </div>
                        <button
                            data-collapse-toggle="navbar-user"
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-user"
                            aria-expanded="false"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavigationWeb
