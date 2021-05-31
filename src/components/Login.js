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
            <Background>
                <div className="login-container">
                    <h2>Log In</h2>
                    {error && <p>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input type="email" name="email" ref={emailRef}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password: </label>
                            <input type="password" name="password" ref={passwordRef} required/>
                        </div>
                        <input disabled={loading} type="submit" value="Log In" />
                    </form>
                    <div>
                        <Link to='/forgot-password'>Forgot Password?</Link>
                    </div>
                </div>
                <div>
                    Need an an account? <Link to="/signup">Sign Up</Link>
                </div>
            </Background>
        </>
    )
}

export default Login