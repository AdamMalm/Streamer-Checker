import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

const Dashboard = () => {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    const handleLogout = async () => {
        setError('')

        try {
            await logout()
            history.push('/login')
        } catch {
            setError('Failed to log out')
        }
    }

    return (
        <>
            <div className="dashboard-container">
                <div className="dashboard-body">
                    <h2>Profile</h2>
                    {error && <p>{error}</p>}
                    <strong>Email:</strong> {currentUser.email}
                    <Link to="/update-profile">Update Profile</Link>
                </div>
            </div>
            <div>
                <button variant="link" onClick={handleLogout}>Log Out</button>
            </div>
        </>
    )
}

export default Dashboard
