require('dotenv/config');

const Twitter = require('twitter');

const apiKey = process.env.TWITTER_CONSUMER_KEY
const apiSecretKey = process.env.TWITTER_CONSUMER_SECRET
const accessToken = process.env.TWITTER_ACCESS_TOKEN
const accessTokenSecret = process.env.TWITTER_ACCESS_SECRET

const client = new Twitter({
    consumer_key: apiKey,
    consumer_secret: apiSecretKey,
    access_token: accessToken,
    access_secret: accessTokenSecret
})

export default client

export const getTweets = async () => {
    var params = {screen_name: "k3soju"}

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(tweets)
        }
    })
}