const { request } = require("express");

module.exports = {
  getAll: (req, res) => {
    console.log(request);
  },
  delete: (req, res) => {
    console.log(req.params.id);
  },
  addToCart: (req, res) => {
    console.log(req.body);
  },
};
