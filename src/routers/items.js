const express = require("express")
const router = express.Router()

//import handlers from controllers
const {
    getAllItems, saveItem, updateItem, deleteItem
} = require("../controllers/items")

//chaining the routes
router.route("/").get(getAllItems).post(saveItem)

//chaining similar requests for same route
router.route("/:id").post(updateItem).delete(deleteItem)

module.exports =  router