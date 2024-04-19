const express = require('express');
const session = require('express-session');
const cors = require('cors');
const sessionStore = require('./firestore-session-store');
const router = require('./routes/router');
const app = express();

const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));

app.use(express.json());
app.use(cors());



app.use('/', router);
app.listen(5000, () => {console.log("Server started on port 5000")});