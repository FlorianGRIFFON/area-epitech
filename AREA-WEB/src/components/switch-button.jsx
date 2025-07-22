import React from 'react'

const SwitchButton = ({ init }) => {
    const isChecked = init
    return (
        <label className={'flex space-x-2 justify-end items-end cursor-pointer'} >
            <span className={`h-6 w-12 bg-gray-300 rounded-xl p-1 duration-300 ${isChecked ? 'bg-green-500' : 'bg-red-600'}`}>
                <span className={`block h-4 w-4 bg-white rounded-full shadow-md transform duration-300 ease-in-out ${isChecked ? 'translate-x-6' : 'translate-x-0'}`}></span>
            </span>
            <input type="checkbox" className="hidden" checked={isChecked}/>
        </label>
    )
}

export default SwitchButton