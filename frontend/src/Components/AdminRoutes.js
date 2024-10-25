import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function AdminRoutes({ children }) {
    const { userInfo } = useSelector(state => state.user)
    return userInfo && userInfo.isAdmin ? children : <Navigate to='signin' />

}
