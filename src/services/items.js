const db = require("../config/db.config")

//get all the items in the database
const getAll = async ({limit, offset}) => {
    
        const items = await db.any('SELECT * FROM items ORDER BY id DESC LIMIT $(limit) OFFSET $(offset)', {limit, offset});
        return items
}


module.exports = {
    getAll,
}