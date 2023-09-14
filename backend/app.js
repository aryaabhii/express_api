const express = require('express');
const app = express();
const port = 8000; // custom port to run the application

const bodyParser = require('body-parser'); 

const morgan = require('morgan'); // this package help to get logs of api

const mongoose = require('mongoose'); // for db

// middleware :-  this is will help to understand the request of api
app.use(bodyParser.json());
app.use(morgan('tiny'));


require('dotenv/config'); // this will help to get env info. By the help of this can create public variable which can be used everywhere.


const api = process.env.API_URL; // to get the {/api/v1} from .env file.


// http://127.0.0.1:8000/api/v1/product
app.get(`${api}/products`, (req, res) => {
     const product = {
          id : 1,
          name : 'Abhijeet',
          image : 'some urls....',
     }
     res.send(product);
});

app.post(`${api}/products`, (req, res) => {
     const newProduct = req.body;
     console.log(newProduct);
     res.send(newProduct);
});


// connection of mongo db
mongoose.connect(process.env.CONNECTION_STRING)

.then( () => {
     console.log('Database connection ready...');
})
.catch( (err) => {
     console.log(err);
})

// web server
app.listen(port, () => {
     // console.log(api);
     console.log(`Server started at port ${port}`);
});