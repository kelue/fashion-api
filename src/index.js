const express = require("express")
const cors = require("cors")
// const db = require("./config/db.config.js")

//routes
const itemsRouter = require("./routers/items")

const app = express()
//midlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//logging every request made to the API
app.use((req, res, next) => {
    const { method, path } = req;
    console.log(
      `New request to: ${method} ${path} at ${new Date().toISOString()}`
    );
    next();
});

app.use("/api/v1/fashion", itemsRouter)


//redirect requests to root to version 1 of the api
app.get("/", (req, res) => {
    const { page, size } = req.query

    // if the request has only page query parameter redirect with only page
    if(page & !size){
        res.redirect(`/api/v1/fashion?page=${page}`)
    //if it has both page and size redirect with both
    }else if(page && size){
        res.redirect(`/api/v1/fashion?page=${page}&size=${size}`)
    }else{
        res.redirect("/api/v1/fashion")
    }

});


const port = process.env.PORT || 8080
app.listen(port, ()=>{
    console.log(`app running on port ${port}`)
})