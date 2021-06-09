import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseUrl: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
})

export const auth = app.auth()
export const firestore = app.firestore()
export default app

export const createUserDocument = async (user, additionalData) => {
    if (!user) return

    const userRef = firestore.doc(`users/${user.user.uid}`)
    const snapshot = await userRef.get()

    if (!snapshot.exists) {
        const email = user.user.email;
        const following = additionalData;

        try {
            userRef.set({
                email,
                following,
                createdAt: new Date()
            })
        } catch(error) {
            console.log("Error in creating user", error)
        }
    }
}

export const addUserFollowing = async (user, additionalData) => {
    if (!user) return
    
    const followRef = firestore.doc(`users/${user.uid}`)
    const snapshot = await followRef.get()

    if (!snapshot.exists) return

    try {
        firestore.doc(`users/${user.uid}`)
            .update({
                following: firebase.firestore.FieldValue.arrayUnion(additionalData)
            })
    } catch(error) {
        console.log("Error in adding follower", error)
    }
}

export const getUserFollowing = async (user) => {
    if (!user) return

    const followRef = firestore.doc(`users/${user.uid}`)
    const snapshot = await followRef.get()

    try {
        if (snapshot.exists) {
            return snapshot.data().following
        }
    } catch {
        console.log("Error in returning data")
        return
    }
}