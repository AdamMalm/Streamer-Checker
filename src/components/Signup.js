import React, {useRef, useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { createUserDocument } from '../firebase'

const Signup = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [following, setFollowing] = useState([])

    const handleSubmit = async e => {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            const user = await signup(emailRef.current.value, passwordRef.current.value)
            await createUserDocument( user, following)
            setLoading(false)
            history.push("/tweets")
        } catch {
            setError('Failed to create an account')
            setLoading(false)
        }
    }

    return (
        <>
            <div className="signup-container">
                {error && <p>{error}</p>}
                <div className="login-signup-switch">
                    <Link className="login-btn login-signup" to="/login">Log in</Link>
                    <Link className="signup-btn login-signup" to="/signup">Sign Up</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="email" name="email" placeholder="Email" ref={emailRef}/>
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" placeholder="Password" ref={passwordRef} required/>
                    </div>
                    <div className="form-group">
                        <input type="password" name="password-confirm" placeholder="Confirm passoword" ref={passwordConfirmRef} required/>
                    </div>
                    <input className="form-btn" disabled={loading} type="submit" value="Submit" />
                </form>
            </div>
        </>
    )
}

export default Signup
