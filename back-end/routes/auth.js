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
    return generateErrorResponse(401, req.url, "Campos vazios", ["Campo de email e/ou senha vazios."], res, false);
  }

  if (!isValidEmail(email)) {
    return generateErrorResponse(401, req.url, "Email inválido", ["Insira um email válido."], res, false);
  }

  model.users.findOne({
      where: {
        email
      }
    })
    .then(user => {
      if (!user) {
        return generateErrorResponse(401, req.url, "Não autorizado", ["Usuário não registrado."], res, false);
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return generateErrorResponse(401, req.url, "Não autorizado", ["Senha incorreta."], res);
      }
      var token = jwt.sign({
        id: user.id
      }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      });
      res.status(200).json({
        jwt: token,
        user_id: user.id,
        full_name: user.fullname
      });
    })
    .catch(err => {
      console.error({
        err
      });
      return generateErrorResponse(400, req.url, "Erro desconhecido", [err], res, false);
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
    return generateErrorResponse(401, req.url, "Campos vazios", ["Todos os campos são obrigatórios."], res, false);
  }

  if (!isValidEmail(email)) {
    return generateErrorResponse(401, req.url, "Email inválido", ["Insira um email válido."], res, false);
  }

  if (!isValidCPF(noDigitCPF)) {
    return generateErrorResponse(401, req.url, "CPF inválido", ["Insira um CPF válido."], res, false);
  }

  model.users.findOne({
      where: {
        cpf: noDigitCPF
      }
    })
    .then(user => {
      if (user) {
        return generateErrorResponse(401, req.url, "Usuário já cadastrado", ["O campo CPF é único."], res, false);
      }

      let encriptedPassword = bcrypt.hashSync(password, 10);

      model.users.create({
          fullname,
          cpf: noDigitCPF,
          email,
          password: encriptedPassword
        })
        .then(response => {
          var token = jwt.sign({
            id: response.id
          }, process.env.SECRET, {
            expiresIn: 300 // expires in 5min
          });
          res.status(201).json({
            code: 201,
            message: "Created.",
            id: response.id,
            jwt: token,
            user_id: response.id,
            full_name: fullname
          });
        });
    })
    .catch(err => {
      console.error({
        err
      });
      return generateErrorResponse(400, req.url, "Erro desconhecido", [err], res, false);
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
      return generateErrorResponse(400, req.url, "Erro desconhecido", [err], res, false);
    });
});

module.exports = router;