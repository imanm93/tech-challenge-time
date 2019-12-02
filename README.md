# Pento Tech Challenge

@author: Iman Kalyan Majumdar

## Requirements

- As a user, I want to be able to start a time tracking session
- As a user, I want to be able to stop a time tracking session
- As a user, I want to be able to name my time tracking session
- As a user, I want to be able to close my browser and shut down my computer and still have my sessions visible to me when I power it up again.
- As a user, I want an overview of my sessions for the day, week and month
- As a user, I want to be able to save my time tracking session when I am done with it

## Dependencies

To run this application you are required to have installed `docker` and `yarn`. You may substitute `yarn` with `npm`.

## Usage

To use this application open two terminals from the root folder.

On one terminal please run the following commands to start the API.

```
cd api
docker-compose up --build
```

On another terminal please run the following commands to start the Client. If you are using `npm`, remember to substitute `yarn` with `npm`.

```
cd client
yarn install
yarn start
```

After both the API and Client are running, you can access the project at http://localhost:3000 on your browser.

## Information

### Client

The client application is built using React (w/ Redux) and Axios.

- Using React allows us to build the client in a modular fashion, maximising code reusability.
- Using Redux allows us to easily manage and share the state of the application across components.
- Using Axios allows us to make network requests to the API.

### API

The REST-API is built using the Flask micro-framework and MongoDB. Authentication is performed with the help of `JWT` and the validation of API requests is done using `jsonschema`.

- Using Flask gives us the advantage of a lightweight framework, where we can include only the features we require. Thereby reducing overhead when compared to frameworks such as Django.
- The Flask app is created using an `application factory pattern` which allows us to easily create an app for different environments. (ie. Development, Staging, Production ...) This is especially useful when integrating with a CI/CD pipeline.
- Using MongoDB gives us the advantage of scaling the service horizontally in the future rather than scaling vertically with SQL options. Additionally, as it is `SchemaLess` it allows the application to rapidly add new properties/details to a `Time Tracking Session` object in the future with almost no modifications required to the source code on the back-end.

### Docs

**Endpoint** `POST http://127.0.0.1:5000/api/v1/user/register`

**Request Body**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response**
```json
{
  "user": {
    "username": "string",
    "refresh_token": "string",
    "token": "string"
  }
}
```

**Endpoint** `POST http://127.0.0.1:5000/api/v1/user/login`

**Request Body**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response** `200 OK`

**Endpoint** `GET http://127.0.0.1:5000/api/v1/sessions/<username>`

**Response**
```json
{
  "sessions": "list"
}
```

**Endpoint** `POST http://127.0.0.1:5000/api/v1/sessions/new`

**Request Body**
```json
{
  "username": "string",
  "name": "string",
  "time": "number",
  "createdAt": "string"
}
```

**Response** `200 OK`

## Run Tests

**Important:** API has to be running in the background (see above for instruction to start API)
**Important:** PyTest needs be installed locally using pip.

To run the tests for the API please open another terminal from the root folder and enter the following commands.

```
cd api
pytest
```

## Further Development

 - Convert tests for API Endpoints to user MockDB and not actual DevDB
 - Write tests for React Components
 - Switch to GraphQL - incorporating Graphene-Mongo and Relay
