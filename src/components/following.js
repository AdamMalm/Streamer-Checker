import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';



const Following = () => {
    return (
        <>
            <Link to="/dashboard"><FaUserCircle className="profile-icon"/></Link>
            <div className="following-container">
                
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
