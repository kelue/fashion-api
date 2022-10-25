const express = require("express")
const router = express.Router()

//import handlers from controllers
const {
    getAllItems, saveItem, updateItem
} = require("../controllers/items")

//chaining the routes
router.route("/").get(getAllItems).post(saveItem)

router.post("/:id", updateItem)

module.exports =  router