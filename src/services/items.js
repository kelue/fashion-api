const db = require("../config/db.config")
const { selectAllItemsDB, selectItemDB, addItemDB, updateItemDB, deleteItemDB } = require("../database/queries") //db queries

//get all the items in the database
const getAll = async ({limit, offset}) => {
    //query database and retrieve items in descending order with limited items and offset
    const items = await db.any(selectAllItemsDB, {limit, offset})
    return items
}

//get a  single item with the id
const getItem = async (id) => {
    const getResult = await db.oneOrNone(selectItemDB, {id})
    return getResult
}

// add an item to the database
const addItem = async ({ name, brand, color }) => {

    const item = await db.one(addItemDB, {name, brand, color})
    return item
}

//update an existing item to the database
const updateItem = async ({id, name, brand, color }) => {

    const result = db.one(updateItemDB, {name, brand, color, id})
    
    return result
}

//delete an existing item in the database
const deleteItem = async ({ id }) => {
    
    const result = db.one(deleteItemDB, {id})
    return result
}

module.exports = {
    getAll,
    addItem,
    getItem,
    updateItem,
    deleteItem
}