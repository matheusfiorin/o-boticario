const model = require('../models/index');

module.exports = function () {
  this.isValidCPF = function (strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    if (
      strCPF == "00000000000" ||
      strCPF == "11111111111" ||
      strCPF == "22222222222" ||
      strCPF == "33333333333" ||
      strCPF == "44444444444" ||
      strCPF == "55555555555" ||
      strCPF == "66666666666" ||
      strCPF == "77777777777" ||
      strCPF == "88888888888" ||
      strCPF == "99999999999" ||
      strCPF.length != 11
    )
      return false;

    for (var i = 1; i <= 9; i++)
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++)
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
  };
  this.isValidEmail = function (email) {
    return email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g);
  };
  this.generateErrorResponse = function (code, url, name, causes, res) {
    return res.status(code).json({
      code,
      url,
      name,
      causes
    });
  };
  this.isAbleToChange = async function (id) {
    let promise = new Promise(async (resolve, reject) => {
      let correctStatus = await model.statuses.findOne({
          where: {
            description: "Em validação"
          }
        })
        .then(status => {
          return status.id || 0
        })
        .catch(err => {
          console.error({
            err
          });
          reject(err);
        });

      model.sells.findOne({
          where: {
            id
          }
        })
        .then(sell => {
          if (sell === null) {
            return resolve(false);
          }

          if (sell.statusid !== correctStatus) {
            return resolve(false);
          }

          return resolve(true);
        })
        .catch(err => {
          console.error({
            err
          });
          return resolve(false);
        });
    });

    return await promise;
  }
  this.sellExist = async function (id) {
    let promise = new Promise(async (resolve, reject) => {
      await model.sells.findOne({
          where: {
            id
          }
        })
        .then(sell => {
          if (!sell) {
            return resolve(false);
          }

          return resolve(true);
        })
        .catch(err => {
          console.error({
            err
          });
          return resolve(false);
        });
    });

    return await promise;
  }
  this.generateRandomNumber = function (max) {
    return Math.round(Math.random() * max);
  }
}