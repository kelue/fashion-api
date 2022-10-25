const express = require("express")
const router = express.Router()
const { authenticate } = require("../utils/auth")

//import handlers from controllers
const {
    getAllItems, saveItem, updateItem, deleteItem
} = require("../controllers/items")

//chaining the routes
router.route("/").get(getAllItems).post(authenticate(), saveItem)

//chaining similar requests for same route
router.route("/:id").post(authenticate(), updateItem).delete(authenticate(), deleteItem)

module.exports =  router