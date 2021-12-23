# Music Library API

## Backend Module for Manchester Codes

Creating a Music Library API which works in conjunction with MySQL. Making use of RESTful standards to allow CRUD (Create, Read, Update and Delete) operations.

API built using Node.js and Express to integrate MySQL functionality. Test Driven Development using Mocha testing framework.

## HTTP Routes

### Artist

Create Artist - POST to '/artist'
Read all Artists - GET from '/artist'
Read one Artist ID - GET from '/artist/:id'
Update Artist - PATCH '/artist/:id'
Delete Artist - DELETE '/artist/:id'

### Album

Create Album - POST to '/album'
Read all Albums - GET from '/album'
Read one Album ID - GET from '/album/:id'
Update Album - PATCH '/album/:id'
Delete Album - DELETE '/album/:id'

## Instructions

- Pull and run a new MySQL Docker image `docker run -d -p 3307:3306 --name music_library_mysql -e MYSQL_ROOT_PASSWORD=password mysql` - make sure to chance `MYSQL_ROOT_PASSWORD` to something more appropriate. This will be used in `.env` file.
- Connect your MYSQL image to MYSQL Workbench application.
- Clone this repo and chance into the directory
- Run `npm install`
- Create a `.env` file and add local variables: `DB_PASSWORD`, `DB_NAME`, `DB_USER`, `DB_HOST`, `DB_PORT`, `PORT`
- Run `npm start` to start the project

### Testing

For testing, create a `.env.test` file with same local variables - just make sure to change `DB_NAME` (e.g. `mysql_music_library_test`)
