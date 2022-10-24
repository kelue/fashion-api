const express = require("express")
const router = express.Router()

//import handlers from controllers
const {
    getAllItems, saveItem
} = require("../controllers/items")

//chaining the routes
router.route("/").get(getAllItems).post(saveItem)

module.exports =  router