import React, { useState, useEffect } from 'react'
import NavigationApp from '../components/navigation-app.jsx'
import process from 'process'
import axios from 'axios'

const sendTokenToBack = async (name, token) => {
    console.log('Calling sendtokentoback with spoti')
    axios.post('http://127.0.0.1:3333/services/add', {
        serviceName: name,
        token: token
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then((response) => {
            console.log('sendTokenToBack response:', response)
        })
        .catch((error) => {
            console.log('sendTokenToBack error:', error.message)
        })
}

const handleDisconnect = async (name) => {
    axios.put('http://127.0.0.1:3333/services/delete', {
        serviceName: name,
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then((response) => {
            console.log('handleDisconnect response:', response)
        })
        .catch((error) => {
            console.log('handleDisconnect error:', error.message)
        })
}

export const CardAccount = (props) => {
    const [connect, setConnect] = useState(false)

    const handleClick = () => {
        setConnect(!connect)
    }

    const handleDisconnectAndClick = (name) => {
        setConnect(!connect)
        handleDisconnect(name)
    }

    return (
        <div className='mx-auto max-w-sm p-6 bg-white border border-gray-600 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <div className='flex items-center mb-4'>
                <div className='w-10 h-10 mb-3 rounded-full overflow-hidden shadow-md'>
                    <img src={process.env.PUBLIC_URL + '/Img/services/' + props.name + '.png'} alt='logo' />
                </div>
                <div className='ml-4'>
                    <h5 className='text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>
                        {props.name}
                    </h5>
                    {connect ? <p className='text-gray-500'>Connected</p> : <p className='text-gray-500'>Not connected</p>}
                </div>
            </div>

            <p className='my-4 font-normal text-gray-500 dark:text-gray-400'>
                Unlock the potential about connecting <span className='font-bold'>{props.name}</span> with other apps!
            </p>
            {connect ?
                <a onClick={() => handleDisconnectAndClick('')} className='px-4 py-2 mt-2 text-sm font-medium tracking-wide text-red-600 capitalize transition-colors duration-200 transform bg-white border border-red-600 rounded-md hover:bg-red-600 hover:text-white focus:outline-none focus:bg-red-700 focus:text-white'>
                    Disconnect
                </a>
                :
                <a onClick={handleClick} className='px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700'>
                    Connect
                </a>
            }
        </div>
    )
}

export const CardAccountChatgpt = (props) => {
    
    return (
        <div className='mx-auto max-w-sm p-6 bg-white border border-gray-600 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <div className='flex items-center mb-4'>
                <div className='w-10 h-10 mb-3 rounded-full overflow-hidden shadow-md'>
                    <img src={process.env.PUBLIC_URL + '/Img/services/' + props.name + '.png'} alt='logo' />
                </div>
                <div className='ml-4'>
                    <h5 className='text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>
                        {props.name}
                    </h5>
                    <p className='text-gray-500'>Connected</p>
                </div>
            </div>

            <p className='my-4 font-normal text-gray-500 dark:text-gray-400'>
                Unlock the potential about connecting <span className='font-bold'>{props.name}</span> with other apps!
            </p>
            <a className='px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700'>
                    Connected
            </a>
        </div>
    )
}

export const CardAccountSpotify = (props) => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID
    const redirectUri = process.env.REACT_APP_LOCAL_URL_REDIRECT
    const scopes = [
        'user-read-private',
        'user-read-email',
        'playlist-read-private',
        'playlist-read-collaborative',
        'playlist-modify-public',
        'playlist-modify-private',
        'user-library-read',
        'user-library-modify',
        'user-top-read',
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-read-currently-playing',
        'user-read-recently-played',
    ]
    console.log('CardAccountSpotify - redirectUri : ', redirectUri, ' - clientId : ', clientId)
    const scopeString = encodeURIComponent(scopes.join(' '))
    const spotify = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopeString}`

    useEffect(() => {
        const url = window.location.href
        const hasCode = url.includes('?code=')
        if (hasCode) {
            const newUrl = url.split('?code=')
            const authorizationCode = newUrl[1]
            console.log(authorizationCode)
            const token = getAccessToken(authorizationCode)
            console.log('CardAccountSpotify - token : ', token)
            // Envoyez `authorizationCode` au backend
        }
    }, [])

    const getAccessToken = async (authorizationCode) => {
        const params = new URLSearchParams()
        const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
        params.append('grant_type', 'authorization_code')
        params.append('code', authorizationCode)
        params.append('redirect_uri', redirectUri)

        const headers = {
            'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        try {
            const response = await axios.post('https://accounts.spotify.com/api/token', params, { headers: headers })
            sendTokenToBack('spotify', response.data.access_token)
            console.log(response.data)
            return response.data
        } catch (error) {
            console.error('There has been a problem with your axios operation:', error.message)
        }
    }

    return (
        <div className='mx-auto max-w-sm p-6 bg-white border border-gray-600 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <div className='flex items-center mb-4'>
                <div className='w-10 h-10 mb-3 rounded-full overflow-hidden shadow-md'>
                    <img src={process.env.PUBLIC_URL + '/Img/services/' + props.name + '.png'} alt='logo' />
                </div>
                <div className='ml-4'>
                    <h5 className='text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>
                        {props.name}
                    </h5>
                    {props.state ? <p className='text-gray-500'>Connected</p> : <p className='text-gray-500'>Not connected</p>}
                </div>
            </div>

            <p className='my-4 font-normal text-gray-500 dark:text-gray-400'>
                Unlock the potential about connecting <span className='font-bold'>{props.name}</span> with other apps!
            </p>
            {props.state ?
                <a onClick={() => handleDisconnect('spotify')} className='px-4 py-2 mt-2 text-sm font-medium tracking-wide text-red-600 capitalize transition-colors duration-200 transform bg-white border border-red-600 rounded-md hover:bg-red-600 hover:text-white focus:outline-none focus:bg-red-700 focus:text-white'>
                    Disconnect
                </a>
                :
                <a href={spotify} className='px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700'>
                    Connect
                </a>
            }
        </div>
    )
}

export const CardAccountDiscord = (props) => {
    const clientId = process.env.REACT_APP_DISCORD_CLIENT_ID
    const redirectUri = process.env.REACT_APP_LOCAL_URL_REDIRECT
    console.log('CardAccountDiscord - redirectUri : ', redirectUri, ' - clientId : ', clientId)
    const discord = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=identify%20email`
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        if (props.state !== true) {
            const url = window.location.href
            const hasCode = url.includes('?code=')

            if (hasCode) {
                const newUrl = url.split('?code=')
                const authorizationCode = newUrl[1]
                console.log(authorizationCode)
                const token = getAccessToken(authorizationCode)
                console.log('CardAccountDiscord - token : ', token)
                // Envoyez `authorizationCode` au backend
            }
        }
    }, [])


    const getAccessToken = async (authorizationCode) => {
        const params = new URLSearchParams()
        const clientId = process.env.REACT_APP_DISCORD_CLIENT_ID
        const clientSecret = process.env.REACT_APP_DISCORD_CLIENT_SECRET
        params.append('client_id', clientId)
        params.append('client_secret', clientSecret)
        params.append('grant_type', 'authorization_code')
        params.append('code', authorizationCode)
        params.append('redirect_uri', redirectUri)

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        try {
            const response = await axios.post('https://discord.com/api/oauth2/token', params, { headers: headers })
            console.log('CardAccountDiscord - response from discord oauth2 : ', response.data)
            sendTokenToBack('discord', response.data.access_token)
            return response.data
        } catch (error) {
            console.error('There has been a problem with your axios operation:', error.message)
        }
    }

    return (
        <div className='mx-auto max-w-sm p-6 bg-white border border-gray-600 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <div className='flex items-center mb-4'>
                <div className='w-10 h-10 mb-3 rounded-full overflow-hidden shadow-md'>
                    <img src={process.env.PUBLIC_URL + '/Img/services/' + props.name + '.png'} alt='logo' />
                </div>
                <div className='ml-4'>
                    <h5 className='text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>
                        {props.name}
                    </h5>
                    {props.state ? <p className='text-gray-500'>Connected</p> : <p className='text-gray-500'>Not connected</p>}
                </div>
            </div>

            <p className='my-4 font-normal text-gray-500 dark:text-gray-400'>
                Unlock the potential about connecting <span className='font-bold'>{props.name}</span> with other apps!
            </p>
            <div className='grid grid-cols-2'>
                <div>
                    {props.state ?
                        <a onClick={() => handleDisconnect('discord')} className='px-4 py-2 mt-2 text-sm font-medium tracking-wide text-red-600 capitalize transition-colors duration-200 transform bg-white border border-red-600 rounded-md hover:bg-red-600 hover:text-white focus:outline-none focus:bg-red-700 focus:text-white'>
                            Disconnect
                        </a>
                        :
                        <a href={discord} className='px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700'>
                            Connect
                        </a>
                    }
                </div>
                <div className='flex justify-end relative'>
                    <button onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} type="button" className="text-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-black dark:text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                        </svg>
                    </button>

                    {isHovered && (
                        <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}  data-popover id="popover-default" role="tooltip" className="absolute bottom-full z-10 inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
                            <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                                <h3 className="font-semibold text-gray-900 dark:text-white">Some help with &quot;webhooks&quot;</h3>
                            </div>
                            <div className="px-3 py-2">
                                <p>And here&apos;s some amazing content. It&apos;s very engaging. Right?</p>
                                <a className=' underline text-blue-600' href="https://support.discord.com/hc/fr/articles/228383668-Introduction-aux-Webhooks">Read more</a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// export const CardAccountGmail = (props) => {
//     const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
//     const redirectUri = process.env.REACT_APP_LOCAL_URL_REDIRECT
//     console.log(redirectUri, clientId)
//     // const calendar = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=https://www.googleapis.com/auth/calendar&access_type=offline`
//     const gmail = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=https://www.googleapis.com/auth/gmail.readonly&access_type=offline`
//     useEffect(() => {
//         if (props.state !== true) {
//             const url = window.location.href
//             const hasCode = url.includes('?code=')

//             if (hasCode) {
//                 const newUrl = url.split('?code=')
//                 const authorizationCode = newUrl[1]
//                 console.log(authorizationCode)
//                 const token = getAccessToken(authorizationCode)
//                 console.log('gmail', token)
//                 // Envoyez `authorizationCode` au backend
//             }
//         }
//     }, [])

//     const getAccessToken = async (authorizationCode) => {
//         const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
//         const clientSecret = process.env.REACT_APP_GOOGLE_CLIENT_SECRET
//         const redirectUri = process.env.REACT_APP_LOCAL_URL_REDIRECT

//         const params = new URLSearchParams()
//         params.append('client_id', clientId)
//         params.append('client_secret', clientSecret)
//         params.append('redirect_uri', redirectUri)
//         params.append('grant_type', 'authorization_code')
//         params.append('code', authorizationCode)

//         try {
//             const { data } = await axios.post('https://oauth2.googleapis.com/token', params)
//             sendTokenToBack('gmail', data.access_token)
//             return data.access_token
//         } catch (error) {
//             console.error('Erreur lors de la récupération du token d\'accès Gmail :', error.message)
//         }

//     }


//     return (
//         <div className='mx-auto max-w-sm p-6 bg-white border border-gray-600 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
//             <div className='flex items-center mb-4'>
//                 <div className='w-10 h-10 mb-3 rounded-full overflow-hidden shadow-md'>
//                     <img src={process.env.PUBLIC_URL + '/Img/services/' + props.name + '2' + '.png'} alt='logo' />
//                 </div>
//                 <div className='ml-4'>
//                     <h5 className='text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>
//                         {props.name}
//                     </h5>
//                     {props.state ? <p className='text-gray-500'>Connected</p> : <p className='text-gray-500'>Not connected</p>}
//                 </div>
//             </div>

//             <p className='my-4 font-normal text-gray-500 dark:text-gray-400'>
//                 Unlock the potential about connecting <span className='font-bold'>{props.name}</span> with other apps!
//             </p>
//             {props.state ?
//                 <a onClick={() => handleDisconnect('gmail')} className='px-4 py-2 mt-2 text-sm font-medium tracking-wide text-red-600 capitalize transition-colors duration-200 transform bg-white border border-red-600 rounded-md hover:bg-red-600 hover:text-white focus:outline-none focus:bg-red-700 focus:text-white'>
//                     Disconnect
//                 </a>
//                 :
//                 <a href={gmail} className='px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700'>
//                     Connect
//                 </a>
//             }
//         </div>
//     )
// }

export const CardAccountGmail = (props) => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
    const redirectUri = process.env.REACT_APP_LOCAL_URL_REDIRECT
    console.log(redirectUri, clientId)
    // const calendar = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=https://www.googleapis.com/auth/calendar&access_type=offline`
    const gmail = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=https://www.googleapis.com/auth/gmail.readonly&access_type=offline`
    useEffect(() => {
        if (props.state !== true) {
            const url = window.location.href
            const hasCode = url.includes('?code=')

            if (hasCode) {
                const newUrl = url.split('?code=')
                const authorizationCode = newUrl[1]
                console.log(authorizationCode)
                const token = getAccessToken(authorizationCode)
                console.log('gmail', token)
                // Envoyez `authorizationCode` au backend
            }
        }
    }, [])

    const getAccessToken = async (authorizationCode) => {
        const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
        const clientSecret = process.env.REACT_APP_GOOGLE_CLIENT_SECRET
        const redirectUri = process.env.REACT_APP_LOCAL_URL_REDIRECT

        const params = new URLSearchParams()
        params.append('client_id', clientId)
        params.append('client_secret', clientSecret)
        params.append('redirect_uri', redirectUri)
        params.append('grant_type', 'authorization_code')
        params.append('code', authorizationCode)

        try {
            const { data } = await axios.post('https://oauth2.googleapis.com/token', params)
            sendTokenToBack('gmail', data.access_token)
            return data.access_token
        } catch (error) {
            console.error('Erreur lors de la récupération du token d\'accès Gmail :', error.message)
        }

    }


    return (
        <div className='mx-auto max-w-sm p-6 bg-white border border-gray-600 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <div className='flex items-center mb-4'>
                <div className='w-10 h-10 mb-3 rounded-full overflow-hidden shadow-md'>
                    <img src={process.env.PUBLIC_URL + '/Img/services/' + props.name + '.png'} alt='logo' />
                </div>
                <div className='ml-4'>
                    <h5 className='text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>
                        {props.name}
                    </h5>
                    {props.status ? <p className='text-gray-500'>Connected</p> : <p className='text-gray-500'>Not connected</p>}
                </div>
            </div>

            <p className='my-4 font-normal text-gray-500 dark:text-gray-400'>
                Unlock the potential about connecting <span className='font-bold'>{props.name}</span> with other apps!
            </p>
            {props.state ?
                <a onClick={() => handleDisconnect('gmail')} className='px-4 py-2 mt-2 text-sm font-medium tracking-wide text-red-600 capitalize transition-colors duration-200 transform bg-white border border-red-600 rounded-md hover:bg-red-600 hover:text-white focus:outline-none focus:bg-red-700 focus:text-white'>
                    Disconnect
                </a>
                :
                <a href={gmail} className='px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700'>
                    Connect
                </a>
            }
        </div>
    )
}

export const CardAccountGithub = (props) => {
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID
    const redirectUri = process.env.REACT_APP_LOCAL_URL_REDIRECT
    console.log(redirectUri, clientId)
    const scopes = ['repo', 'user', 'notifications', 'read:org', 'gist', 'admin:org', 'read:repo_hook', 'read:public_key', 'read:gpg_key']
    const scopesString = scopes.join(',')
    const Github = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopesString}`
    useEffect(() => {
        if (props.state !== true) {
            const url = window.location.href
            const hasCode = url.includes('?code=')

            if (hasCode) {
                const newUrl = url.split('?code=')
                const authorizationCode = newUrl[1]
                console.log(authorizationCode)
                const token = getAccessToken(authorizationCode)
                console.info('github', token)
                // Envoyez `authorizationCode` au backend
            }
        }
    }, [])

    async function getAccessToken(code) {
        const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID
        const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
        const { data } = await axios({
            method: 'post',
            url: 'https://proxy.cors.sh/https://github.com/login/oauth/access_token',
            params: {
                client_id: clientId,
                client_secret: clientSecret,
                code: code,
            },
            headers: {
                'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
                'x-cors-api-key': 'temp_ca64b0ee259a4beaa963bef196559f90'
            }
        })

        console.log('getAccessToken - github : ', data)
        return data.access_token
    }


    return (
        <div className='mx-auto max-w-sm p-6 bg-white border border-gray-600 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <div className='flex items-center mb-4'>
                <div className='w-10 h-10 mb-3 rounded-full overflow-hidden shadow-md'>
                    <img src={process.env.PUBLIC_URL + '/Img/services/' + props.name + '.png'} alt='logo' />
                </div>
                <div className='ml-4'>
                    <h5 className='text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>
                        {props.name}
                    </h5>
                    {props.state ? <p className='text-gray-500'>Connected</p> : <p className='text-gray-500'>Not connected</p>}
                </div>
            </div>

            <p className='my-4 font-normal text-gray-500 dark:text-gray-400'>
                Unlock the potential about connecting <span className='font-bold'>{props.name}</span> with other apps!
            </p>
            {props.state ?
                <a onClick={() => handleDisconnect('slack')} className='px-4 py-2 mt-2 text-sm font-medium tracking-wide text-red-600 capitalize transition-colors duration-200 transform bg-white border border-red-600 rounded-md hover:bg-red-600 hover:text-white focus:outline-none focus:bg-red-700 focus:text-white'>
                    Disconnect
                </a>
                :
                <a href={Github} className='px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700'>
                    Connect
                </a>
            }
        </div>
    )
}

const ManageAccount = () => {
    const [stateDiscord, setStateDiscord] = useState(false)
    const [stateSpotify, setStateSpotify] = useState(false)
    const [stateGmail, setStateGmail] = useState(false)
    const [stateCalendar, setStateCalendar] = useState(false)
    const [stateGithub, setStateGithub] = useState(false)
    const [stateTranslate, setStateTranslate] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:3333/services/read', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                })
                console.log(response.data)
                if (response.data[0].discord_token !== null) {
                    setStateDiscord(true)
                }
                if (response.data[0].spotify_token !== null) {
                    setStateSpotify(true)
                }
                if (response.data[0].gmail_token !== null) {
                    setStateGmail(true)
                }
                if (response.data[0].translate_token !== null) {
                    setStateTranslate(true)
                }
                if (response.data[0].facebook_token !== null) {
                    setStateCalendar(true)
                }
                if (response.data[0].Github_token !== null) {
                    setStateGithub(true)
                }
                setStateGithub(false)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [])

    return (
        <div className='overflow-y-scroll no-scrollbar h-screen'>
            <NavigationApp />
            <div className='grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 w-full pt-16'>
                <div className='col-span-1 mx-auto my-5'>
                    <CardAccountDiscord name='Discord' state={stateDiscord} />
                </div>
                <div className='col-span-1 mx-auto my-5'>
                    <CardAccountSpotify name='Spotify' state={stateSpotify} />
                </div>
               
                <div className='col-span-1 mx-auto my-5'>
                    <CardAccountGmail name='Gmail' state={stateGmail} />
                </div>
                <div className='col-span-1 mx-auto my-5'>
                    <CardAccount name='Calendar' state={stateCalendar} />
                </div>
                <div className='col-span-1 mx-auto my-5'>
                    <CardAccountGithub name='Github' state={stateGithub} />
                </div>
                <div className='col-span-1 mx-auto my-5'>
                    <CardAccount name='Translate' state={stateTranslate} />
                </div>
                <div className='col-span-1 mx-auto my-5'>
                    <CardAccountChatgpt name='chatgpt' state={stateTranslate} />
                </div>
            </div>
        </div>
    )
}

export default ManageAccount