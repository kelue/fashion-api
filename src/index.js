const express = require("express")
const cors = require("cors")
// const db = require("./config/db.config.js")

//routes
const itemsRouter = require("./routers/items")
const usersRouter = require("./routers/users")
const { initialize } = require("./utils/auth")
const { handleError } = require("./utils/error")

const app = express()
//midlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(initialize())

//logging every request made to the API
app.use((req, res, next) => {
    const { method, path } = req;
    console.log(
      `New request to: ${method} ${path} at ${new Date().toISOString()}`
    );
    next();
});


//redirect requests to root to default version of the api
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

//api routes
app.use("/api/v1/fashion", itemsRouter)
app.use("/api/v1/users", usersRouter)


//error handler
app.use(handleError)

const port = process.env.PORT || 8080
app.listen(port, ()=>{
    console.log(`app running on port ${port}`)
})