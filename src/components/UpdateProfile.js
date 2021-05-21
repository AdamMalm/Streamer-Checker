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
            <div className="signup-container">
                <h2>Update Profile</h2>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" ref={emailRef} defaultValue={currentUser.email}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" ref={passwordRef} placeholder="Leave blank to keep the same" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password-confirm">Password Confirmation: </label>
                        <input type="password" name="password-confirm" ref={passwordConfirmRef} placeholder="Leave blank to keep the same" />
                    </div>
                    <input disabled={loading} type="submit" value="Update" />
                </form>
            </div>
            <div>
                <Link to="/">Cancel</Link>
            </div>
        </>
    )
}

export default UpdateProfile
