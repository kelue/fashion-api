const service = require("../services/items")

//helper function
const getItem = async (req, res, next) => {
        const itemFound = await service.getItem(req.params.id)

       if( itemFound === null ){
            const err = new Error("Item not found")
            err.statusCode = 404
            next(err)
        }

        next()
}

//handler for get all items with pagination
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

//handler for add new item request
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

//handler for update existing item
const updateItem = async (req, res, next) => {
    //retrieve request parameters
    const { id } = req.params
    const { name, brand, color } = req.body

    try{
        const update = await service.updateItem({ id, name, brand, color })

        res.status(201).json({ data: update })
    }catch(error){
        next(error)
    }
}


module.exports = {
    getAllItems,
    saveItem,
    updateItem: [getItem, updateItem],
}