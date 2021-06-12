const express = require("express");
const needle = require("needle")
const TOKEN = process.env.TWITTER_BEARER_TOKEN

module.exports = (needle, io) => {
  const rulesURL = 'https://api.twitter.com/2/tweets/search/stream/rules'
  const streamURL = 'https://api.twitter.com/2/tweets/search/stream?tweet.fields=public_metrics&expansions=author_id'
  const endpointURL = 'https://api.twitter.com/2/users/by?usernames='
  
  
  const rules = [{ value: "Twitch"}]
  const ids = []
  const userId = "724054761780203521"

  const url = `https://api.twitter.com/2/users/${userId}/tweets`;
  
  // Get stream rules
  const getRules = async () => {
      const response = await needle("get", rulesURL, {
          headers: {
              Authorization: `Bearer ${TOKEN}`,
          },
      })
      return response.body
  }
  
  // Set stream rules
  const setRules = async () => {
      const data = {
          add: rules,
      }
  
      const response = await needle("post", rulesURL, data, {
          headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${TOKEN}`,
          },
      })
      return response.body
  }
  
  // Delete stream rules
  const deleteRules = async (rules) => {
      if (!Array.isArray(rules.data)) {
          return null
      }
  
      const ids = rules.data.map((rule) => rule.id)
  
      const data = {
          delete: {
              ids: ids
          }
      }
  
      const response = await needle("post", rulesURL, data, {
          headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${TOKEN}`,
          },
      })
      return response.body
  }
  
  function streamTweets(socket) {
    const stream = needle.get(streamURL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
  
    stream.on('data', (data) => {
      try {
        const json = JSON.parse(data)
        console.log(json)
        socket.emit('tweet', json)
      } catch (error) {}
    })
  
    return stream
  }

  const getRequest = async () => { 
    // These are the parameters for the API request
    // specify User names to fetch, and any additional fields that are required
    // by default, only the User ID, name and user name are returned
    const params = {
      usernames: "k3soju", // Edit usernames to look up
      "user.fields": "created_at,description", // Edit optional query parameters here
      "expansions": "pinned_tweet_id"
    }

    // this is the HTTP header that adds bearer token authentication
    const res = await needle('get', endpointURL, params, {
        headers: {
            "User-Agent": "v2UserLookupJS",
            "authorization": `Bearer ${TOKEN}`
        }
    })

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request')
    }
  }

  const getUserTweets = async () => {
    let userTweets = [];

    // we request the author_id expansion so that we can print out the user name later
    let params = {
        "max_results": 5,
        "tweet.fields": "created_at",
        "expansions": "author_id"
    }

    const options = {
        headers: {
            "User-Agent": "v2UserTweetsJS",
            "authorization": `Bearer ${TOKEN}`
        }
    }

    let hasNextPage = true;
    let nextToken = null;
    let userName;
    console.log("Retrieving Tweets...");

    while (hasNextPage) {
        let resp = await getPage(params, options, nextToken);
        if (resp && resp.meta && resp.meta.result_count && resp.meta.result_count > 0) {
            userName = resp.includes.users[0].username;
            if (resp.data) {
                userTweets.push.apply(userTweets, resp.data);
            }
            if (resp.meta.next_token) {
                nextToken = resp.meta.next_token;
            } else {
                hasNextPage = false;
            }
        } else {
            hasNextPage = false;
        }
    }

    console.dir(userTweets, {
        depth: null
    });
    console.log(`Got ${userTweets.length} Tweets from ${userName} (user ID ${userId})!`);
  }

  const getPage = async (params, options, nextToken) => {
    if (nextToken) {
        params.pagination_token = nextToken;
    }

    try {
        const resp = await needle('get', url, params, options);

        if (resp.statusCode != 200) {
            console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
            return;
        }
        return resp.body;
    } catch (err) {
        throw new Error(`Request failed: ${err}`);
    }
  }

  let socketConnection;

  io.on('connection', async (socket) => {
    console.log("Client Connected")
    socketConnection = socket;
    
    let currentRules

    try {
      //   Get all stream rules
      currentRules = await getRules()

      // Delete all stream rules
      await deleteRules(currentRules)

      // Set rules based on array above
      await setRules()
    } catch (error) {
      console.error(error)
      process.exit(1)
    }

    streamTweets(io)
    
    socket.on("disconnect", () => console.log("Client disconnected"));
  })
}


/* try {
  // Make request
  const response = await getRequest();
  ids.push(response.data[0].id)
  console.log(ids)
  getUserTweets();

} catch (error) {
  console.error(error)
  process.exit(1)
} */