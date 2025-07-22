import React, { useState } from 'react'
import SwitchButton from '../components/switch-button.jsx'
import axios from 'axios'

const Table = ({ onChange, data }) => {
    const [selectAll, setSelectAll] = useState(false)
    const [selectedItems, setSelectedItems] = useState([])
    // const MemoizedSwitchButton = React.memo(SwitchButton)

    const handleSelectAll = () => {
        setSelectAll(!selectAll)
        setSelectedItems(selectAll ? [] : data.map((item) => item.id))
    }

    const handleIndividualSelect = (itemId) => {
        const updatedSelection = selectedItems.includes(itemId)
            ? selectedItems.filter((id) => id !== itemId)
            : [...selectedItems, itemId]

        setSelectedItems(updatedSelection)
        setSelectAll(updatedSelection.length === data.length)
    }

    const selectAction = (itemId) => {
        console.log(`Item with ID ${itemId} selected !`)
        data[0].modal = itemId
        onChange(data)
        console.log('data:', data)
    }

    const handleSwitchChange = async (itemId) => {
        console.log(`Switch button changed for item with ID ${itemId}`)
        try {
            const response = await axios.put('http://127.0.0.1:3333/automations/status', {
                id: itemId
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log('handleSwitchChange response:', response)
            selectAction(itemId)
            return response.data
        } catch (error) {
            console.log('handleSwitchChange error:', error.message)
            throw error
        }
    }
    return (
        <div>
            <table className="min-w-full divide-y divide-gray-200 border">
                <thead className="bg-gray-50 sticky top-0 z-50">
                    <tr>
                        <th scope="col" className="hidden md:block px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <input type="checkbox" checked={selectAll} onClick={handleSelectAll} />
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th scope="col" className="hidden md:block px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 overflow-x-auto">
                    {data.map((item, index) => {
                        if (index === 0) {
                            return null
                        }
                        return (
                            <tr key={item.id} className='hover:bg-gray-100'>
                                <td className="px-6 py-4 whitespace-nowrap hidden md:block ">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(item.id)}
                                        onClick={() => handleIndividualSelect(item.id)}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => selectAction(item.id)}>{item.name}</td>
                                <td className="hidden md:block px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                    >
                                        {item.status ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td onClick={() => handleSwitchChange(item.id)} className="px-6 py-4 whitespace-nowrap text-right items-end justify-end text-sm font-medium">
                                    <SwitchButton init={item.status} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table