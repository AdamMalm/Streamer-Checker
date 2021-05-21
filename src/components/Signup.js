import React, {useRef, useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

const Signup = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleSubmit = async e => {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError('Failed to create an account')
        }

        setLoading(false)
    }

    return (
        <>
            <div className="signup-container">
                <h2>Sign Up</h2>
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
                    <div className="form-group">
                        <label htmlFor="password-confirm">Password Confirmation: </label>
                        <input type="password" name="password-confirm" ref={passwordConfirmRef} required/>
                    </div>
                    <input disabled={loading} type="submit" value="Submit" />
                </form>
            </div>
            <div>
                Already have an account? <Link to="/login">Log in</Link>
            </div>
        </>
    )
}

export default Signup
