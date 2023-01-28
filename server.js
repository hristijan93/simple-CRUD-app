// server.js
// npm run dev (to run nodemon (auto restart the server after every change))

// Using express
const express = require('express');
const app = express();

app.listen(3000, function() {
    console.log('listening on 3000');    
})

// CRUD - READ
app.get('/', (req, res) => {
    // res.send('Hello World')
    res.sendFile(__dirname + '/index.html')
})

// CRUD - CREATE
// Triggering POST request through a form
app.post('/quotes', (req, res) => {
    console.log('Heellooooooooooooooooooooo!')
})

console.log('May Node be with you');
