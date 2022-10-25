const db = require("../config/db.config")

//get all the items in the database
const getAll = async ({limit, offset}) => {
    //query database and retrieve items in descending order with limited items and offset
    const items = await db.any('SELECT * FROM items ORDER BY id DESC LIMIT $(limit) OFFSET $(offset)', {limit, offset})
    return items
}

//get a  single item with the id
const getItem = async (id) => {
    const getResult = await db.oneOrNone('SELECT id FROM items WHERE id = $(id)', {id})
    return getResult
}

// add an item to the database
const addItem = async ({ name, brand, color }) => {

    const item = await db.one('INSERT INTO items(name, brand, color) VALUES($(name), $(brand), $(color)) RETURNING id', {name, brand, color})
    return item
}

//update an existing item to the database
const updateItem = async ({id, name, brand, color }) => {

    const result = db.one(`
    UPDATE items SET name = $(name), brand = $(brand), color = $(color) 
    WHERE id = $(id)
    RETURNING id, name AS new_name, brand AS new_brand, color AS new_color
    `, {name, brand, color, id})
    
    return result
}

//delete an existing item in the database
const deleteItem = async ({ id }) => {
    
    const result = db.one('DELETE FROM items WHERE id = $(id) RETURNING id', {id})
    return result
}

module.exports = {
    getAll,
    addItem,
    getItem,
    updateItem,
    deleteItem
}