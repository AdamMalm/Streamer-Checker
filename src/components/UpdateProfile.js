import React, {useRef, useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

const UpdateProfile = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updateEmail, updatePassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        const promises = []
        setLoading(true)
        setError("")

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push("/")
        }).catch(() => {
            setError("Failed to update account")
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <>
            <div className="update-container">
                <h2>Update Profile</h2>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="email" name="email" ref={emailRef} placeholder="Email" defaultValue={currentUser.email}/>
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" ref={passwordRef} placeholder="Password, leave blank to keep the same" />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password-confirm" ref={passwordConfirmRef} placeholder="Password, leave blank to keep the same" />
                    </div>
                    <input className="form-btn" disabled={loading} type="submit" value="Update" />
                </form>
            </div>
            <div>
                <Link to="/dashboard">Cancel</Link>
            </div>
        </>
    )
}

export default UpdateProfile
