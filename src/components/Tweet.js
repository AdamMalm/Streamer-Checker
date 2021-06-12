import React from 'react'

const Tweet = ({ id, text, username}) => {
    return (
        <div className="tweet-container">
            <p>{id}</p>
            <hr/>
            <p>{text}</p>
            <hr/>
            <p>{username}</p>
        </div>
    )
}

export default Tweet
