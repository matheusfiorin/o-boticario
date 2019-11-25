const express = require('express');
const model = require('../models/index');
const router = express.Router();

require('./functions')();

router.get("/", (req, res) => {
  model.statuses.hasOne(model.sells, {
    foreignKey: "statusid"
  });

  model.sells.belongsTo(model.statuses, {
    foreignKey: "statusid"
  });

  model.sells.findAll({
      where: {
        userid: req.userId
      },
      include: [{
        model: model.statuses,
        required: true
      }]
    })
    .then(sells => {
      if (!sells) {
        return generateErrorResponse(404, req.url, "Não encontrado", [`Nenhuma compra foi encontrada.`], res, false);
      }
      res.status(200).json(sells || []);
    })
    .catch(err => {
      console.error({
        err
      });
      return generateErrorResponse(400, req.url, "Erro desconhecido", [err], res, false);
    })
});

router.get("/:id", (req, res) => {
  const {
    id
  } = req.params;

  if (!id) {
    return generateErrorResponse(401, req.url, "Campos vazios", ["Todo campo é obrigatório."], res, false);
  }

  model.sells.findOne({
      where: {
        id
      }
    })
    .then(sells => {
      if (!sells) {
        return generateErrorResponse(404, req.url, "Não encontrado", [`Compra com o ID (${id}) não encontrado.`], res, false);
      }
      res.status(200).json(sells || {});
    })
    .catch(err => {
      console.error({
        err
      });
      return generateErrorResponse(400, req.url, "Erro desconhecido", [err], res, false);
    })
});

router.post("/", async (req, res) => {
  const {
    userid,
    sellid,
    price,
    date
  } = req.body;

  console.info({
    body: req.body
  })

  if (!userid || !sellid || !price || !date) {
    return generateErrorResponse(401, req.url, "Campos vazios", ["Todo campo é necessário."], res, false);
  }

  if(await checkSellID(sellid)) {
    return generateErrorResponse(401, req.url, "Este código já existe", ["O código da compra é único."], res, false);
  }

  const {
    cashbackpercentage,
    cashbackvalue
  } = calculateCashback(price);

  let cpf = await model.users.findOne({
      where: {
        id: userid
      }
    })
    .then(user => {
      if (!user) {
        return generateErrorResponse(401, req.url, "Usuário não encontrado", ["O usuário não está cadastrado."], res, false);
      }
      return user.cpf;
    })
    .catch(err => {
      console.error({
        err
      });
      return generateErrorResponse(400, req.url, "Erro ao pesquisar usuário", [err], res, false);
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
      return generateErrorResponse(400, req.url, "Erro ao pesquisar status", [err], res, false);
    });

  model.sells.create({
      userid,
      statusid,
      sellid,
      price,
      date,
      cashbackpercentage,
      cashbackvalue
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
      return generateErrorResponse(400, req.url, "Erro desconhecido", [err], res, false);
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
    return generateErrorResponse(401, req.url, "Campos vazios", ["Todo campo é obrigatório."], res, false);
  }

  if (!isAbleToChange(id)) {
    return generateErrorResponse(401, req.url, "Não foi alterado", ["Esta compra não pode ser alterada porque não está 'Em validação' mais."], res, false);
  }

  const {
    cashbackpercentage,
    cashbackvalue
  } = calculateCashback(price);

  model.sells.update({
      userid,
      sellid,
      price,
      date,
      cashbackpercentage,
      cashbackvalue
    }, {
      where: {
        id
      }
    })
    .then(_ => {
      res.status(200).json({
        code: 200,
        message: "Updated.",
        id: parseInt(id)
      });
    })
    .catch(err => {
      console.error({
        err
      });
      return generateErrorResponse(400, req.url, "Erro desconhecido", [err], res, false);
    });
});

router.delete("/:id", async (req, res) => {
  const {
    id
  } = req.params;

  if (!await sellExist(id)) {
    return generateErrorResponse(401, req.url, "Compra não encontrada", ["Esta compra não pôde ser localizada."], res, false);
  }

  if (!await isAbleToChange(id)) {
    return generateErrorResponse(401, req.url, "Não foi alterado", ["Esta compra não pode ser alterada porque não está 'Em validação' mais."], res, false);
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
      return generateErrorResponse(400, req.url, "Unknown error", [err], res, false);
    });
});

module.exports = router;