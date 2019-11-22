# Fullstack Developer Challenge - O Boticario

* Author: Matheus Barão Fiorin
* Challenge: “Eu revendedor ‘O Boticário’ quero ter benefícios de acordo com o meu volume de vendas”.

This is a project focused on the problem solving for the resellers of "O Boticario" group.

## Getting Started

First, you need to have a MySQL server ready-to-use (preferably `5.7.26`).

Once stated, run the `start.sql` script from the `/db` folder on your MySQL server.

Second, you need to install `node.js` v12.x.x in order to fully work. If you don't have it installed,
visit [node's download page](http://nodejs.org/download/).

Once installed, checkout the backend dependencies from npm by running the following command in the backend folder from a terminal:

``` javascript
  npm install
```

To run the tests you need to checkout to the backend folder on a terminal and you can choose between:

* `npm test` - runs all the tests;
* `npm run unit` - runs only the unit tests;
* `npm run integration` - runs only the integration test.

To start the API you need to checkout to the backend folder on a terminal and simply run `node app.js` to see in action.

> You can also import the Postman Collection from the `/backend/collection` folder in order to a quicker review. 

> (Remember to double check the `x-access-token` header to pass the given `JWT` from the `/auth/login` route)