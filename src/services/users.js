require("dotenv").config()
const db = require("../config/db.config")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { JWT_SECRET, expires } = process.env
const { createUserDB, findUserDB } = require("../database/queries")

//find a user in the database using email
const findUser = async ({ email }) => {
    //search for user using email
    const user = await db.oneOrNone(findUserDB, {email})
    return user
}

//create new user
const createUser = async({ name, email, password }) => {
    //hash the password
    password = await bcrypt.hash(password, 10)

    //create a token using the email, secret and expiration time
    const token = jwt.sign({ email }, JWT_SECRET, {expiresIn: expires})

    //save new user to the database
    await db.one(createUserDB, {name, email, password})

    //return new user details and the token
    return { token }
}

//authenticate existing user
const authenticateUser = async ({ email, password }, savedPassword) => {

    //compare plaintext password to password in the database
    const isPasswordValid = await bcrypt.compare(password, savedPassword)

    //if they match, generate a token
    if(isPasswordValid){
        const token = jwt.sign({ email }, JWT_SECRET, {expiresIn: expires})
        return { token }
    }else{
        return false
    }
}


module.exports = {
    findUser, createUser, authenticateUser
}