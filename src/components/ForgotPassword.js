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
            <div className="forgotPassword-container">
                <h2>Password Reset</h2>
                {error && <p>{error}</p>}
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="email" name="email" placeholder="Email..." ref={emailRef}/>
                    </div>
                    <input className="form-btn" disabled={loading} type="submit" value="Reset Password" />
                </form>
                <div>
                    <Link className="login-btn" to='/login'>Log In</Link>
                </div>
            </div>
            <div className="signup-div">
                Need an an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}

export default ForgotPassword