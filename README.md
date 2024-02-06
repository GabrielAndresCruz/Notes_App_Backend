# Notes REST API

Manage and organize your notes with ease using this RESTful API.

## Features

- **CRUD Operations**: Perform Create, Read, Update, and Delete operations on notes, categories, and users.
- **Authentication**: Secure your data with JWT authentication.
- **Validation**: Utilize Class Validator for input validation.
- **Error Handling**: Robust error handling mechanisms in place.

## Technologies Used

| Technology      | Description               |
| --------------- | ------------------------- |
| Node.js         | JavaScript runtime        |
| TypeScript      | Typed superset of JS      |
| Express         | Web application framework |
| MySQL           | Relational database       |
| TypeORM         | ORM for TypeScript        |
| Class Validator | Validation library        |
| JWT             | Authentication mechanism  |

## Installation

1. Clone the repository:

```
git clone https://github.com/GabrielAndresCruz/Notes_App_Backend
```

2. Navigate to the repository folder and create a `.env` file using `.env.template`. Provide necessary environment variables for the application and database.
3. Install dependencies:

```
npm install
```

## Running the Application

1. Run Docker container:

```
docker compose up
```

2. Apply migrations:

```
npm run migration:run
```

The application will be accessible at http://localhost:3001.

## Available Scripts

- **dev**: Run the server.
- **migration:show**: Show executed migrations.
- **migration:create**: Create a new migration.
- **migration:run**: Run pending migrations.
- **migration:revert**: Revert last executed migration.

## API Endpoints

### Users

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| POST   | /users/register | Register a new user |
| POST   | /users/login    | Login user          |
| GET    | /users/logout   | Logout user         |
| GET    | /users          | Get all users       |
| GET    | /users/:id      | Get user by ID      |
| PUT    | /users/update   | Update user         |
| DELETE | /users/delete   | Delete user         |

### Notes

| Method | Endpoint                 | Description              |
| ------ | ------------------------ | ------------------------ |
| GET    | /notes                   | Get all notes            |
| GET    | /notes/:id               | Get note by ID           |
| POST   | /notes                   | Create a new note        |
| PUT    | /notes/:id               | Update note              |
| DELETE | /notes/:id               | Delete note              |
| PATCH  | /notes/archived/:id      | Archive a note           |
| PATCH  | /notes/unarchived/:id    | Unarchive a note         |
| PATCH  | /notes/addCategories/:id | Add categories to a note |

### Categories

| Method | Endpoint        | Description           |
| ------ | --------------- | --------------------- |
| GET    | /categories     | Get all categories    |
| POST   | /categories     | Create a new category |
| PUT    | /categories/:id | Update category       |
| DELETE | /categories/:id | Delete category       |
