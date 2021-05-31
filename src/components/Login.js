import React, {useRef, useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import Background from './Background'

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError('Failed to log in')
        }

        setLoading(false)
    }

    return (
        <>
            <div className="login-container">
                {error && <p>{error}</p>}
                <div className="login-signup-switch">
                    <Link className="login-btn login-signup" to="/login">Log in</Link>
                    <Link className="signup-btn login-signup" to="/signup">Sign Up</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input className="email" type="email" name="email" placeholder="Enter email" ref={emailRef}/>
                    </div>
                    <div className="form-group">
                        <input className="password" type="password" name="password" placeholder="Enter password" ref={passwordRef} required/>
                    </div>
                    <input className="form-btn" disabled={loading} type="submit" value="Log In" />
                </form>
                <div>
                    <Link className="forgot-password" to='/forgot-password'>Forgot Password?</Link>
                </div>
            </div>
        </>
    )
}

export default Login