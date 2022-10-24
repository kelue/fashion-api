const express = require("express")
const router = express.Router()

//import handlers from controllers
const {
    getAllItems
} = require("../controllers/items")

router.get("/", getAllItems)

module.exports =  router