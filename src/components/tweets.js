import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext'
import { auth, getUserFollowing } from "../firebase";
import { getTweets } from "../twitter";

const Tweets = () => {
    const { currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLoad = async e => {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            const following = await getUserFollowing(currentUser)
            setLoading(false)
            console.log(following)
        } catch {
            setError('Failed to load tweets')
            setLoading(false)
        }
        return
    }

    const handleClick = async () => {
        try {
            setError('')
            setLoading(true)
            await getTweets()
            setLoading(false)

            // Hämta in current user followers och jämför
                // if användaren redan följer: yeet
                // om användaren inte följer lägg till i databas
        } catch {
            setError('Failed to follow')
            setLoading(false)
        }

        
    }
    
    

    return (
        <>
            <Link to="/dashboard"><FaUserCircle className="profile-icon"/></Link>
            <div className="tweets-container" onClick={handleClick}>
            </div>
            <div className="tweets-following-container">
                <div className="tweets-following-switch">
                    <Link className="following-btn tweets-following" to="/following">Edit Following</Link>
                    <Link className="tweets-btn tweets-following" to="/tweets">See Tweets</Link>
                </div>
            </div>
        </>
    )
}

export default Tweets
