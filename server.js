const express=require("express")
const app=express()

// middleware
// parse json
app.use(express.json())
app.use(express.urlencoded())

// routes
const listings=require("./routes/listings")
const users=require("./routes/users")

app.use('/api/v1/listings', listings)
app.use('/api/v1/users', users)

const port=5000

app.listen(port, ()=>console.log(`Server is listening on port ${port}`))