module.exports = {
  generateErrorResponse: function (code, url, name, causes, res) {
    return res.status(code).json({
      code,
      url,
      name,
      causes
    });
  }
}