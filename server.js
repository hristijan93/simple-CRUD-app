// server.js
// npm run dev (to run nodemon (auto restart the server after every change))

// Using express
const express = require('express');
const app = express();

// Using body parser
const bodyParser = require('body-parser');

// Using mongodb
const MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb+srv://hristijan93:Hristijan1@cluster0.jg5ylqc.mongodb.net/?retryWrites=true&w=majority';

app.listen(3000, function() {
    console.log('listening on 3000');    
})

// Make sure body parcer is placed before CRUD handlers (app.get, app.post, etc...);
app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect(connectionString)
    .then(client => {
        console.log('Connected to Database');
        const db = client.db('star-wars-quotes');
        const quotesCollection = db.collection('quotes');

        // Tell express we're using EJS as template engine (it has to be before app.use, appp.get or app.post)
        app.set('view engine', 'ejs');

        // CRUD - READ
        app.get('/', (req, res) => {
            // res.sendFile(__dirname + '/index.html');
            // Showing quotes to users // READ operation
            db.collection('quotes').find().toArray()
                .then(results => {
                    res.render('index.ejs', {quotes: results})       
                })
                .catch(error => console.error(error));               
        })

        // CRUD - CREATE
        // Triggering POST request through a form
        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        
    })
    .catch(error => console.error(error));


// console.log('May Node be with you');





