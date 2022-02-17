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

  mapRoutes.post("/", function(req, res) {     // mapRoutes.post("/api/maps"

    console.log("Map route req.body", req.body);

    const { map_name } = req.body;

    db.query(`
    INSERT INTO maps (map_name)
    VALUES ($1)
    RETURNING *;`, [req.body.map_name])
    .then(data => {
      const map = data.rows[0];
      res.json({ map });
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: err.message });
    });

  });

  // Form submission
  // const $form = $("#map-form");

  // $form.submit(function(event) {
  //   event.preventDefault();

  //   console.log("APP.JS", event.target[0].value);
  //   console.log("APP.JS", event.target[1].value);
  // });

  return mapRoutes;

};
