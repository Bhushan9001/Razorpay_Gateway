//Import Modules and exported files
const express = require('express')
const app = express();
app.use(express.json());

require("dotenv").config();
const Cors = require('cors')
app.use(Cors());




//Routes

const paymentRoutes = require('./src/routes/payment')
app.use('/api/payment',paymentRoutes)


// PORT 
const port = process.env.PORT || 3001;

//LISTENER


app.listen(port, () => {
    console.log(`listening ${port}`)
})