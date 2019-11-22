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
    .then(user => {
      if (!user) {
        return generateErrorResponse(404, req.url, "User not found", ["No user found with this ID"], res);
      }

      request
        .get({
          url: `${process.env.CASHBACK_URL}${user.cpf}`,
          headers: {
            'token': 'ZXPURQOARHiMc6Y0flhRC1LVlZQVFRnm'
          }
        }, (err, response, body) => {
          var apiResponse = JSON.parse(body);
          if (err) {
            return generateErrorResponse(apiResponse.statusCode, req.url, "Unknown error", [err, response], res);
          }
          res.status(200).json({
            credit: apiResponse.body.credit
          });
        });
    })
    .catch(err => {
      console.error({
        err
      });
      return generateErrorResponse(400, req.url, "Unknown error", [err], res);
    })
});

module.exports = router;