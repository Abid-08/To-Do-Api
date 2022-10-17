const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
const router = require('./http/routes/index')

dotenv.config()
mongoose.connect(process.env.MONGO_URI_TODO)
.then(() => {console.log('db connnected')})
.catch((err) => console.log(err))


app.use(cors())
app.use(morgan('tiny')) // used to run this code everytime before a request
app.use(router.todoRoute)
app.use(router.userRoute)
//app.use('/auth',router.authRoute)
app.use(require('./http/middleware/userTokenAuthentication'))

app.listen(5500, () => {console.log(`listening  on port 5500`)}) 