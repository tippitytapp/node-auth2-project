const session = require('express-session');
require('dotenv').config();
const {cooSecret} = require('./secrets.js')




const sessionConfig={
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // one day in milliseconds
        secure: false, // send the cookie only https only, should be true in production
        httpOnly: true, // true means client JS cannot access the cookie
      },
      resave: false,
      saveUninitialized: true, // in development true is fine, there are laws regarding cookies
      name: "bananas",
      secret: cooSecret,
}

module.exports={
    sessionConfig
}