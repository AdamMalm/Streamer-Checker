import React, {useRef, useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions')
        } catch {
            setError('Failed to reset password')
        }

        setLoading(false)
    }

    return (
        <>
            <div className="ForgotPassword-container">
                <h2>Password Reset</h2>
                {error && <p>{error}</p>}
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" ref={emailRef}/>
                    </div>
                    <input disabled={loading} type="submit" value="Reset Password" />
                </form>
                <div>
                    <Link to='/login'>Log In</Link>
                </div>
            </div>
            <div>
                Need an an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}

export default ForgotPassword