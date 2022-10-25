require("dotenv").config()
const db = require("../config/db.config")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { JWT_SECRET, expires } = process.env

//find a user in the database using email
const findUser = async ({ email }) => {

    //search for user using email
    const user = await db.oneOrNone('SELECT * FROM users WHERE email = $(email)', {email})
    return user
}


const createUser = async({ name, email, password }) => {
    //hash the password
    password = await bcrypt.hash(password, 10)

    //create a token using the email, secret and expiration time
    const token = jwt.sign({ email }, JWT_SECRET, {expiresIn: expires})

    //save new user to the database
    const newUser = await db.one(`
    INSERT INTO users (name, email, password) 
    VALUES($(name), $(email), $(password))
    RETURNING *`,
    {name, email, password})

    //return new user details and the token
    return {
        newUser,
        token
    }
}



module.exports = {
    findUser, createUser
}