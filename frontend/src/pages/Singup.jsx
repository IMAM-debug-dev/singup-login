import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import { dataContext } from '../context/usercontext'

const Singup = () => {

  let { serverUrl } = useContext(dataContext)

  let [firstname, setFirstname] = useState('')
  let [lastname, setLastname] = useState('')
  let [username, setUsername] = useState('')
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let file = useRef(null)
  let [frontendImage, setFrontendImage] = useState(null)

  const handleSignup = async (e) => {
  e.preventDefault()

  console.log("Form Data:", {
    firstname,
    lastname,
    username,
    email,
    password
  })

  if (!firstname || !lastname || !username || !email || !password) {
    return console.log("Please fill all details")
  }

  try {
    let userdata = await axios.post(
      serverUrl + "/api/signup",
      {
        firstname,
        lastname,
        username,
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
function handelimg() {
  file.current.click()
}

function handleImage(e) {
  let selectedFile = e.target.files[0]

  if (selectedFile) {
    setFrontendImage(URL.createObjectURL(selectedFile))
  }
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 p-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
                {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4">

        {/* Header */}
        <div className="text-center mb-7">

                                  <div onClick={handelimg} className="cursor-pointer">
  <img
   src={frontendImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
    alt="Profile"
    className="w-24 h-24 rounded-full mx-auto border-4 border-cyan-500 shadow-md object-cover"
  />
</div>
          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Sign up to get started!
          </p>

        </div>



                   <input
  type="file"
  accept="image/*"
  hidden
  ref={file}
  onChange={handleImage}
/>
          <div className="flex gap-3">

            <input
              type="text"
              placeholder="First Name"
              className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />

            <input
              type="text"
              placeholder="Last Name"
              className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />

          </div>

          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

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
            Sign Up
          </button>

        </form>

        {/* Login Link */}
        <div className="text-center mt-6">

          <span className="text-gray-600">
            Already have an account?
          </span>

          <Link
            to="/login"
            className="text-cyan-600 font-bold ml-2 hover:underline"
          >
            Login
          </Link>

        </div>

      </div>

    </div>
  )
}

export default Singup
