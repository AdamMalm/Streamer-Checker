import React, {useRef, useState} from 'react'
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { auth, addUserFollowing } from "../firebase";
import { useAuth } from '../contexts/AuthContext'

const Following = () => {
    const followRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { currentUser } = useAuth()

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await addUserFollowing(currentUser, followRef.current.value)

            // Hämta in current user followers och jämför
                // if användaren redan följer: yeet
                // om användaren inte följer lägg till i databas
        } catch {
            setError('Failed to follow')
        }

        setLoading(false)
    }

    return (
        <>
            <Link to="/dashboard"><FaUserCircle className="profile-icon"/></Link>
            <div className="following-container">
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input className="follow" type="text" name="follow" placeholder="Follow someone new..." ref={followRef}/>
                    </div>
                    <input className="form-btn" disabled={loading} type="submit" value="Add" />
                </form>
            </div>
            <div className="following-tweets-container">
                <div className="following-tweets-switch">
                    <Link className="following-btn following-tweets" to="/following">Edit Following</Link>
                    <Link className="tweets-btn following-tweets" to="/tweets">See Tweets</Link>
                </div>
            </div>
        </>
    )
}

export default Following
