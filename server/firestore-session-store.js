const admin = require('firebase-admin');
const expressSession  = require('express-session');
const FirestoreStore = require('connect-firestore')(expressSession);

admin.initializeApp();

const firestore = admin.firestore();

const sessionStore = new FirestoreStore({
    database: firestore
});

module.exports = sessionStore;