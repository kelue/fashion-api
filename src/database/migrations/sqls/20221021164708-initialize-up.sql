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


INSERT INTO users (name, email, password) VALUES('john', 'john@email.com', 'secretpass');

INSERT INTO users (name, email, password) VALUES('amy', 'amy@email.com', 'amysecretpass');

INSERT INTO items (name, brand, color) VALUES('watch', 'rolex', 'gold');

INSERT INTO items (name, brand, color) VALUES('shoe', 'nike', 'white');

INSERT INTO items (name, brand, color) VALUES('shoe', 'nike', 'black');

INSERT INTO items (name, brand, color) VALUES('t-shirt', 'iris-clothing', 'white');

INSERT INTO items (name, brand, color) VALUES('cap', 'adiddas', 'grey');

INSERT INTO items (name, brand, color) VALUES('purse', 'gucci', 'green');

INSERT INTO items (name, brand, color) VALUES('skirt', 'prada', 'red');

INSERT INTO items (name, brand, color) VALUES('jacket', 'gucci', 'brown');

INSERT INTO items (name, brand, color) VALUES('shoe', 'fenty', 'grey');

INSERT INTO items (name, brand, color) VALUES('shoe', 'nike', 'blue');

INSERT INTO items (name, brand, color) VALUES('shoe', 'jordan', 'blue');

INSERT INTO items (name, brand, color) VALUES('shirt', 'rebook', 'white');

INSERT INTO items (name, brand, color) VALUES('shorts', 'nike', 'green');