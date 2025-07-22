import React, { useState } from 'react'
import axios from 'axios'

const FormAddAction = ({ isOpen, onClose }) => {
    const closeModal = () => {
        if (onClose) {
            onClose()
        }
    }
    const services = {
        'Spotify': ['is_listening', 'create_playlist', 'add_to_playlist', 'delete_song_from_playlist', 'create_recommended'],
        'Timer': ['everyday', 'day'],
        'Discord': ['send_message'],
        'Email': ['send_email_using_smtp'],
    }
    console.log(services)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [stepsFields, setStepsFields] = useState({
        steps: [
            {
                type: 'Spotify',
                action: 'Like song',
                details: {
                    detail1: 'Look at this Spotify song I liked!',
                    detail2: 'This is the song, enjoy! [song]',
                    detail3: 'saturn@gmail.com',
                },
            },
        ],
    })

    const addConditionField = () => {
        setStepsFields({
            steps: [...stepsFields.steps, { ...NewStep }],
        })
    }

    const removeConditionField = (index) => {
        const updatedFields = { steps: [...stepsFields.steps] }
        updatedFields.steps.splice(index, 1)
        setStepsFields(updatedFields)
    }

    const handleFieldChange = (fieldType, index, value) => {
        const updatedFields = { steps: [...stepsFields.steps] }
        updatedFields.steps[index][fieldType] = value
        setStepsFields(updatedFields)
    }

    const handleFieldChangeDetail = (fieldType, index, value) => {
        const updatedFields = { steps: [...stepsFields.steps] }
        updatedFields.steps[index].details[fieldType] = value
        setStepsFields(updatedFields)
    }

    const NewStep = {
        type: 'Spotify',
        action: 'like',
        details: {
            detail1: 'Look at this Spotify song I liked!',
            detail2: 'This is the song, enjoy! [song]',
            detail3: 'saturn@gmail.com',
        },
    }

    const handleAddAction = async (e) => {
        const stepsF = stepsFields.steps
        e.preventDefault()
        try {
            const response = await axios.post(
                'http://127.0.0.1:3333/automations/create',
                {
                    name: name,
                    description: description,
                    steps: JSON.stringify(stepsF),
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            )

            if (response.status === 200) {
                console.log(response.data)
                setName('')
                setDescription('')
                setStepsFields({
                    steps: [
                        {
                            type: 'Spotify',
                            action: 'like',
                            details: {
                                detail1: 'Look at this Spotify song I liked!',
                                detail2: 'This is the song, enjoy! [song]',
                                detail3: 'saturn@gmail.com',
                            },
                        },
                    ],
                })
                closeModal()
            } else {
                console.error('Error code:', response.status)
            }
        } catch (error) {
            console.error('Error during request:', error)
        }
    }

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={closeModal}
                    ></div>
                    {/* Modal content */}
                    <div className="relative z-50 w-full max-w-2xl mx-4 md:mx-auto">
                        <div className="relative md:p-4 w-full max-w-2xl h-full md:h-auto">
                            <div className="relative md:p-4 w-full max-w-2xl h-full md:h-auto">
                                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Create new action
                                        </h3>
                                        <button
                                            onClick={closeModal}
                                            type="button"
                                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                            data-modal-toggle="defaultModal"
                                        >
                                            <svg
                                                aria-hidden="true"
                                                className="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <form onSubmit={handleAddAction}>
                                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                            <div className="sm:col-span-2">
                                                <label
                                                    htmlFor="name"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                          Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                                                    placeholder="Type action name"
                                                    required=""
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label
                                                    htmlFor="description"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                            Description
                                                </label>
                                                <textarea
                                                    id="description"
                                                    rows="4"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                                                    placeholder="Write action description here"
                                                ></textarea>
                                            </div>
                                            <div className="mb-4 max-h-80 overflow-auto sm:col-span-2 border rounded-lg border-gray-300">
                                                {stepsFields.steps.map((field, index) => (
                                                    <div key={index} className="my-4 text-center mx-5">
                                                        <label
                                                            htmlFor={`conditionName${index}`}
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                        >
                                                        Reaction n°{index + 1}
                                                        </label>
                                                        <select
                                                            id={`conditionName${index}`}
                                                            value={field.name}
                                                            onChange={(e) =>
                                                                handleFieldChange('type', index, e.target.value)
                                                            }
                                                            className="bg-gray-50 my-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                                                        >
                                                            <option value="" disabled>Select an option</option>
                                                            {Object.keys(services).map((serviceName) => (
                                                                <option key={serviceName}>
                                                                    {serviceName}
                                                                </option>
                                                            ))}
                                                        </select>

                                                        <select
                                                            id={`action${index}`}
                                                            value={field.name}
                                                            onChange={(e) =>
                                                                handleFieldChange('action', index, e.target.value)
                                                            }
                                                            className="bg-gray-50 my-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                                                        >
                                                            <option value="" disabled>Select an option</option>
                                                            {services[field.type].map((action) => (
                                                                <option key={action} value={action}>
                                                                    {action}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <input
                                                            onChange={(e) =>
                                                                handleFieldChangeDetail('detail1', index, e.target.value)
                                                            }
                                                            type="text"
                                                            value={field.details.detail1}
                                                            className="bg-gray-50 border  my-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                                                        />
                                                        <input
                                                            onChange={(e) =>
                                                                handleFieldChangeDetail('detail2', index, e.target.value)
                                                            }
                                                            type="text"
                                                            value={field.details.detail2}
                                                            className="bg-gray-50 border  my-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                                                        />
                                                        <input
                                                            onChange={(e) =>
                                                                handleFieldChangeDetail('detail3', index, e.target.value)
                                                            }
                                                            type="text"
                                                            value={field.details.detail3}
                                                            className="bg-gray-50 border  my-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                                                        />
                                                        {index !== 0 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => removeConditionField(index)}
                                                                className="underline font-light text-sm text-red-500 mt-2"
                                                            >
                                Supprimer le champ
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="text-center mt-10">
                                            <button
                                                type="button"
                                                onClick={addConditionField}
                                                className="text-purple-600 border border-purple-600 inline-flex mx-10 items-center bg-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                            >
                                                <svg
                                                    className="mr-1 -ml-1 w-6 h-6"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                        Add new reaction
                                            </button>
                                        </div>
                                        <div className="text-center mt-5">
                                            <button
                                                type="submit"
                                                className="text-white inline-flex items-center bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                                            >
                                                <svg
                                                    className="mr-1 -ml-1 w-6 h-6"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                        Create action
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default FormAddAction