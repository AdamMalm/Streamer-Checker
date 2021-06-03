import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Tweets = () => {
    return (
        <>
            <Link to="/dashboard"><FaUserCircle className="profile-icon"/></Link>
            <div className="tweets-container">
                
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
