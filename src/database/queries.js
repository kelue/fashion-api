//create new user
const createUserDB = `
    INSERT INTO users (name, email, password) 
    VALUES($(name), $(email), $(password)) 
    RETURNING *
`

//find user in database
const findUserDB = `SELECT * FROM users WHERE email = $(email)`

//select all the items 
const selectAllItemsDB = `SELECT * FROM items ORDER BY id DESC LIMIT $(limit) OFFSET $(offset)`

//select a single item
const selectItemDB = `SELECT id FROM items WHERE id = $(id)`

//add an item 
const addItemDB = `INSERT INTO items(name, brand, color) VALUES($(name), $(brand), $(color)) RETURNING id`

//update an item
const updateItemDB = `
    UPDATE items SET name = $(name), brand = $(brand), color = $(color) 
    WHERE id = $(id)
    RETURNING id, name AS new_name, brand AS new_brand, color AS new_color
`
//delete an item
const deleteItemDB = `DELETE FROM items WHERE id = $(id) RETURNING id`

module.exports = {
    createUserDB,
    findUserDB,
    selectAllItemsDB,
    selectItemDB,
    addItemDB,
    updateItemDB,
    deleteItemDB
}