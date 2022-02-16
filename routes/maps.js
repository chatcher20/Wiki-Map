const { response } = require('express');
const express = require('express');
const mapRoutes  = express.Router();

module.exports = function(db) {

  mapRoutes.get("/", function(req, res) {
    db.query(`SELECT * FROM maps;`)
      .then(data => {
        const maps = data.rows;
        res.json({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  mapRoutes.post("/maps", function(req, res) {
    console.log(req.body);

  });

  return mapRoutes;
};
