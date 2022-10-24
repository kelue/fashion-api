const db = require("../config/db.config")

//get all the items in the database
const getAll = async ({limit, offset}) => {
        //query database and retrieve items in descending order with limited items and offset
        const items = await db.any('SELECT * FROM items ORDER BY id DESC LIMIT $(limit) OFFSET $(offset)', {limit, offset})
        return items
}


const addItem = async ({ name, brand, color }) => {

    const item = await db.one('INSERT INTO items(name, brand, color) VALUES($(name), $(brand), $(color)) RETURNING id', {name, brand, color})
    return item
}

module.exports = {
    getAll,
    addItem
}