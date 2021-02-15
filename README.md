# MEMO - backend

This is the backend repo of memo application.

## API Documentation

**URL** de l'api :

```
https://memo-back.vercel.app/api
```

Method to call : **POST**

Json body expected (example below) :

```js
{
  username: "username",   // String
  score: 12               // Number
}
```

API respond with HTTP code status and Json body :
- **message** : to display error or success message in UI.
- **bestPlayers** : player objects array.

## Backend Informations

### Development language & dependencies

- Nodejs
- Javascript
- Express
- Body-parse
- Mongoose
- Jest

### Commands

```shell
npm install
npm start
```

If you want test your code :

```shell
npm test
```

### Guide

You should test all utils methods.
