const express = require("express")
const router = express.Router()

const {
    userSignup
} = require("../controllers/users")

router.post("/signup", userSignup)


module.exports = router