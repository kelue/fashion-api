
# fashion API to manage items and users stored in a PostgreSQL database

For details on API endpoints, please see [documentation](https://documenter.getpostman.com/view/23964059/2s8YCbob9i) 

## Steps to run
   1. clone the repo to your local
   2. Setup your postgreSQL database
   3. create a `.env` file using the example
   4. run the database migration, see [migration](./MIGRATIONS.md) for details on migration steps
   5. Run `npm run dev` command to start the server
   6. Setup postman endpoints using `fashion-api.postman_collection.json`

### Required features
    User can sign up
    User can Login
    User can add a new fashion item
    User can update the details of a fashion item
    User can delete an item
    User can view all items
    View all items supports pagination

### Tools
    NodeJS
    ExpressJS
    PostgreSQL
    PassportJS => authentication
    JWT => Token management
    bcryptjs => Password hash
