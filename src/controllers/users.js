const { findUser, createUser, authenticateUser } = require("../services/users")

//handler for user signup
const userSignup = async (req, res, next) => {
    const { name, email, password } = req.body

    try{
        //check if user exists
        const user = await findUser({ email })

        //if a user already exists in the database with the emaill
        if(user) {
            throw new Error("User with the email already exist!!")
        }

        const newUser = await createUser({ name, email, password })

        res.json({ newUser })
    }catch(error){
        next(error)
    }
}


//handler for user login request
const userLogin = async (req, res, next) => {
    try{
        const { email, password } = req.body

        //get user info ffom database using email
        const user = await findUser({ email })

        //if user does not exists
        if(!user){
            throw new Error("Could not login!")
        }

        //authenticate user
        const { token } = await authenticateUser({ email, password }, user.password)

        res.json({
            user,
            token
        })

    }catch(error){
        next(error)
    }
}

module.exports = {
    userSignup, userLogin
}