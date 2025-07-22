import React from 'react'

const Button = ({ onClick, type, children, className }) => {
    const baseStyles = 'py-2 px-4 rounded-md focus:outline-none transition duration-300'
    const primaryStyles = 'bg-blue-500 text-white hover:bg-blue-700'
    const secondaryStyles = 'bg-gray-300 text-gray-700 hover:bg-gray-400'

    let buttonStyles = baseStyles

    if (type === 'primary') {
        buttonStyles += ` ${primaryStyles}`
    } else {
        buttonStyles += ` ${secondaryStyles}`
    }

    return (
        <button
            className={`${buttonStyles} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
