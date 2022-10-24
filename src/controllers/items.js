const service = require("../services/items")

//get all items with pagination
const getAllItems = async (req, res, next) => {
    try {
        //destructure page and size, if they are empty default to 3 for size and 1 for page
        const { size = 5, page = 1 } = req.query
        
        // extract offset and limit for pagination
        const limit = parseInt(size) <= 5 ? parseInt(size) : 5 //ensures that maximum size is 5
        const offset = (parseInt(page) - 1) * limit
    

        const items = await service.getAll({limit, offset})

        res.json( { 
            page,
            items
        }  )
    }catch(error){
        next(error)
    }
}

const saveItem = async (req, res, next) => {
    try {
        const { name, brand, color } = req.body

        //add item to database 
        const item = await service.addItem({ name, brand, color })

        //if successful return status and id of the new data
        res.status(201).json({ data: item })
    }catch(error){
        next(error)
    }

}


module.exports = {
    getAllItems,
    saveItem
}