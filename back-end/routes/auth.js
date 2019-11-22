// Reading .env
require('dotenv').config();

// Dependencies
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const model = require('../models/index');
const router = express.Router();

require('./functions')();

router.post('/login', (req, res) => {
  const {
    email,
    password
  } = req.body;

  if (!email || !password) {
    return generateErrorResponse(401, req.url, "Empty fields", ["Email and/or password field is empty"], res);
  }

  if (!isValidEmail(email)) {
    return generateErrorResponse(401, req.url, "Invalid email", ["The email provided isn't a valid email"], res);
  }

  model.users.findOne({
      where: {
        email
      }
    })
    .then(user => {
      if (!user) {
        return generateErrorResponse(401, req.url, "Unauthorized", ["This username isn't registered."], res);
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return generateErrorResponse(401, req.url, "Unauthorized", ["Wrong password."], res);
      }
      var token = jwt.sign({
        id: user.id
      }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      });
      res.status(200).json({
        jwt: token,
        user_id: user.id
      });
    })
    .catch(err => {
      console.error({
        err
      });
      return generateErrorResponse(400, req.url, "Unknown error", [err], res);
    })
});

router.post('/register', (req, res) => {
  const {
    fullname,
    cpf,
    email,
    password
  } = req.body;

  var noDigitCPF = cpf.replace(/\D+/g, "") || null;

  if (!fullname || !noDigitCPF || !email || !password) {
    return generateErrorResponse(401, req.url, "Empty fields", ["Every field is required."], res);
  }

  if (!isValidEmail(email)) {
    return generateErrorResponse(401, req.url, "Invalid email", ["The email provided isn't a valid email"], res);
  }

  if (!isValidCPF(noDigitCPF)) {
    return generateErrorResponse(401, req.url, "Invalid CPF", ["The CPF provided isn't a valid CPF"], res);
  }

  model.users.findOne({
      where: {
        cpf: noDigitCPF
      }
    })
    .then(user => {
      if (user) {
        return generateErrorResponse(401, req.url, "User already exists", ["CPF field is unique."], res);
      }

      let encriptedPassword = bcrypt.hashSync(password, 10);

      model.users.create({
          fullname,
          cpf: noDigitCPF,
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
      return generateErrorResponse(400, req.url, "Unknown error", [err], res);
    });
});

router.delete("/:id", (req, res) => {
  const {
    id
  } = req.params;

  model.users.destroy({
      where: {
        id
      }
    })
    .then(user => {
      res.status(200).json({
        code: 200,
        message: "Deleted.",
        id
      });
    })
    .catch(err => {
      console.error({
        err
      });
      return generateErrorResponse(400, req.url, "Unknown error", [err], res);
    });
});

module.exports = router;