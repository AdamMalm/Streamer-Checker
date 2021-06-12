import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext'
import { auth, getUserFollowing } from "../firebase";
import { getTweets } from "../twitter";
import socketIOClient from "socket.io-client";
import Tweet from "./Tweet";

const Tweets = () => {
    const { currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [tweetList, setTweetList] = useState([])

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
    

    useEffect(() => {
        const socket = socketIOClient("http://localhost:3000/");
        
        socket.on('connect', () => {
            console.log("Socket Connected");
        })
        socket.on('tweet', (tweet) => {
            const tweetData = [{
                id: tweet.data.id,
                text: tweet.data.text,
                username: `@${tweet.includes.users[0].username}`
            }]
            setTweetList(tweetList => [...tweetList, tweetData]);
        })
        socket.on('disconnect', () => {
            console.log("Socket Disconnected");
        })

        return () => socket.disconnect();
    })
    
    return (
        <>
            <Link to="/dashboard"><FaUserCircle className="profile-icon"/></Link>
            <div className="tweets-container">
                <ul>
                    {
                        tweetList.map((item, index) => {
                            return (<li key={index}><Tweet id={item[0].id} text={item[0].text} username={item[0].username}/></li>)
                        })
                    }
                </ul>
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
