import React, { useContext, useState } from 'react'
import { dataContext } from '../context/usercontext'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Login = () => {
  let { serverUrl } = useContext(dataContext)

  
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')

  const handleSignup = async (e) => {
  e.preventDefault()

  console.log("Form Data:", {
    
    email,
    password
  })

  if ( !email || !password) {
    return console.log("Please fill all details")
  }

  try {
    let userdata = await axios.post(
      serverUrl + "/api/login",
      {
       
        email,
        password
      },
      { withCredentials: true }
    )

    console.log(userdata.data)

  } catch (error) {
    console.log(error.response?.data || error.message)
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 p-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        {/* Header */}
        <div className="text-center mb-7">

        

          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            Login
          </h1>

        

        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4">

          

           

          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-lg"
          >
            login
          </button>

        </form>
        {/* Login Link */}
                <div className="text-center mt-6">

  <span className="text-gray-600">
    Don't have an account?
  </span>

  <Link
    to="/singup"
    className="text-cyan-600 font-bold ml-2 hover:underline"
  >
    Sign Up
  </Link>

</div>
        
      </div>

    </div>
  )
}

export default Login
