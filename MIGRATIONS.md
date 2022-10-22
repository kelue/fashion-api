# DATABASE MIGRATION GUIDE

 1. Configure PostgreSQL.
 2. Configure your environment (.env) file to include your database credentials.
 3. Create migrations for each table.
 4. populate the tables with dummy data

## Configure PostgreSQL

Configure postgreSQL on your computer, you can do so by following the instructions on the [official download page](https://www.postgresql.org/download/) or creating an account with a SaaS provider. Once you've completed the setup, use the details to configure the enviromental variables

## Configure your '.env' file

  Create a '.env' file in the project root folder (i.e. directly inside fashion-api folder) and configure it with your database credentials as follow:

> .env
```
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
```
Fill your database credentials appropriately and save the file.

>.env example
```
DB_HOST=localhost
DB_USER=username
DB_PASS=database_password
DB_NAME=database_name
```
## Create Table Migrations

To create migrations for table basically means you're creating a template for the table structure (i.e. the columns, their data types, size/length, default value etc.). Make sure you run `npm install` so the necessary node modules (db-migrate and db-migrate-pg) are installed.

NOTE: db-migrate is to be installed as a dev-dependency module. This will be handled by the `npm install` command

run the command below in the root folder to create migrations for the table using the command line:

> `db-migrate create initialize --sql-file -m src/database/migrations`

NOTE: Make sure you have the database.json file in your project root folder and cd into the project root folder before running the command.

## Configure Table Migration

After creating your migrations successfully, you should find your migration files in the 'migrations' folder which should be in the 'src' folder in the project root folder i.e. `fashion-api->src->database->migrations`.

You can configure your table by specifying the normal sql syntax for creating tables as a string in the 'up' option and the syntax for dropping tables in the 'down' option like:

> example for initialize - 20221021164708-initialize-up.sql
```  
   -- Table: Users table

    DROP TABLE IF EXISTS public.users;

    CREATE TABLE IF NOT EXISTS  public.users (
        "id" serial NOT NULL,
        "name" varchar(30) NOT NULL,
        "email" varchar(50) NOT NULL UNIQUE,
        "password" varchar(255) NOT NULL UNIQUE,
        CONSTRAINT "users_pk" PRIMARY KEY ("id")
    );

    -- Table: Items

    DROP TABLE IF EXISTS public.items;

    CREATE TABLE IF NOT EXISTS public.items (
        "id" serial NOT NULL,
        "name" varchar(25) NOT NULL,
        "brand" varchar(25) NOT NULL,
        "color" varchar(25) NOT NULL,
        CONSTRAINT "items_pk" PRIMARY KEY ("id")
    );
```

For simplification, the same sql file is used to create and populate the table with dummy data in this instance, you can easily partition yours if you'd like

## Migrate Tables into Database

All that's left after creating and configuring your migrations is to migrate the tables into your database. To get the tables migrated into your database run the following code in your command line:

> `db-migrate up initialize -m src/database/migrations`

NOTE: Run while you have cd into the project root folder.

After successfully running migrations, your database should now contain your tables with data as specified in the migrations and you can start using them to test the api.
