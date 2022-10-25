const { findUser, createUser } = require("../services/users")

//handler for user signup
const userSignup = async (req, res, next) => {
    const { name, email, password } = req.body

    try{
        //check if user exists
        const user = await findUser({ email })

        if(user) {
            throw new Error("User with the email already exist!!")
        }

        const newUser = await createUser({ name, email, password })
        res.json({ newUser })

    }catch(error){
        next(error)
    }

}

module.exports = {
    userSignup
}