const express = require('express');
const model = require('../models/index');
const router = express.Router();

require('./functions')();

router.get("/", (req, res) => {
  model.sells.findAll()
    .then(sells => {
      if (!sells) {
        return generateErrorResponse(404, req.url, "Not found", [`No sells where found.`], res);
      }
      res.status(200).json(sells || []);
    })
    .catch(err => {
      console.error({
        err
      });
      return generateErrorResponse(400, req.url, "Unknown error", [err], res);
    })
});

router.get("/:id", (req, res) => {
  const {
    id
  } = req.params;

  if (!id) {
    return generateErrorResponse(401, req.url, "Empty fields", ["Every field is required."], res);
  }

  model.sells.findOne({
      where: {
        id
      }
    })
    .then(sells => {
      if (!sells) {
        return generateErrorResponse(404, req.url, "Not found", [`Sell with ID ${id} not found.`], res);
      }
      res.status(200).json(sells || {});
    })
    .catch(err => {
      console.error({
        err
      });
      return generateErrorResponse(400, req.url, "Unknown error", [err], res);
    })
});

router.post("/", async (req, res) => {
  const {
    userid,
    sellid,
    price,
    date
  } = req.body;

  if (!userid || !sellid || !price || !date) {
    return generateErrorResponse(401, req.url, "Empty fields", ["Every field is required."], res);
  }

  let cpf = await model.users.findOne({
      where: {
        id: userid
      }
    })
    .then(user => {
      if (!user) {
        return generateErrorResponse(401, req.url, "User not found", ["UserID don't match our db"], res);
      }
      return user.cpf;
    })
    .catch(err => {
      console.error({
        err
      });
      return generateErrorResponse(400, req.url, "Error searching user", [err], res);
    })

  let statusid = await model.statuses.findOne({
      where: {
        description: cpf === "15350946056" ? "Aprovado" : "Em validação"
      }
    })
    .then(status => {
      return status.id || 1;
    })
    .catch(err => {
      console.error({
        err
      });
      return generateErrorResponse(400, req.url, "Error searching statuses", [err], res);
    });

  model.sells.create({
      userid,
      statusid,
      sellid,
      price,
      date,
    })
    .then(sell => {
      res.status(201).json({
        code: 201,
        message: "Created.",
        id: sell.id
      });
    })
    .catch(err => {
      console.error({
        err
      });
      return generateErrorResponse(400, req.url, "Unknown error", [err], res);
    });
});

router.put("/:id", async (req, res) => {
  const {
    id
  } = req.params;

  const {
    userid,
    sellid,
    price,
    date
  } = req.body;

  if (!userid || !sellid || !price || !date) {
    return generateErrorResponse(401, req.url, "Empty fields", ["Every field is required."], res);
  }

  if (!isAbleToChange(id)) {
    return generateErrorResponse(401, req.url, "Unable to change", ["This sell isn't able to update because isn't pending approval anymore."], res);
  }

  model.sells.update({
      userid,
      sellid,
      price,
      date
    }, {
      where: {
        id
      }
    })
    .then(_ => {
      res.status(200).json({
        code: 200,
        message: "Updated.",
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

router.delete("/:id", async (req, res) => {
  const {
    id
  } = req.params;

  if (!await sellExist(id)) {
    return generateErrorResponse(401, req.url, "Unable to locate the ID", ["This sell can't be located anymore."], res);
  }

  if (!await isAbleToChange(id)) {
    return generateErrorResponse(401, req.url, "Unable to change", ["This sell isn't able to update because isn't pending approval anymore."], res);
  }

  model.sells.destroy({
      where: {
        id
      }
    })
    .then(_ => {
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