const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')

const serviceAccount = require('./authenticator.json')
initializeApp({
    credential: cert(serviceAccount),
})

const firestore = getFirestore()

const users = firestore.collection('users')

// we want to have access to "users" in index.js
// challenge: require "users" to index.js
module.exports.users = users
