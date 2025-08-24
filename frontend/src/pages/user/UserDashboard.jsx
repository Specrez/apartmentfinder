import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserDashboard = () => {
  const navigate = useNavigate()
  
  // Redirect users to the home page (browse page) when they access /user
  useEffect(() => {
    navigate('/')
  }, [navigate])

  return null
}

export default UserDashboard
