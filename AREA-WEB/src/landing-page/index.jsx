import React from 'react'
import NavigationWeb from '../components/navigation-web.jsx'
import process from 'process'
import { Link } from 'react-router-dom'

export default function Home () {
    return (
        <div>
            <div>
                <NavigationWeb/>
            </div>
            <div className='pt-20 overflow-x-hidden'>
                <section data-aos="fade-down" data-aos-duration="1500" className="bg-white dark:bg-gray-900">
                    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                        <div className="mr-auto place-self-center lg:col-span-7">
                            <h1 className="max-w-2xl mb-6 text-5xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                                <span className='text-purple-600'>Area</span> the perfect tool for your business
                            </h1>
                            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                                Do you find yourself juggling between various platforms like Google, Discord, Slack, and Spotify, trying to manage actions and reactions? Simplify your digital experience with Area!
                            </p>
                            <Link to="/Register">
                                <a
                                    href="#"
                                    className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800"
                                >
                                Register
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"  className="w-5 h-5 ml-2 -mr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                    </svg>
                                </a>
                            </Link>
                            <Link to="/login">
                                <a
                                    href="#"
                                    className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-purple-600 border border-purple-300 rounded-lg focus:ring-4 focus:ring-purple-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                                >
                                Login
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"  className="w-5 h-5 ml-2 -mr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>

                                </a>
                            </Link>
                        </div>
                        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex h-full">
                            <img src={process.env.PUBLIC_URL + 'Img/screen.png'} alt="mockup" />
                        </div>
                    </div>
                </section>

                <section data-aos="fade-down" data-aos-duration="2000" className="bg-white dark:bg-gray-900">
                    <div className="py-8 lg:py-16 mx-auto max-w-screen-xl px-4">
                        <h2 className="mb-8 lg:mb-16 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 dark:text-white md:text-4xl">Parteners Applications</h2>
                        <div className="grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 md:grid-cols-3 lg:grid-cols-6 dark:text-gray-400">
                            <a href="#" className="flex justify-center items-center">
                                <svg className="h-9 hover:text-gray-900 dark:hover:text-white" viewBox="0 0 86 29" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.6008 10.2627V13.2312L18.6907 13.2281C18.4733 14.8653 17.9215 16.0641 17.0826 16.9031C16.0487 17.9378 14.4351 19.0766 11.6008 19.0766C7.23238 19.0766 3.81427 15.5531 3.81427 11.1808C3.81427 6.80853 7.23238 3.28487 11.6008 3.28487C13.9585 3.28487 15.6794 4.21232 16.9503 5.40473L19.0432 3.31011C17.2721 1.6161 14.9144 0.316406 11.6036 0.316406C5.62156 0.316406 0.589844 5.19338 0.589844 11.1808C0.589844 17.1682 5.62156 22.0451 11.6036 22.0451C14.8322 22.0451 17.2694 20.9852 19.1756 18.9979C21.1362 17.0356 21.7451 14.2818 21.7451 12.0546C21.7451 11.3921 21.6949 10.7802 21.5974 10.2627H11.6008ZM71.4046 21.6192V1.11445H68.4101V21.6192H71.4046ZM29.9511 22.0482C33.8151 22.0482 36.9643 19.0797 36.9643 15.0513C36.9643 10.9945 33.8151 8.05451 29.9511 8.05451C26.0857 8.05451 22.9365 10.9945 22.9365 15.0513C22.9365 19.0797 26.0857 22.0482 29.9511 22.0482ZM29.9511 10.8116C32.0691 10.8116 33.8945 12.534 33.8945 15.0513C33.8945 17.5404 32.0691 19.2911 29.9511 19.2911C27.833 19.2911 26.0076 17.5435 26.0076 15.0513C26.0076 12.534 27.833 10.8116 29.9511 10.8116ZM45.0825 22.0482C48.9465 22.0482 52.0957 19.0797 52.0957 15.0513C52.0957 10.9945 48.9465 8.05451 45.0825 8.05451C41.2171 8.05451 38.0679 10.9977 38.0679 15.0513C38.0679 19.0797 41.2171 22.0482 45.0825 22.0482ZM45.0825 10.8116C47.2005 10.8116 49.0259 12.534 49.0259 15.0513C49.0259 17.5404 47.2005 19.2911 45.0825 19.2911C42.9644 19.2911 41.139 17.5435 41.139 15.0513C41.139 12.534 42.9644 10.8116 45.0825 10.8116ZM66.5972 8.48038V21.0387C66.5972 26.2059 63.5512 28.3164 59.9519 28.3164C56.563 28.3164 54.523 26.0482 53.7539 24.1934L56.4265 23.0798C56.903 24.2186 58.0694 25.5624 59.9477 25.5624C62.2525 25.5624 63.6807 24.1397 63.6807 21.4615V20.4552H63.5734C62.8865 21.3037 61.5627 22.0451 59.892 22.0451C56.3958 22.0451 53.1923 18.9977 53.1923 15.0766C53.1923 11.1271 56.3958 8.05451 59.892 8.05451C61.5585 8.05451 62.8837 8.79579 63.5734 9.6192H63.6807V8.48038H66.5972ZM63.8981 15.0766C63.8981 12.6129 62.2553 10.8116 60.1651 10.8116C58.0471 10.8116 56.2732 12.6129 56.2732 15.0766C56.2732 17.5152 58.0471 19.2911 60.1651 19.2911C62.2553 19.2911 63.8981 17.5152 63.8981 15.0766ZM83.0747 17.3542L85.4575 18.9442C84.6883 20.083 82.835 22.0451 79.6315 22.0451C75.6602 22.0451 72.6935 18.9726 72.6935 15.0483C72.6935 10.8874 75.6853 8.05143 79.2887 8.05143C82.9172 8.05143 84.6911 10.941 85.2721 12.5026L85.5898 13.2976L76.2426 17.1713C76.9589 18.5751 78.0708 19.2912 79.6315 19.2912C81.1949 19.2912 82.2804 18.5215 83.0747 17.3542ZM75.7382 14.8369L81.9864 12.2407C81.6436 11.3668 80.6097 10.758 79.3918 10.758C77.8326 10.758 75.6602 12.1366 75.7382 14.8369Z" fill="currentColor"/>
                                </svg>
                            </a>
                            <a href="#" className="flex justify-center items-center">
                                <svg className=" hover:text-gray-900 dark:hover:text-white" width="64px" height="64px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>spotify [#162]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7479.000000)" fill="currentColor"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M99.915,7327.865 C96.692,7325.951 91.375,7325.775 88.297,7326.709 C87.803,7326.858 87.281,7326.58 87.131,7326.085 C86.981,7325.591 87.26,7325.069 87.754,7324.919 C91.287,7323.846 97.159,7324.053 100.87,7326.256 C101.314,7326.52 101.46,7327.094 101.196,7327.538 C100.934,7327.982 100.358,7328.129 99.915,7327.865 L99.915,7327.865 Z M99.81,7330.7 C99.584,7331.067 99.104,7331.182 98.737,7330.957 C96.05,7329.305 91.952,7328.827 88.773,7329.792 C88.36,7329.916 87.925,7329.684 87.8,7329.272 C87.676,7328.86 87.908,7328.425 88.32,7328.3 C91.951,7327.198 96.466,7327.732 99.553,7329.629 C99.92,7329.854 100.035,7330.334 99.81,7330.7 L99.81,7330.7 Z M98.586,7333.423 C98.406,7333.717 98.023,7333.81 97.729,7333.63 C95.381,7332.195 92.425,7331.871 88.944,7332.666 C88.609,7332.743 88.274,7332.533 88.198,7332.197 C88.121,7331.862 88.33,7331.528 88.667,7331.451 C92.476,7330.58 95.743,7330.955 98.379,7332.566 C98.673,7332.746 98.766,7333.129 98.586,7333.423 L98.586,7333.423 Z M94,7319 C88.477,7319 84,7323.477 84,7329 C84,7334.523 88.477,7339 94,7339 C99.523,7339 104,7334.523 104,7329 C104,7323.478 99.523,7319.001 94,7319.001 L94,7319 Z" id="spotify-[#162]"> </path> </g> </g> </g> </g></svg>
                            </a>

                            <a href="#" className="flex justify-center items-center">
                                <svg className=" hover:text-gray-900 dark:hover:text-white" width="64px" height="64px" viewBox="0 -28.5 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" fill="currentColor"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" fill="currentColor" fillRule="nonzero"> </path> </g> </g></svg>
                            </a>
                            <a href="#" className="flex justify-center items-center">
                                <svg className=" hover:text-gray-900 dark:hover:text-white" width="64px" height="64px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>github [#142]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="currentColor" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)" fill="currentColor"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399" id="github-[#142]"> </path> </g> </g> </g> </g></svg>
                            </a>
                            <a href="#" className="flex justify-center items-center">
                                <svg className=" hover:text-gray-900 dark:hover:text-white" fill="currentColor" height="64px" width="64px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 228.403 228.403" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M215.428,73.112h-79.797l-12.998-56.41H12.977C5.821,16.701,0,22.523,0,29.678v112.637c0,7.155,5.821,12.977,12.977,12.977 h79.794l12.999,56.41h109.659c7.154,0,12.975-5.821,12.975-12.977V86.088C228.403,78.933,222.583,73.112,215.428,73.112z M15,140.291V31.701h95.696l25.022,108.59H15z M108.164,155.291h28.195l-21.134,30.643L108.164,155.291z M213.403,196.701H126.02 l16.195-23.481l2.458,4.004c9.801-6.018,17.538-13.048,23.646-20.203l18.985,19.366l7.856-7.701l-20.103-20.506 c8.455-12.449,12.418-24.163,14.078-30.381h12.897v-11h-27.322v-6.555h-11v6.555h-20.317l-4.306-18.688h74.314V196.701z M154.565,155.291h0.003l-3.705-16.078l9.689,9.883c-1.989,2.39-4.18,4.765-6.588,7.089l0.611-0.887L154.565,155.291z M154.44,127.148l-5.186,5.084l-3.326-14.433h31.73c-1.684,5.371-4.87,13.541-10.514,22.309L154.44,127.148z M67.831,78.495h37.074 v7.5c0,20.442-16.631,37.074-37.074,37.074s-37.074-16.632-37.074-37.074c0-20.442,16.631-37.073,37.074-37.073 c8.261,0,16.077,2.658,22.603,7.686l-9.155,11.883c-3.878-2.989-8.528-4.568-13.448-4.568c-12.171,0-22.074,9.902-22.074,22.073 c0,12.172,9.902,22.074,22.074,22.074c9.539,0,17.685-6.084,20.762-14.574H67.831V78.495z"></path> </g></svg>
                            </a>
                            <a href="#" className="flex justify-center items-center">
                                <svg className=" hover:text-gray-900 dark:hover:text-white" fill="currentColor" width="64px" height="64px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><title>OpenAI icon</title><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"></path></g></svg>
                            </a>
                        </div>
                    </div>
                </section>

                <br />

                <section data-aos="fade-left" className="bg-white dark:bg-gray-900 my-10">
                    <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                        <img className="w-full dark:hidden" src={process.env.PUBLIC_URL + 'Img/dashboard.png'} alt="dashboard image"/>
                        <img className="w-full hidden dark:block" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg" alt="dashboard image"/>
                        <div className="mt-4 md:mt-0">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">One page to manage all your actions.</h2>
                            <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">Area helps you organize your actions reactions across all your applications essential to your business. You&apos;ll find all your actions in the dashboard.</p>
                            <a href="#" className="inline-flex items-center text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-purple-900">
                                Get started
                                <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </a>
                        </div>
                    </div>
                </section>

                <section data-aos="fade-right" data-aos-anchor-placement="top-center" className="bg-white dark:bg-gray-900 my-10">
                    <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                        <div className='col-start-2 row-start-1'>
                            <img className="w-full dark:hidden" src={process.env.PUBLIC_URL + 'Img/accounts.png'} alt="Account image"/>
                            <img className="w-full hidden dark:block" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg" alt="dashboard image"/>
                        </div>
                        <div className="mt-4 md:mt-0 col-start-0 row-start-1 text-right">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">All your favorite app in same page.</h2>
                            <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">Flowbite helps you connect with friends and communities of people who share your interests. Connecting with your friends and family as well as discovering new ones is easy with features like Groups.</p>
                            <a href="#" className="inline-flex items-center text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-purple-900">
                                Get started !
                                <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </a>
                        </div>
                    </div>
                </section>

                <section className="bg-white dark:bg-gray-900">
                    <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                        <div data-aos="fade-right" className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Integrate and Innovate</h2>
                            <p className="mb-4">Bring your digital world together. Integrate seamlessly with popular services and explore endless possibilities for automation. Area empowers you to be the architect of your digital space.</p>
                            <p>We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <img data-aos="zoom-out" className="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1" />
                            <img data-aos="zoom-out" className="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2" />
                        </div>
                    </div>
                </section>
               
                <section className="bg-white dark:bg-gray-900">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Designed for business teams like yours</h2>
                            <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Here at Area we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
                        </div>
                        <div data-aos="fade-down" data-aos-duration="2000" data-aos-anchor-placement="top-center" className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                            <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                                <h3 className="mb-4 text-2xl font-semibold">Starter</h3>
                                <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best option for personal use & for your next project.</p>
                                <div className="flex justify-center items-baseline my-8">
                                    <span className="mr-2 text-5xl font-extrabold">$0</span>
                                    <span className="text-gray-500 dark:text-gray-400">/month</span>
                                </div>
                                <ul role="list" className="mb-8 space-y-4 text-left">
                                    <li className="flex items-center space-x-3">
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span>Individual configuration</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span>No setup, or hidden fees</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span>Team size: <span className="font-semibold">1 developer</span></span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span>Number of authorized actions: <span className="font-semibold">4</span></span>
                                    </li>
                                </ul>
                                <a href="#" className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-purple-900">Get started</a>
                            </div>
                            <div data-aos="fade-down" data-aos-duration="2000" data-aos-anchor-placement="top-center" className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                                <h3 className="mb-4 text-2xl font-semibold">Company</h3>
                                <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Relevant for multiple users, extended & premium support.</p>
                                <div className="flex justify-center items-baseline my-8">
                                    <span className="mr-2 text-5xl font-extrabold">$19</span>
                                    <span className="text-gray-500 dark:text-gray-400">/month</span>
                                </div>
                                <ul role="list" className="mb-8 space-y-4 text-left">
                                    <li className="flex items-center space-x-3">
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span>Individual configuration</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span>No setup, or hidden fees</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span>Team size: <span className="font-semibold">10 developers</span></span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span>Number of authorized actions: <span className="font-semibold">20</span></span>
                                    </li>
                                </ul>
                                <a href="#" className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-purple-900">Get started</a>
                            </div>
                            <div data-aos="fade-down" data-aos-duration="2000" data-aos-anchor-placement="top-center" className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                                <h3 className="mb-4 text-2xl font-semibold">Enterprise</h3>
                                <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best for large scale uses and extended redistribution rights.</p>
                                <div className="flex justify-center items-baseline my-8">
                                    <span className="mr-2 text-5xl font-extrabold">$99</span>
                                    <span className="text-gray-500 dark:text-gray-400">/month</span>
                                </div>
                                <ul role="list" className="mb-8 space-y-4 text-left">
                                    <li className="flex items-center space-x-3">
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span>Individual configuration</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span>No setup, or hidden fees</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span>Team size: <span className="font-semibold">100+ developers</span></span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span>Number of authorized actions: <span className="font-semibold">∞</span></span>
                                    </li>
                                </ul>
                                <a href="#" className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-purple-900">Get started</a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white dark:bg-gray-900">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
                        <div className="mx-auto max-w-screen-sm">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Testimonials</h2>
                            <p className="mb-8 font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">Explore the whole collection of open-source web components and elements built with the utility classes from Tailwind</p>
                        </div> 
                        <div className="grid mb-8 lg:mb-12 lg:grid-cols-2">
                            <figure data-aos="fade-right" data-aos-duration="1500" className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 md:p-12 lg:border-r dark:bg-gray-800 dark:border-gray-700">
                                <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Transforming chaos into efficiency! Area is the magic wand every multitasker needs. My digital life has never been more organized.</h3>
                                    <p className="my-4">&quot;As a busy digital marketer, Area has been a game-changer! It&apos;like having a personal assistant for all my online tasks. The ability to seamlessly connect and automate actions across Google, Discord, Slack, and Spotify has significantly boosted my efficiency. I can&apos;t imagine managing my campaigns without it.&quot;</p>
                                </blockquote>
                                <figcaption className="flex justify-center items-center space-x-3">
                                    <img className="w-9 h-9 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png" alt="profile picture"/>
                                    <div className="space-y-0.5 font-medium dark:text-white text-left">
                                        <div>Bonnie Green</div>
                                        <div className="text-sm font-light text-gray-500 dark:text-gray-400">Digital Marketing Expert</div>
                                    </div>
                                </figcaption>    
                            </figure>
                            <figure data-aos="fade-left" data-aos-duration="1500" className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 md:p-12 dark:bg-gray-800 dark:border-gray-700">
                                <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Innovate, Integrate, Automate – Area is my secret weapon for a seamless digital experience. It&apos;s not just an app; it&apos;s a game-changer!</h3>
                                    <p className="my-4">&quot;I&apos;ve tried numerous automation tools, but Area stands out. The simplicity of creating custom actions and reactions is impressive. Whether it&apos;s syncing my calendar events or curating Spotify playlists automatically, this app has become an integral part of my tech toolkit. It just works!&quot;</p>
                                </blockquote>
                                <figcaption className="flex justify-center items-center space-x-3">
                                    <img className="w-9 h-9 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png" alt="profile picture"/>
                                    <div className="space-y-0.5 font-medium dark:text-white text-left">
                                        <div>Roberta Casas</div>
                                        <div className="text-sm font-light text-gray-500 dark:text-gray-400">Tech Enthusiast</div>
                                    </div>
                                </figcaption>    
                            </figure>
                            <figure data-aos="fade-right" data-aos-duration="1500" className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 lg:border-b-0 md:p-12 lg:border-r dark:bg-gray-800 dark:border-gray-700">
                                <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Unlocking the potential of my favorite platforms has never been easier. Area turns every interaction into a masterpiece. The future of productivity is here!</h3>
                                    <p className="my-4">&quot;Being a content creator means wearing many hats. Area has simplified my workflow by allowing me to streamline interactions across various platforms. The centralized dashboard and the ability to create tailored actions have saved me time and brought a level of consistency to my content distribution. Highly recommended!&quot;</p>
                                </blockquote>
                                <figcaption className="flex justify-center items-center space-x-3">
                                    <img className="w-9 h-9 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="profile picture"/>
                                    <div className="space-y-0.5 font-medium dark:text-white text-left">
                                        <div>Jese Leos</div>
                                        <div className="text-sm font-light text-gray-500 dark:text-gray-400">Content Creator</div>
                                    </div>
                                </figcaption>    
                            </figure>
                            <figure data-aos="fade-left" data-aos-duration="1500" className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-gray-200 md:p-12 dark:bg-gray-800 dark:border-gray-700">
                                <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">From login to automation, Area is the VIP pass to my digital world. Simplify, customize, conquer – it&quot;s a revolution in digital management!</h3>
                                    <p className="my-4">&quot;I love discovering new music, and Area has added a new layer to my music exploration. The ease with which I can set up reactions on Spotify based on my preferences is incredible. It&apos;s like having my own DJ assistant, always keeping the tunes flowing. Kudos to the team behind this awesome app!&quot;</p>
                                </blockquote>
                                <figcaption className="flex justify-center items-center space-x-3">
                                    <img className="w-9 h-9 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png" alt="profile picture"/>
                                    <div className="space-y-0.5 font-medium dark:text-white text-left">
                                        <div>Joseph McFall</div>
                                        <div className="text-sm font-light text-gray-500 dark:text-gray-400">Music Enthusiast</div>
                                    </div>
                                </figcaption>    
                            </figure>
                        </div>
                    </div>
                </section>

                <footer className="p-4 bg-white sm:p-6 dark:bg-gray-800 border-t">
                    <div className="mx-auto max-w-screen-xl">
                        <div className="md:flex md:justify-between">
                            <div className="mb-6 md:mb-0">
                                <a href="https://Area.com" className="flex items-center">
                                    <img
                                        src={process.env.PUBLIC_URL + '/Img/logo.png'}
                                        className="mr-3 h-20"
                                        alt="Area Logo"
                                    />
                                    <span className="self-center text-4xl text-purple-600 font-semibold whitespace-nowrap dark:text-white">
                                        Area
                                    </span>
                                </a>
                            </div>
                            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                                <div>
                                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                                        Resources
                                    </h2>
                                    <ul className="text-gray-600 dark:text-gray-400">
                                        <li className="mb-4">
                                            <a href="https://Area.com" className="hover:underline">
                                                Area
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://tailwindcss.com/"
                                                className="hover:underline"
                                            >
                                                Tailwind CSS
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                                        Follow us
                                    </h2>
                                    <ul className="text-gray-600 dark:text-gray-400">
                                        <li className="mb-4">
                                            <a
                                                href="https://github.com/themesberg/Area"
                                                className="hover:underline "
                                            >
                                                Github
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://discord.gg/4eeurUVvTy"
                                                className="hover:underline"
                                            >
                                                Discord
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                                        Legal
                                    </h2>
                                    <ul className="text-gray-600 dark:text-gray-400">
                                        <li className="mb-4">
                                            <a href="#" className="hover:underline">
                                                Privacy Policy
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="hover:underline">
                                                Terms &amp; Conditions
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                        <div className="sm:flex sm:items-center sm:justify-between">
                            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                                © 2022{' '}
                                <a href="https://Area.com" className="hover:underline">
                                     Area™
                                </a>
                                . All Rights Reserved.
                            </span>
                            <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                                <a
                                    href="#"
                                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        {/* ... (GitHub icon path) */}
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        {/* ... (Twitter icon path) */}
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

