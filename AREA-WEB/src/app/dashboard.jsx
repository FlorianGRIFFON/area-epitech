import React, { useState, useEffect, useCallback } from 'react'
import NavigationApp from '../components/navigation-app.jsx'
import Table from '../components/table.jsx'
import FormAddAction from './form-add-action.jsx'
import axios from 'axios'

const getAutomations = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:3333/automations/read', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log('getAutomations response:', response)
        return response.data
    } catch (error) {
        console.log('getAutomations error:', error.message)
        throw error
    }
}

const Dashboard = () => {
    const [testData, setTestData] = useState([])
    const [modalData, setModalData] = useState([])
    const [nameModal, setNameModal] = useState(modalData[0]?.des || '')
    const [desModal, setDesModal] = useState(modalData[0]?.name || '')
    const [dateModal, setDateModal] = useState(modalData[0]?.created || '')
    const [trigger, setTrigger] = useState(0)
    const [triggerDelete, setTriggerDelete] = useState(0)

    const handleNameChange = (event) => {
        setNameModal(event.target.value)
    }

    const handleDesChange = (event) => {
        setDesModal(event.target.value)
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)

        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()

        setDateModal(`${day}/${month}/${year}`)
    }

    const modifyAutomations = useCallback(async (data, nameModal, desModal) => {
        axios.put('http://127.0.0.1:3333/automations/modify', {
            'id': data.id,
            'name': nameModal,
            'description': desModal,
            'steps': data.steps,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setTrigger(prev => prev + 1)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const deleteAutomations = useCallback(async (data) => {
        try {
            console.log(data)
            const response = await axios.delete('http://127.0.0.1:3333/automations/delete', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                params: {
                    id: data.id
                }
            })
            console.log('getAutomations response:', response)
            setTriggerDelete(prev => prev + 1)
            return response.data
        } catch (error) {
            console.log('getAutomations error:', error.message)
            throw error
        }
    }, [])
        
    useEffect(() => {
        const fetchAutomations = async () => {
            try {
                const automations = await getAutomations()
                const modal = [
                    {
                        modal: 0,
                    }
                ]
                const formattedData = automations.map((automation) => ({
                    id: automation.id,
                    name: automation.name,
                    status: automation.active,
                    des: automation.description,
                    steps: automation.steps,
                    created: automation.created_at,
                }))
                formattedData.unshift(modal[0])
                console.log('formattedData:', formattedData)
                setTestData(formattedData)
            } catch (error) {
                console.error('Error fetching automations:', error.message)
            }
        }
        fetchAutomations()
    }, [])

    useEffect(() => {
        const fetchAutomations = async () => {
            try {
                const tmp = modalData[0].modal
                const automations = await getAutomations()
                const modal = [
                    {
                        modal: tmp,
                    }
                ]
                const formattedData = automations.map((automation) => ({
                    id: automation.id,
                    name: automation.name,
                    status: automation.active,
                    des: automation.description,
                    steps: automation.steps,
                    created: automation.created_at,
                }))
                formattedData.unshift(modal[0])
                console.log('formattedData:', formattedData)
                setTestData(formattedData)
            } catch (error) {
                console.error('Error fetching automations:', error)
            }
        }
        fetchAutomations()
    }, [trigger])

    useEffect(() => {
        const fetchAutomations = async () => {
            try {
                const automations = await getAutomations()
                const modal = [
                    {
                        modal: 0,
                    }
                ]
                const formattedData = automations.map((automation) => ({
                    id: automation.id,
                    name: automation.name,
                    status: automation.active,
                    des: automation.description,
                    steps: automation.steps,
                    created: automation.created_at,
                }))
                formattedData.unshift(modal[0])
                console.log('formattedData:', formattedData)
                setTestData(formattedData)
            } catch (error) {
                console.error('Error fetching automations:', error.message)
            }
        }
        fetchAutomations()
    }, [triggerDelete])

    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        const width = window.innerWidth
        if (width < 768) {
            setTriggerDelete(prev => prev + 1)
        } else {
            setTrigger(prev => prev + 1)
        }
    }

    const handleTableChange = () => {
        const filteredData = testData.filter((data) => data.id === testData[0].modal)
        console.log('data test:', filteredData)
        setNameModal(filteredData[0]?.name)
        setDesModal(filteredData[0]?.des)
        formatDate(filteredData[0]?.created)
        setModalData(filteredData)
        setTrigger(prev => prev + 1)
        console.log('Name modal:', modalData[0]?.name)
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-6 gap-4 h-screen overflow-hidden pt-16">
            <NavigationApp />
            <div className="md:col-span-2 md:row-span-6 bg-black text-white h-full">
                <div className="flex flex-col items-center justify-between h-full p-4 ">
                    <div className=' items-center text-center self-center'>
                        <h2 className="text-2xl font-bold mb-3 md:mb-10 text-center">Tool box</h2>
                        <button
                            className={'py-2 px-4 bg-purple-700 text-white rounded-md mb-2 hover:bg-purple-600'}
                            onClick={openModal}
                        >
                            Create action
                        </button>
                    </div>
                </div>
            </div>

            <div className="row-span-6 md:col-span-10 p-4 overflow-y-scroll">
                <div className="md:mr-4 md:mt-4 flex flex-col-reverse items-center">
                    <form className='w-full'>
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                            Search
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                type="search"
                                id="default-search"
                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                                placeholder="Search Action, Spotify..."
                                required
                            />
                            <button
                                type="submit"
                                className="text-white absolute end-2.5 bottom-2.5 bg-purple-600 hover:bg-purple-700 focus:ring-0 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
                <h2 className="text-4xl font-extrabold dark:text-white my-5">Action list</h2>
                <div className="grid grid-cols-12 gap-4">
                    <div className="md:col-span-8 col-span-12 row-span-full border h-full w-full lg:max-h-[700px] overflow-y-auto">
                        <Table onChange={handleTableChange} data={testData} />
                    </div>
                    <FormAddAction isOpen={isModalOpen} onClose={closeModal} />
                    <div className="md:col-span-4 md:row-span-1">
                        {testData[0]?.modal === 0 || testData[0]?.modal === null ? null :
                            <div className="fixed md:relative inset-0 flex items-center justify-center z-50 md:z-0">
                                <div
                                    className="fixed md:hidden inset-0 bg-black opacity-50"
                                    onClick={() => setTriggerDelete(prev => prev + 1)}
                                ></div>
                        
                                <div className="relative md:block z-50 w-full max-w-2xl">
                                    <div className="max-w-md md:mx-auto bg-white rounded-xl border overflow-hidden mx-4">
                                        <div className="p-6">
                                            <input
                                                className="font-bold text-xl mb-5"
                                                type="text"
                                                name="name"
                                                id="name"
                                                onChange={handleNameChange}
                                                value={nameModal}
                                            />
                                            <p className="text-gray-500 mb-2">Description:</p>
                                            <textarea className="text-gray-500 mb-4 w-full border rounded-md" name="description" id="description" rows="3" onChange={handleDesChange} value={desModal}></textarea>
                                            <p className="text-gray-500 mb-4">Status: {modalData[0]?.status ? 'Active' : 'Inactive'}</p>
                                            <p className="text-gray-500 mb-4">Created: {dateModal}</p>
                                            <div className='md:col-span-8 col-span-12 row-span-full border rounded-md h-full w-full max-h-[700px] overflow-y-auto'>
                                                <p className="text-gray-500 mb-4 relative row-span-full max-h-[150px] md:max-h-[250px] overflow-y-visible">Apps: <pre>{JSON.stringify(modalData[0]?.steps, null, 2)}</pre></p>
                                            </div>
                                        </div>
                                        <div className="p-6 bg-gray-100 border-t border-gray-200 flex justify-between items-center">
                                            <button onClick={() => modifyAutomations(modalData[0], nameModal, desModal)} className="text-purple-500 hover:text-purple-700">Modify</button>
                                            <button onClick={() => deleteAutomations(modalData[0])} className="text-red-500 hover:text-red-700">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
