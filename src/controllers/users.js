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

        const { token } = await createUser({ name, email, password })

        //return new user details
        res.json({ data:{
            name,
            email,
            token
        }})
        
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

        //if password is incorrect
        if(!token){
            throw new Error("Could not login!")
        }

        //destructure user name from user object
        const { name } = user

        res.json({data:{
            name,
            email,
            token
        }})

    }catch(error){
        next(error)
    }
}

module.exports = {
    userSignup, userLogin
}