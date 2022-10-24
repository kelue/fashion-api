const express = require("express")
const cors = require("cors")
const db = require("./config/db.config.js")

//routes
const itemsRouter = require("./routers/items")

const app = express()
//midlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 8080

app.use("/api/v1/fashion", itemsRouter)


//redirect requests to root to version 1 of the api
app.get("/", (req, res) => {
    res.redirect("/api/v1/fashion");
});

app.listen(port, ()=>{
    console.log(`app running on port ${port}`)
})