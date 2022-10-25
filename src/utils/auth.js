require("dotenv").config()
const passport = require("passport")

const { Strategy, ExtractJwt } = require("passport-jwt")

const { findUser } = require("../services/users")

const { JWT_SECRET } = process.env

//new strategy using jsonwebtoken
const strategy = new Strategy(
    //provides the configuration options for the strategy
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET
    },
    //callback function to verify jwtpayload
    async (jwtPayload, done) => {
        try{
            //using the email in the payload, check if user exists in the database
            const user = await findUser({ email: jwtPayload.email })
            
            //if user does not exist return error
            if (!user) {
                const err = new Error("User not found");
                err.statusCode = 404;
                throw err;
            }
        
             done(null, user);
        }catch(error){
            done(error)
        }
    }
)

//passport will use the strategy created above
passport.use(strategy)

//used to initialize the middleware in index.js
const initialize = () => passport.initialize()

//callback middleware for authenticating routes that need authentication
const authenticate = () => passport.authenticate("jwt", {session: false})

module.exports = {
    initialize, authenticate
}