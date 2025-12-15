import { config } from 'dotenv'
import { dbconfig } from './config/dbconfig.js'
import express from 'express'
const app = express()
config()
dbconfig()
app.use('/profile',express.static('uploads'))
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded())

import userRoute from './routes/user.route.js'
import catRoute from './routes/cat.route.js'
app.use('/api/user', userRoute)
app.use('/api/cat',catRoute)



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(PORT, () => console.log(`Example app listening on PORT http://localhost:${PORT}`))