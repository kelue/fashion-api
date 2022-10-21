const express = require("express")
const cors = require("cors")
const db = require("./config/db.config.js")

const app = express()
//midlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const port = process.env.PORT || 8080

app.get("/", (req, res)=>{
    res.end("Hello Fashion")
})

app.listen(port, ()=>{
    console.log(`app running on port ${port}`)
})