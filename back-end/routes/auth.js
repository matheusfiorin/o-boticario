const bcrypt = require('bcrypt');
const express = require('express');
const generateErrorResponse = require('./functions').generateErrorResponse;
const model = require('../models/index');
const router = express.Router();

router.post('/login', (req, res) => {
  const {
    email,
    password
  } = req.body;

  if (!email || !password) {
    generateErrorResponse(401, req.url, "Empty fields", ["Email and/or password field is empty"], res);
  }

  if (!email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g)) {
    generateErrorResponse(401, req.url, "Invalid email", ["The email provided isn't a valid email"], res);
  }

  model.users.findOne({
      where: {
        email
      }
    })
    .then(user => {
      if (!user) {
        generateErrorResponse(401, req.url, "Unauthorized", ["This username isn't registered."], res);
      }
      if (!bcrypt.compareSync(password, user.password)) {
        generateErrorResponse(401, req.url, "Unauthorized", ["Wrong password."], res);
      }
      res.status(200).json({
        jwt: "jwt", // TODO
        user_id: user.id
      });
    })
    .catch(err => {
      console.error({
        err
      });
      generateErrorResponse(400, req.url, "Unknown error", [err], res);
    })
});

router.post('/register', (req, res) => {
  const {
    fullname,
    cpf,
    email,
    password
  } = req.body;

  if (!fullname || !cpf || !email || !password) {
    generateErrorResponse(401, req.url, "Empty fields", ["Every field is required."], res);
  }

  if (!email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g)) {
    generateErrorResponse(401, req.url, "Invalid email", ["The email provided isn't a valid email"], res);
  }

  model.users.findOne({
      where: {
        cpf
      }
    })
    .then(user => {
      if (user) {
        generateErrorResponse(401, req.url, "User already exists", ["CPF field is unique."], res);
      }

      let encriptedPassword = bcrypt.hashSync(password, 10);

      model.users.create({
          fullname,
          cpf,
          email,
          password: encriptedPassword
        })
        .then(response => {
          res.status(201).json({
            code: 201,
            message: "Created.",
            id: response.id
          });
        });
    })
    .catch(err => {
      console.error({
        err
      });
      generateErrorResponse(400, req.url, "Unknown error", [err], res);
    })
})

module.exports = router;