require('dotenv/config');

const Twitter = require('twitter');

const apiKey = process.env.TWITTER_CONSUMER_KEY
const apiSecretKey = process.env.TWITTER_CONSUMER_SECRET
const accessToken = process.env.TWITTER_ACCESS_TOKEN
const bearerToken = process.env.TWITTER_BEARER_TOKEN
const accessTokenSecret = process.env.TWITTER_ACCESS_SECRET

const client = new Twitter({
    consumer_key: apiKey,
    consumer_secret: apiSecretKey,
    access_token: accessToken,
    bearer_token: bearerToken,
    access_secret: accessTokenSecret
})

export default client

export const getTweets = async () => {
    var params = {screen_name: "k3soju"}

    try {
    await client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            return tweets
        }
    })
    } catch(error) {
        console.log("Error in getting user tweets", error)
        return
    }
}


