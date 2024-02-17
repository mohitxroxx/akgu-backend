const dotenv=require('dotenv')
const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const cookieparser = require('cookie-parser')
const auth = require('./routes/auth')
const api = require('./routes/api')
const authentication = require('./middlewares/authentication')

connectDB()
dotenv.config()
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(cookieparser())
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send('Server up and running')
})

// setInterval(function() {
//     console.log("Render ab nhi soyega");
// }, 2*60*1000) 
 
app.use('/api', authentication, api)
app.use('/admin', authentication, auth)

// console.log(process.env.PORT)

app.listen(process.env.PORT, () => {
    console.log(`Server up and running at port ${process.env.PORT}`)
})