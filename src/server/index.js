const http = require("http")
const path = require("path")
const express = require("express")
const socketio = require("socket.io")
const needle = require("needle")
require("dotenv").config({ path: "../../.env" })
const PORT = process.env.PORT || 3000

const app = express()

const server = http.createServer(app)
const io = socketio(server)

require('./routes/index.js')(needle, io);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))




