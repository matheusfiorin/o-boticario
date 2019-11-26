const express = require('express');
const model = require('../models/index');
const request = require('request');
const router = express.Router();

require('./functions')();

router.get("/:userid", (req, res) => {
  const {
    userid
  } = req.params;

  model.users.findOne({
      where: {
        id: userid
      }
    })
    .then(async user => {
      if (!user) {
        return generateErrorResponse(404, req.url, "Usuário não encontrado", ["Não foi encontrado um usuário com este ID."], res, false);
      }

      var count = await sumCashback(user.id);

      request
        .get({
          url: `${process.env.CASHBACK_URL}${user.cpf}`,
          headers: {
            'token': 'ZXPURQOARHiMc6Y0flhRC1LVlZQVFRnm'
          }
        }, (err, response, body) => {
          var apiResponse = JSON.parse(body || {});
          if (err) {
            return generateErrorResponse(apiResponse.statusCode, req.url, "Erro desconhecido", [err, response], res, false);
          }
          res.status(200).json({
            credit: apiResponse.body.credit + count
          });
        });
    })
    .catch(err => {
      console.error({
        err
      });
      return generateErrorResponse(400, req.url, "Erro desconhecido", [err], res, false);
    })
});

module.exports = router;