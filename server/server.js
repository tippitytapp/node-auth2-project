const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const server = express();
const AuthRouter = require('../auth/authrouter.js');
const UsersRouter = require('../users/usersrouter.js');
const {sessionConfig} = require('../auth/configs.js');

server.use(session(sessionConfig))
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/auth', AuthRouter)
server.use('/api/users', UsersRouter)

server.get('/', (req, res) => {
    res.status(200).json({
        message: "API is online"
    })
})

module.exports=server;