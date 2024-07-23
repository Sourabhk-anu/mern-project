require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const {connectDb} = require("./utils/db");
const router = require('./routes/auth-route')
const routers = require('./routes/user-route')
const cors = require('cors');

const app = express();

const corsOptons = {
    origin: 'http://localhost:3001',
    credentials: true,
    methods: "GET, HEAD, PUT, POST, DELETE, PATCH"
}

app.use(cors(corsOptons));

app.use(bodyParser.json());

app.use('/api', router);
app.use('/user', routers)

const PORT = 8000;

connectDb.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})