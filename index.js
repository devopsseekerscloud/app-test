const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');


const CustomerRoute = require('./route/CustomerRoute');

const port=process.env.SERVER_PORT;
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/pos',()=>{
    app.listen(port,()=>{
        console.log(`Pos System API Up & Running on port: ${port}`)
    });
});

app.get('/',(req,resp)=>{
    resp.json({'data':'Success!'});
})

app.use('/api/v1/customer', CustomerRoute);