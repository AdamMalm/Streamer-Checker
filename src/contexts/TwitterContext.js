import React, { useContext, useState, useEffect } from 'react'
import { client } from '../twitter'

const TwitterContext = React.createContext();

export const useTwitter = () => {
    return useContext(TwitterContext)
}

const TwitterProvider = ({ children }) => {
    

    const value = {
        
    }

    return (
        <TwitterContext.Provider value={value}>
            {!loading && children}
        </TwitterContext.Provider>
    )
}

export default TwitterProvider
